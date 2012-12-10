
var presentation = {};
presentation.slides = function(){
    
    var slides = [];
    var currentSlide = 0;

    var show = function(slideNumber) {
        currentSlide = slideNumber;
    };

    var getCurrentSlide = function() {
        return currentSlide;
    };

    return {
        show: show,
        getCurrentSlide: getCurrentSlide
    };

};