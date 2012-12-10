describe("my slides", function(){
    
    it("should have a way to go to a slide", function(){
        var slides = presentation.slides(); // arrange
        slides.show(1); // act
        expect(slides.getCurrentSlide()).toEqual(1); // assert
    });

});