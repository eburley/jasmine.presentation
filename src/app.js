// configure require, specifying jquery
require.config({
    baseUrl: '..',
    paths: {        
        jquery: 'lib/jquery-min'
    }
});

require([
    'jquery',
    'src/slides',
    'data/slide_data'],

    function($, slides, slideData) {
        $().ready( function(){
            var $slideDiv = $('#current_slide');            
            var presentation = slides($slideDiv, slideData);

            presentation.setContentFilter(function(slide){
                if(slide.hasOwnProperty('code')) {
                    slide.code = '<pre class="code" data-language="javascript">' + slide.code + '</pre>';
                }
            });

            // presentation.onSlideChange(function(){
            //     window.Rainbow.color();
            // });

            var slideNumber = presentation.indexOfSlideHash(window.location.hash);
            if ( slideNumber == -1) {
                presentation.show(0);
            } else {
                presentation.show(slideNumber);
            }

            $(document).on('click', function(){
                presentation.next();
            });

            $(document).on('keydown', function(k){
                switch(k.keyCode){
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
        });
    }
);