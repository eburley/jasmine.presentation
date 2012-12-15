var presentation = presentation || {};

presentation.slides = function($displayArea, theSlideData){

    var _currentSlide = -1;
    var _slideData = theSlideData || presentation.slideData;    
    var noop = function(){};
    var slideChangeCallback = noop; 
    var slideContentFilter = noop;
    var beforeSlideChangeCallback = noop;
    var _displayArea = $displayArea;

    function getSlideHash(slide, slideNumber) {
        return '#' + encodeURI(slide['title'] || slideNumber);
    }

    var indexOfSlideHash = function(hash) {
        for (var i = 0,max = _slideData.length; i < max; i++) {
            if ( hash === getSlideHash(_slideData[i],i)) {
                return i;
            }
        }
        return -1;
    };

    $(window).bind('hashchange', function(){        
        if (_currentSlide === -1 || window.location.hash !== getSlideHash(_slideData[_currentSlide], _currentSlide)) {
            var idx = indexOfSlideHash(window.location.hash);
            if (idx != -1) {
                show(idx);
            }
        }
    });

    var show = function(slideNumber) {
        if(slideNumber < 0 || slideNumber >= _slideData.length) {
            return;
        }

        if (_currentSlide >= 0) {
            beforeSlideChangeCallback(_slideData[_currentSlide]);
            _displayArea.hide();
        }
        
        _currentSlide = slideNumber;

        // clone here so the content filter doesn't corrupt
        var slide = $.extend(true, {}, _slideData[_currentSlide]);
        
        // filter
        slideContentFilter(slide);

        _displayArea.empty();
        for ( var p in slide ) {
            if ( slide.hasOwnProperty(p) ) {
                if(typeof slide[p] === 'object') {
                    var $ul = $('<ul>').attr('class',p);
                    for ( var li in slide[p] ){
                        $ul.append($('<li>').append(slide[p][li]));
                    }
                    _displayArea.append($ul);
                }
                else {
                    var content = slide[p];
                    _displayArea.append($('<div>').attr('class',p).append(content));
                }
            }
        }

        _displayArea.show();
        window.location.hash = getSlideHash(slide, slideNumber);
        slideChangeCallback(slideNumber);

    };

    var next = function() {
        show(_currentSlide + 1);
    };

    var previous = function() {
        show(_currentSlide -1);
    };

    var getCurrentSlide = function() {
        return _currentSlide;
    };

    var playback = function(interval) {
        if ( _currentSlide == -1 ) {
            show(0);
        }
        window.setInterval(next,interval);
    };

    var onSlideChange = function(callback) {
        slideChangeCallback = callback || noop;
    };

    var beforeSlideChange = function(callback) {
        beforeSlideChangeCallback = callback || noop;
    };

    var setContentFilter = function(filter) {
        slideContentFilter = filter || noop;
    };

    var setDisplayArea = function(displayArea) {
        _displayArea = displayArea;
    };

    return {
        show: show,
        next: next,
        previous: previous,
        getCurrentSlide: getCurrentSlide,
        playback: playback,
        onSlideChange: onSlideChange,
        beforeSlideChange: beforeSlideChange,
        setContentFilter: setContentFilter,
        setDisplayArea: setDisplayArea,
        indexOfSlideHash: indexOfSlideHash
    };

};