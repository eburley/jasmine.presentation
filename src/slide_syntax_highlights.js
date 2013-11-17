define(['rainbow'],

function(rainbow){

    /**
     * Enables syntax highlighting on a presentation.
     * 
     * @param  {Slides} presentation  a presentation engine     
     */
    return function(presentation) {
        "use strict";

        // subscribe to slide changes.
        presentation.onSlideChange(function() {
            rainbow.color();
        });

        // setup a content filter
        presentation.setContentFilter(function(slide) {
            if(slide.hasOwnProperty('code')) {
                slide.code = '<pre class="code" data-language="javascript">' + slide.code + '</pre>';
            }
        });
    };
}

);