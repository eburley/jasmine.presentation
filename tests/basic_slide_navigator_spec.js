define(['jquery', 'src/basic_slide_navigator'],

function($, basicSlideNavigator){

    describe("basicSlideNavigator", function() {

        var fakePresentation;

        beforeEach(function(){
            
            // a fake presentation.
            fakePresentation = {
                next: jasmine.createSpy('next'),
                previous: jasmine.createSpy('previous')
            };

            // set it up.
            basicSlideNavigator(fakePresentation);

        });

        it("should watch for clicks and advance the presentation", function() {
            $(document).trigger('click');
            expect(fakePresentation.next).toHaveBeenCalled();
        });

        it("should watch for keyboard right or spacebar and advance the presentation", function() {
            var e = $.Event( 'keydown', { which: 39 } );

            $(document).trigger(e);
            expect(fakePresentation.next).toHaveBeenCalled();

            fakePresentation.next.reset();
            e.which = 32;
            $(document).trigger(e);
            expect(fakePresentation.next).toHaveBeenCalled();
        });


        it("should watch for left arrow and go back to the previous slide", function() {
            var e = $.Event( 'keydown', { which: 37 } );

            $(document).trigger(e);
            expect(fakePresentation.previous).toHaveBeenCalled();
        });

    });

}

);