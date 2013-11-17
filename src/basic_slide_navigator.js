define(['jquery'],

function($){

    return function(presentation) {

        $(document).on('click', function() {
                presentation.next();
            });

        $(document).on('keydown', function(k) {

            switch(k.which){
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