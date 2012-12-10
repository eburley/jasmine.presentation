var presentation = presentation || {};

presentation.slide_data = [
{
    title: 'hello world of jasmine',
    bullets: ['start with an expectation'],
    code:
'describe("my slides", function(){\n'+
'\n'+
'   it("should have a way to go to a slide", function(){\n'+
'      var slides = presentation.slides(); // arrange\n'+
'      slides.show(1); // act\n'+
'      expect(slides.getCurrentSlide()).toEqual(1); // assert\n'+
'   });\n'+
'}'
},
{
    title: 'hello world of jasmine: satisfy the tests',
    code:
'presentation.slides = function(){\n' +
'\n' +
'    var _current_slide = 0;\n' +
'\n' +
'    var show = function(slideNumber) {\n' +
'        _current_slide = slideNumber;\n' +
'    };\n' +
'\n' +
'    var getCurrentSlide = function() {\n' +
'        return _current_slide;\n' +
'    };\n' +
'\n' +
'    return {\n' +
'        show: show,\n' +
'        getCurrentSlide: getCurrentSlide\n' +
'    };\n' +
'\n' +
'};\n'
},
{
    title: 'another test',
    code:
'it("should show slide content", function() {\n' +
'    var $slideDiv = $("#current_slide");\n' +
'    var slide_data = [{title:"hello world"}];\n' +
'    var slides = presentation.slides($slideDiv, slide_data);\n' +
'    slides.show(0);\n' +
'    expect($slideDiv.text()).toContain("hello world");\n' +
'});\n'
},
{
    title: 'make it green',
    code:
'...\n' +
'    var show = function(slideNumber) {\n' +
'        _current_slide = slideNumber;\n' +
'        var slide = _slide_data[_current_slide];\n' +
'        $displayArea.empty();\n' +
'        for ( p in slide ) {\n' +
'            if ( slide.hasOwnProperty(p) ) {\n' +
'                $displayArea.append($("<div>").attr("class",p).text(slide[p]));\n' +
'            }\n' +
'        }        \n' +
'    };\n' +
'...\n'
},
{
    title: 'repeatedly getting rid of repetition',
    code:
'var $slideDiv, slide_data, slides;    \n' +
'beforeEach(function(){\n' +
'    $slideDiv = $("#current_slide");\n' +
'    slide_data = [{title:"hello world",foo:"stuff"}];\n' +
'    slides = presentation.slides($slideDiv, slide_data);\n' +
'});\n' +
'\n' +
'afterEach(function(){\n' +
'    // you can cleanup messes here.\n' +
'});\n' +
'\n' +
'it("should have a way to go to a slide", function(){\n' +
'    slides.show(0); // act\n' +
'    expect(slides.getCurrentSlide()).toEqual(0); // assert\n' +
'});\n' +
'\n' +
'it("should show slide content", function() {\n' +
'    slides.show(0);\n' +
'    expect($slideDiv.text()).toContain("hello world");\n' +
'}); \n'
}





];