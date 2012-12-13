var presentation = presentation || {};

presentation.slide_data = [

{
    big_title: 'TDD with Jasmine',
    title: 'Eric Burley',
    social: ['twitter: @eburley','eric at eburley dot com']
},
{
    title: 'Intro',
    bullets: [
        'whoami',
        'why should we listen to you?',
        'why should we care?'
    ]
},
{
    title: 'TDD: its not about the tests',
    bullets: ['good TDD results in better code',
    'The tests are a side effect, not the end goal',
    'the <em>act</em> of TDD leads to...']
},
{
    title: 'Better Code -- and here\'s why:',
    bullets: [        
    'you <em>should</em> get modules that do one thing',
    'you <em>will probably</em> get loose coupling amongst services',
    'you <em>might even</em> end up using IoC or DI mechanisms']
},
{
    title: 'But the best part...',
    hero: 'parsimony/thrift:<br />extreme unwillingness to spend money or use resources',
    footer: 'if you can\'t test it, do you need it?'
},
{
    title: 'Side effects may include:',
    bullets: [
        'detect bugs',
        'safer refactoring',
        'documentation' ]    
},
{
    title: 'What you don\'t need to test:',
    bullets: ['hackathon code (unless you want to)',
    'simple \'everyday\' code',
    'OPP',
    'view/DOM state']
},
{
    title: 'Tooling',
    bullets: [
        'incorporate testing into your work-flow',
        'invest in testing infrastructure',
        'make sure its part of your CI '
    ]    
},
{
    title: 'Hello Jasmine: first write a test',
    prose: 'start with an expectation',
    code:
'describe("my slides", function(){\n'+
'   it("should have a way to go to a slide", function(){\n'+
'      var slides = presentation.slides(); // arrange\n'+
'      slides.show(1); // act\n'+
'      expect(slides.getCurrentSlide()).toEqual(1); // assert\n'+
'   });\n'+
'}',
    bullets: ['<em>describe</em> is the start of a test suite',
                '<em>it</em> marks a test case']
},
{
    title: 'Hello Jasmine: satisfy the tests',
    prose: 'implement <em>just</em> enough to get it working',
    code:
'presentation.slides = function(){\n' +
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
'};\n'

},
{
    title: 'Great Expectations',
    prose: 'expect and matchers are the <em>fluent</em> Swiss Army Knife of Jasmine',
code:
'expect(something).toBe();\n' +
'expect(nothing).not.toBe();\n' +
'expect(some_words).toContain("st.*f");\n' +
'expect(someFunction).toBeDefined();\n' +
'expect(someFunction()).toBeLessThan(43);\n' +
'expect(boolean_values).toBeTruthy();\n'

},
{
    prose: 'As you write more tests you\'ll start repeating yourself',
    code:
'it("should have a way to go to a slide", function(){\n' +
'    var $slideDiv, slide_data, slides;    \n' +
'    $slideDiv = $("#current_slide");\n' +
'    slide_data = [{title:"hello world",foo:"stuff"}];\n' +
'    slides = presentation.slides($slideDiv, slide_data);\n' +
'    slides.show(0); // act\n' +
'    expect(slides.getCurrentSlide()).toEqual(0); // assert\n' +
'});\n' +
'\n' +
'it("should show slide content", function() {\n' +
'    var $slideDiv, slide_data, slides;    \n' +
'    $slideDiv = $("#current_slide");\n' +
'    slide_data = [{title:"hello world",foo:"stuff"}];\n' +
'    slides = presentation.slides($slideDiv, slide_data);\n' +
'    slides.show(0);\n' +
'    expect($slideDiv.text()).toContain("hello world");\n' +
'}); \n'
},
{    
    prose: 'Use beforeEach and afterEach to DRY out your code',
    code:
'var $slideDiv, slide_data, slides;    \n' +
'beforeEach(function(){\n' +
'    $slideDiv = $("#current_slide");\n' +
'    slide_data = [{title:"hello world",foo:"stuff"}];\n' +
'    slides = presentation.slides($slideDiv, slide_data);\n' +
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
},
{
    title: 'Spies: Like us?',
    prose: 'Spies let you test only what you want:',
    footer: 'see Jasmine\'s <a href="http://pivotal.github.com/jasmine/#section-Spies">docs</a> for more on spies',
    code:
'it("should hide and show between slides", function() {\n' +
'    spyOn($slideDiv,"show");\n' +
'    spyOn($slideDiv,"hide");\n' +
'    slides.show(0);\n' +
'    slides.show(1);\n' +
'    expect($slideDiv.show.calls.length).toEqual(2);\n' +
'    expect($slideDiv.hide.calls.length).toEqual(1);\n' +
'});\n'
    
},
{
    title: 'Timing is......................everything',
    prose: 'To test timeout driven functionality,<br /> use a mock clock:',
    code: 
'it("should have a playback function", function() {\n' +
'    jasmine.Clock.useMock();\n' +
'    slides.playback(500);\n' +
'    expect(slides.getCurrentSlide()).toEqual(0);\n' +
'    jasmine.Clock.tick(501);\n' +
'    expect(slides.getCurrentSlide()).toEqual(1);\n' +
'});'    
},
{title: 'Questions?',
footer:'This presentation and associated code is up on github at https://github.com/eburley/jasmine.presentation'}





];