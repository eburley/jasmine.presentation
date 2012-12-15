var presentation = presentation || {};

presentation.slides = function($displayArea, the_slide_data){

    var _current_slide = -1;
    var _slide_data = the_slide_data || presentation.slide_data;    
    var noop = function(){};
    var slideChangeCallback = noop; 
    var slideContentFilter = noop;
    var beforeSlideChangeCallback = noop;

    function getSlideHash(slide, slideNumber) {
        return '#' + encodeURI(slide['title'] || slideNumber);
    }

    var indexOfSlideHash = function(hash) {
        for (var i = 0,max = _slide_data.length; i < max; i++) {
            if ( hash === getSlideHash(_slide_data[i],i)) {
                return i;
            }
        }
        return -1;
    };

    $(window).bind('hashchange', function(){        
        if (_current_slide === -1 || window.location.hash !== getSlideHash(_slide_data[_current_slide], _current_slide)) {
            var idx = indexOfSlideHash(window.location.hash);
            if (idx != -1) {
                show(idx);
            }
        }
    });

    var show = function(slideNumber) {
        if(slideNumber < 0 || slideNumber >= _slide_data.length) {
            return;
        }

        if (_current_slide >= 0) {
            beforeSlideChangeCallback(_slide_data[_current_slide]);
            $displayArea.hide();
        }
        
        _current_slide = slideNumber;

        // clone here so the content filter doesn't corrupt
        var slide = $.extend(true, {}, _slide_data[_current_slide]);
        
        // filter
        slideContentFilter(slide);

        $displayArea.empty();
        for ( var p in slide ) {
            if ( slide.hasOwnProperty(p) ) {
                if(typeof slide[p] === 'object') {
                    var $ul = $('<ul>').attr('class',p);
                    for ( var li in slide[p] ){
                        $ul.append($('<li>').append(slide[p][li]));
                    }
                    $displayArea.append($ul);
                }
                else {
                    var content = slide[p];
                    $displayArea.append($('<div>').attr('class',p).append(content));
                }
            }
        }

        $displayArea.show();
        window.location.hash = getSlideHash(slide, slideNumber);
        slideChangeCallback(slideNumber);

    };

    var next = function() {
        show(_current_slide + 1);
    };

    var previous = function() {
        show(_current_slide -1);
    };

    var getCurrentSlide = function() {
        return _current_slide;
    };

    var playback = function(interval) {
        if ( _current_slide == -1 ) {
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

    return {
        show: show,
        next: next,
        previous: previous,
        getCurrentSlide: getCurrentSlide,
        playback: playback,
        onSlideChange: onSlideChange,
        beforeSlideChange: beforeSlideChange,
        setContentFilter: setContentFilter,
        indexOfSlideHash: indexOfSlideHash
    };

};