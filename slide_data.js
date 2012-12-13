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
    footer: 'if you can\'t test it, do you need it? (YAGNI)'
},
{
    title: 'Side effects may include:',
    bullets: [
        'detect bugs',
        'safer refactoring',
        'documentation' ]
},
{
    title: 'When to use TDD:',
    prose: '<em>probably</em> not today'

},
{
    title: 'tooling'
},
{
    title: 'Hello Jasmine',
    bullets: [
        'start with an expectation',
        'keep it simple - take small steps',
        'arrange, act, assert'
    ],
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
    title: 'Great Expectations',
    prose: 'expect and matchers are the <em>fluent</em> Swiss Army Knife of Jasmine',
code:
'expect(something).toBe();\n' +
'expect(nothing).not.toBe();\n' +
'expect(some_words).toContain("st.*f");\n' +
'expect(someFunction).toBeDefined();\n' +
'expect(boolean_values).toBeTruthy();\n'

},
{
    title: 'Hello Jasmine: satisfy the tests',
    prose: 'implement <em>just</em> enough to get it working',
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
    title: 'Wash, Rinse, Repeat...',
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
'var show = function(slideNumber) {\n' +
'    _current_slide = slideNumber;\n' +
'    var slide = _slide_data[_current_slide];\n' +
'    $displayArea.empty();\n' +
'    for ( p in slide ) {\n' +
'        if ( slide.hasOwnProperty(p) ) {\n' +
'            $displayArea.append($("<div>").attr("class",p)\n' +
'               .text(slide[p]));\n' +
'        }\n' +
'    }        \n' +
'};\n' +
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
},
{
    title: 'Immediately!',
    bullets: ['ddescribe','iit','xdescribe','xit']
},
{
    title: 'Spies: Like us?',
    bullets: ['spys/mocks let you test only what you want']
},
{
    title: 'Timing is...',
    bullets: ['lots of code is anynchronous',
    'testing async code'],
    footer: 'everything'


},
{title: 'Questions?'}





];