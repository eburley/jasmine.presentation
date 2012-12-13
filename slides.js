var presentation = presentation || {};

presentation.slides = function($displayArea, the_slide_data, the_rainbow){

    var _current_slide = -1;
    var _slide_data = the_slide_data || presentation.slide_data;
    var _rainbow = the_rainbow || window.Rainbow || null;

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
        
        _current_slide = slideNumber;
        var slide = _slide_data[_current_slide];
        $displayArea.empty();
        for ( p in slide ) {
            if ( slide.hasOwnProperty(p) ) {                
                if(typeof slide[p] === 'object') {
                    var $ul = $('<ul>').attr('class',p);
                    for ( li in slide[p] ){
                        $ul.append($('<li>').append(slide[p][li]));
                    }
                    $displayArea.append($ul);
                }
                else {
                    var content = slide[p];                                        
                    if ( p === 'code' && _rainbow) {
                        _rainbow.color(content, 'javascript',
                            function(highlighted_code) {                                
                                $displayArea.append($('<pre>').attr('class',p).append(highlighted_code));
                            });
                    }
                    else
                    {
                        $displayArea.append($('<div>').attr('class',p).append(content));
                    }
                }
            }
        }

        window.location.hash = getSlideHash(slide, slideNumber);

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

    return {
        show: show,
        next: next,
        previous: previous,
        getCurrentSlide: getCurrentSlide,
        indexOfSlideHash: indexOfSlideHash
        
    };

};