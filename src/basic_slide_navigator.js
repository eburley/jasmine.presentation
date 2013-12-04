define(['jquery'],

function($){

    /**
     * A basic slide navigation scheme that wires up to keyboard and 
     * click events and calls next and previous on the presentation.
     * 
     * @param  {Slides} presentation  The slide engine.     
     */
    return function(presentation) {
        "use strict";

        // clicking on the presentation advances to the 
        // next slide
        $(document).on('click', function() {
                presentation.next();
            });

        // on keydown react appropriately
        $(document).on('keydown', function(k) {

            switch(k.which) {
            case 37: // left arrow
                presentation.previous();
                k.preventDefault();
                break;
            case 39: // right arrow
            case 32: // space bar
                presentation.next();
                k.preventDefault();
                break;
            }
        });

    };
}

);