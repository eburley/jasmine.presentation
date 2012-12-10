var presentation = presentation || {};

presentation.slides = function($displayArea){

    var _current_slide = 0;

    var show = function(slideNumber) {
        _current_slide = slideNumber;
        var slide = presentation.slide_data[_current_slide];
        var title = slide.title || '';
        $displayArea.text(title);
    };

    var getCurrentSlide = function() {
        return _current_slide;
    };

    return {
        show: show,
        getCurrentSlide: getCurrentSlide
    };

};