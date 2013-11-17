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

function($, slides, slideData, slideSyntaxHighlighter, basicSlideNavigator) {
    $().ready( function(){
        
        // get the div.
        var $slideDiv = $('#current_slide');

        // create a presentation.
        var presentation = slides($slideDiv, slideData);

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