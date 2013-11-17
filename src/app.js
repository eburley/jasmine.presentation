// configure require, specifying jquery
require.config({
    baseUrl: '..',
    paths: {
        'jquery': 'lib/jquery-min',
        'rainbow': 'lib/rainbow-custom.min'
    },
    shim: {
        'rainbow': { // rainbow puts itself on the global namespace
            exports: 'Rainbow'
        }
    }

});

require([
    'jquery',
    'src/slides',
    'data/slide_data',
    'src/slide_syntax_highlights',
    'src/basic_slide_navigator'],

/**
 * Main application.
 *
 * Sets up the presentation by handing it a jquery object,
 * then wires up highlighting and basic navigation, and ensures that the 
 * proper slide is loaded.
 * 
 * @param  {jQuery}   $                      jQuery
 * @param  {Slides}   slides                 the slide engine
 * @param  {array}    slideData              an array of slides.
 * @param  {function} slideSyntaxHighlighter a function that sets up syntax highlighting
 * @param  {function} basicSlideNavigator    a function that sets up slide navigation

 */
function($, Slides, slideData, slideSyntaxHighlighter, basicSlideNavigator) {
    $().ready( function(){
        
        // get the div.
        var $slideDiv = $('#current_slide');

        // create a presentation.
        var presentation = new Slides($slideDiv, slideData);

        // wire up the slide highlighter
        slideSyntaxHighlighter(presentation);

        // wire up slide navigation
        basicSlideNavigator(presentation);

        // show the slide.
        var slideNumber = presentation.indexOfSlideHash(window.location.hash);
        if ( slideNumber == -1) {
            presentation.show(0);
        } else {
            presentation.show(slideNumber);
        }
        
    });
}

);