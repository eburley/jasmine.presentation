define(['jquery'],

function($){
    "use strict";

    /**
     * Slides - a basic presentation engine
     * @constructor
     * @param {jQuery} $displayArea - a jquery object to display into
     * @param {array} slideData - an array of slide data.
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