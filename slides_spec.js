describe("my slides", function(){
    
    it("should have a way to go to a slide", function(){
        var $slideDiv = $('#current_slide');
        var slides = presentation.slides($slideDiv); // arrange
        slides.show(0); // act
        expect(slides.getCurrentSlide()).toEqual(0); // assert
    });

    it("should show slide content", function() {
        var $slideDiv = $('#current_slide');
        var slides = presentation.slides($slideDiv);
        slides.show(0);        
        expect($slideDiv.text()).toContain('hello world'); // 
    });



});
