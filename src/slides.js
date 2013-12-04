define(['jquery'],

function($){
    "use strict";

    /**
     * Slides - a basic presentation engine created as an excuse to write
     * unit tests.
     * 
     * @constructor
     * @param {jQuery} $displayArea - a jquery object to display into
     * @param {array} slideData - an array of slide data.
     *
     * @description Configure a slide show quickly and easily through the
     * power of JSON.  To get started, create a DOM element like so:
     *
     * <div id="mySlideShow"></div>
     *
     * Then define your slides through the power of JSON (more about formating later):
     *
     * var mySlideData = [{
     *   "big_title": "Hello!",
     *   "title": "World"
     *   },
     *   {           
     *       "bullets": [
     *           "Goodbye,",
     *           "World"]
     *   }];
     *
     * And get things going:
     *
     * First get the DOM object:
     * var myDisplayArea = $#mySlideShow");
     *
     * Then create the show:
     * var slideShow = new Slides(myDisplayArea, mySlideData);
     *
     * That's it!  You've created your first slide show.  As a next step let's go
     * over how we define what's on each slide:
     *
     * Philosophy:
     * Each slide is an object, and each property on that object corresponds to 
     * content that you want to display on a slide.  The default slide styles include
     * support for titles, bullet points, footers, etc.  These styles aren't magic,
     * since the slide engine allows you to define any element you want.  
     * 
     * How the slides are built:
     * Elements in the slide output are turned into html using a very simple algorithm:
     * - If the value of the elment is a string property then a div is added to the slide
     * with a class set to the name of the property, and the contents of the div
     * set to the value of the property.
     * - If the value of the element is an object or an array, then an unordered 
     * list (ul) is added to the slide, with a list item (li) for each property or 
     * element in the object.  The class of the ul is set to the name of the property
     *
     * Supporting another style on a slide:
     * Suppose you'd like to add a logo to the bottom right hand corner of a slide.
     * You would add the following to your css:
     * 
     * .logo {
     *     position: absolute; <-- assuming your parent is relative or abs positioned
     *     left: 900px;
     *     top: 580px;
     *     background-image: url('img/logo.png');    
     * }
     *
     * Then in your slide definitions you would add a logo property like so:
     *
     * {
     *     "title": "Hello",
     *     "logo": "&nbsp;"
     * }
     * 
     */
    function Slides($displayArea, slideData) {
        
        // protect against instantiation without new
        if ( !(this instanceof Slides)) {
            return new Slides($displayArea, slideData);
        }

        this.slideData = slideData;
        this.currentSlide = -1;
        this.noop = function(){};
        this.slideChangeCallback = this.noop;
        this.slideContentFilter = this.noop;
        this.beforeSlideChangeCallback = this.noop;
        this.displayArea = $displayArea;

        // subscribe to hashchange
        $(window).on('hashchange', $.proxy(function() {
            if (this.currentSlide === -1 || window.location.hash !== getSlideHash(this.slideData[this.currentSlide], this.currentSlide)) {
                var idx = this.indexOfSlideHash(window.location.hash);
                if (idx !== -1) {
                    this.show(idx);
                }
            }
        }, this));

    }

    /**
     * @function getSlideHash - a utility function to get the encoded hash of
     * either the title (if a slide has one), or it's number
     * 
     * @param  {object} slide       the slide's data
     * @param  {number} slideNumber the slide's index to use as a fallback
     * @return {string}             a string suitable for use as a hashcode.
     */
    function getSlideHash(slide, slideNumber) {
        return '#' + encodeURI(slide.title || slideNumber);
    }

    /**
     * @method cleanup
     *
     * removes jQuery hooks.
     */
    Slides.prototype.cleanup = function(){
        $(window).off('hashchange');
    };


    /**
     * @method indexOfSlideHash
     *
     * finds the index of the hash given as hash
     * @param  {string} hash - the hash to find
     * @return {number} the index of the slide, or -1 if none was found.
     */
    Slides.prototype.indexOfSlideHash = function(hash) {
        for (var i = 0, max = this.slideData.length; i < max; i++) {
            if ( hash === getSlideHash(this.slideData[i], i)) {
                return i;
            }
        }
        return -1;
    };
    
    /**
     * @method show
     *
     * shows the indicated slide number, formatting as necessary
     * 
     * @param  {number} slideNumber - then index of the slide to show.     
     */
    Slides.prototype.show = function(slideNumber) {

        var slide, ul, p, li, content;

        if(slideNumber < 0 || slideNumber >= this.slideData.length) {
            return;
        }

        if (this.currentSlide >= 0) {
            this.beforeSlideChangeCallback(this.slideData[this.currentSlide]);
            this.displayArea.hide();
        }
        
        this.currentSlide = slideNumber;

        // clone here so the content filter doesn't corrupt
        slide = $.extend(true, {}, this.slideData[this.currentSlide]);
        
        // filter
        this.slideContentFilter(slide);

        this.displayArea.empty();
        for ( p in slide ) {
            if ( slide.hasOwnProperty(p) ) {
                if(typeof slide[p] === 'object') {
                    ul = $('<ul>').attr('class',p);
                    for ( li in slide[p] ){
                        ul.append($('<li>').append(slide[p][li]));
                    }
                    this.displayArea.append(ul);
                }
                else {
                    content = slide[p];
                    this.displayArea.append($('<div>').attr('class',p).append(content));
                }
            }
        }

        this.displayArea.show();
        window.location.hash = getSlideHash(slide, slideNumber);
        this.slideChangeCallback(slideNumber);

    };

    /**
     * @method next - move to the next slide     
     */
    Slides.prototype.next = function() {
        this.show(this.currentSlide + 1);
    };

    /**
     * @method previous - move to the previous slide     
     */
    Slides.prototype.previous = function() {
        this.show(this.currentSlide -1);
    };

    /**
     * @method getCurrentSlide
     * @return {number} the index of the current slide.
     */
    Slides.prototype.getCurrentSlide = function() {
        return this.currentSlide;
    };

    /**
     * @method playback - play the slideshow back over the given interval
     * 
     * @param  {number} interval - the time in milliseconds between slide changes.     
     */
    Slides.prototype.playback = function(interval) {
        if ( this.currentSlide === -1 ) {
            this.show(0);
        }
        window.setInterval($.proxy(this.next,this),interval);
    };

    /**
     * @method onSlideChange registers a callback for slide change events.
     * 
     * @param  {Function} callback - the callback to call when the 
     *                               slide changes.     
     */
    Slides.prototype.onSlideChange = function(callback) {
        this.slideChangeCallback = callback || this.noop;
    };

    /**
     * @method beforeSlideChange registers a callback for before a slide changes
     * 
     * @param  {Function} callback - the callback to call before the 
     *                               slide changes.     
     */
    Slides.prototype.beforeSlideChange = function(callback) {
        this.beforeSlideChangeCallback = callback || this.noop;
    };


    /**
     * @method setContentFilter - sets a content filter allowing slides to be
     * transformed on the fly.
     * 
     * @param {Function} filter - the filter function to call
     */
    Slides.prototype.setContentFilter = function(filter) {
        this.slideContentFilter = filter || this.noop;
    };

    /**
     * @method setDisplayArea - sets the display area to paint into.
     * @param {[type]} displayArea [description]
     */
    Slides.prototype.setDisplayArea = function(displayArea) {
        this.displayArea = displayArea;
    };


    return Slides;
}

);