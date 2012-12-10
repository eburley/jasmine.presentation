var presentation = presentation || {};

presentation.slides = function($displayArea, the_slide_data){

    var _current_slide = 0;
    var _slide_data = the_slide_data || presentation.slide_data;

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
                    $displayArea.append($('<div>').attr('class',p).append(slide[p]));
                }
            }
        }        
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
        getCurrentSlide: getCurrentSlide
    };

};