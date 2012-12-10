var presentation = {};
presentation.slide_data = [
{
    title: 'hello world of jasmine',
    code:
'describe("my slides", function(){\n'+
'\n'+
'   it("should have a way to go to a slide", function(){\n'+
'      var slides = presentation.slides(); // arrange\n'+
'      slides.show(1); // act\n'+
'      expect(slides.getCurrentSlide()).toEqual(1); // assert\n'+
'   });\n'+
'}'
}
];