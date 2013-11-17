define(['rainbow', 'src/slide_syntax_highlights'],

function(rainbow, slideSyntaxHighlighter){

    describe("syntax highlighter", function() {

        var fakePresentation;

        beforeEach(function(){
            // fake out rainbow.
            spyOn(rainbow, 'color');

            // a fake presentation.
            fakePresentation = {
                onSlideChange: jasmine.createSpy('onSlideChange'),
                setContentFilter: jasmine.createSpy('setContentFilter')
            };

            // set it up.
            slideSyntaxHighlighter(fakePresentation);

        });

        it("should monitor for slide changes", function() {
            expect(fakePresentation.onSlideChange).toHaveBeenCalled();
        });

        it("should react to slide changes by asking rainbow to color", function() {
            // fakePresentation.onSlideChange was called with a callback.
            var callback = fakePresentation.onSlideChange.mostRecentCall.args[0];
            expect(typeof callback).toEqual('function');
            callback();
            expect(rainbow.color).toHaveBeenCalled();
        });

        it("should setup a content filter for code", function() {
            expect(fakePresentation.setContentFilter).toHaveBeenCalled();
        });

        it("should add formatting around code in slides with code", function() {
            var unformatted = 'console.log("hello");',
            fakeCodeSlide = {'code':unformatted},
            fakeOtherSlide = {},
            callback = fakePresentation.setContentFilter.mostRecentCall.args[0];
            expect(typeof callback).toEqual('function');

            // positive test
            callback(fakeCodeSlide);
            expect(fakeCodeSlide.code.length).toBeGreaterThan(unformatted.length);

            // negative test. leave non-code slides alone
            callback(fakeOtherSlide);
            expect(fakeOtherSlide.hasOwnProperty('code')).toBeFalsy();
        });

    });
}

);