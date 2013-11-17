describe("slides engine", function() {

    var $slideDiv, slideData, slides;
    beforeEach(function(){
        $slideDiv = $("<div>");
        slideData = [{title:"hello world",foo:"stuff"},
                      {title: "slide two", stuff:["one","two"],}];
        slides = presentation.slides($slideDiv, slideData);
    });

    describe("basics", function(){

        it("should have a way to go to a slide", function() {
            slides.show(0); // act
            expect(slides.getCurrentSlide()).toEqual(0); // assert
        });

        it("should show slide content", function() {
            slides.show(0);
            expect($slideDiv.text()).toContain("hello world");
        });

        it("should have a way to set the display area", function() {
            var newDisplayArea = $("<div>");
            slides.setDisplayArea(newDisplayArea);
            slides.show(0);
            expect(newDisplayArea.text()).toContain(slideData[0].title);
        });

        it("should add a div for each property", function() {
            slides.show(0);
            expect($slideDiv.find(".title").text()).toContain("hello world");
            expect($slideDiv.find(".foo").text()).toContain("stuff");
        });

        it("should turn arrays into ul/li", function() {
            slides.show(1);
            expect($slideDiv.find("ul li").text()).toContain("one");
        });

        it("should support a content filter", function() {
            var contentFilter = function(slide){slide.title = slide.title + '!';};
            slides.setContentFilter(contentFilter);
            slides.show(0);
            expect($slideDiv.text()).toContain(slideData[0].title + '!');
        });

        it("should hide and show between slides", function() {
            spyOn($slideDiv,"show");
            spyOn($slideDiv,"hide");
            slides.show(0);
            slides.show(1);
            expect($slideDiv.show.calls.length).toEqual(2);
            expect($slideDiv.hide.calls.length).toEqual(1);
        });

    });


    describe("navigation functions", function(){

        it("should have a way to get to the next slide", function() {
            slides.show(0);
            slides.next();
            expect(slides.getCurrentSlide()).toEqual(1);
        });

        it("should have a way to get to the previous slide", function() {
            slides.show(1);
            slides.previous();
            expect(slides.getCurrentSlide()).toEqual(0);
        });

        it("should not navigate to non-existant slides", function() {
            slides.show(0);
            slides.previous();
            expect(slides.getCurrentSlide()).toEqual(0);
            slides.show(1);
            slides.next();
            expect(slides.getCurrentSlide()).toEqual(1);
        });

        describe("playback function", function() {

            it("should have a playback function which plays slides back on an interval", function() {
                jasmine.Clock.useMock();
                slides.playback(500);
                expect(slides.getCurrentSlide()).toEqual(0);
                jasmine.Clock.tick(501);
                expect(slides.getCurrentSlide()).toEqual(1);
            });

            it("should support a slide change callback", function() {
                var callback = jasmine.createSpy('callback');
                slides.onSlideChange(callback);
                runs(function(){
                    slides.playback(100);
                });

                waitsFor(function(){
                    return callback.calls.length > 0;
                },"the callback should have been called",200);
            });

            it("should support a before slide change callback", function() {
                var callback = jasmine.createSpy('callback');
                slides.beforeSlideChange(callback);
                runs(function(){
                    slides.playback(100);
                });

                waitsFor(function(){
                    return callback.calls.length > 0;
                },"the callback should have been called",200);
            });

        });

        describe("hash function", function(){

            afterEach(function() {
                window.location.hash = '';
            });

            it("should change the url to reflect the slide", function() {
                slides.show(0);
                expect(window.location.href).toContain(encodeURI(slideData[0].title));
            });

            it("should react to changes in the url to reflect the slide", function() {
                slides.show(0);
                window.location.hash = encodeURI(slideData[1].title);
                $(window).trigger('hashchange');
                waitsFor(function(){
                    return slides.getCurrentSlide() == 1;
                },'the location should change',500);
                
            });

        });
        

    });

});
