define(
function(){

return [
{
    "big_title": "Testing JavaScript<br/> with Jasmine",
    "title": "Eric Burley",
    "social": ["twitter: @eburley","email: eric at eburley dot com"]
},
{
    "title": "What's all this then?",
    "bullets": [
    "BDD: Behavior Driven Development",
    "Jasmine: A BDD testing framework for JavaScript",
    "wait, what about TDD?"
    ]
    
},
{
    "title": "BDD: it's not about the tests",
    "bullets": ["good BDD practices result in better code",
    "tests are a side effect, not the end goal",
    "the <em>act</em> of BDD leads to..."]
},
{
    "title": "Better Code",
    "bullets": [
    "you <em>should</em> get modules that do one thing",
    "you <em>will probably</em> get loosely coupled modules",
    "you <em>might even</em> end up using IoC or DI mechanisms"]
},
{
    "title": "But the best part...",
    "hero": "parsimony:<br />extreme unwillingness to spend money or use resources",
    "footer": "If you can't test it, do you need it?"
},
{
    "title": "Side effects may include:",
    "bullets": [
        "happier customers",
        "less bugs",
        "safer refactoring",
        "documentation" ]
},
{
    "title": "What you don\'t need to test:",
    "bullets": ["hackathon code (unless you want to)",
    "simple \"everyday\" code",
    "OPP",
    "view/DOM state"]
},
{
    "title": "Tooling Matters",
    "bullets": [
        "incorporate testing into your work-flow",
        "invest in testing infrastructure",
        "make sure it's part of your CI ",
    ],
    "footer": "demo..."
},
{
    "title": "Hello Jasmine: first write a test",
    "prose": "start with an expectation",
    "code":
"describe(\"my slides\", function() {\n" +
"   it(\"should have a way to go to a slide\", function() {\n"+
"      // arrange\n" +
"      var slides = presentation.slides();\n\n"+
"      // act\n" +
"      slides.show(1);\n\n" +
"      // assert\n" +
"      expect(slides.getCurrentSlide()).toEqual(1);\n"+
"   });\n"+
"});",
    "bullets": ["<em>describe</em> is the start of a test suite",
                "<em>it</em> marks a test case"]
},
{
    "title": "Hello Jasmine: satisfy the tests",
    "prose": "implement <em>just</em> enough to get it working",
    "code":
"presentation.slides = function(){\n" +
"    var _currentSlide = 0;\n" +
"\n" +
"    var show = function(slideNumber) {\n" +
"        _currentSlide = slideNumber;\n" +
"    };\n" +
"\n" +
"    var getCurrentSlide = function() {\n" +
"        return _currentSlide;\n" +
"    };\n" +
"\n" +
"    return {\n" +
"        show: show,\n" +
"        getCurrentSlide: getCurrentSlide\n" +
"    };\n" +
"};\n"

},
{
    "title": "Great Expectations",
    "prose": "expect and matchers are the fluent Swiss Army Knife of Jasmine",
    "code":
"expect(something).toBe(true);\n" +
"expect(nothing).not.toBe(false);\n" +
"expect(someWords).toContain(\"stuff\");\n" +
"expect(someWords).toMatch(\"st.*f\");\n" +
"expect(someFunction).toBeDefined();\n" +
"expect(theAnswer).toEqual(42);\n" +
"expect(someFunction()).toBeLessThan(43);\n" +
"expect(booleanValues).toBeTruthy();\n",
    "footer": "Many more matchers are available, plus you can write your own."

},
{
    "prose": "As you write more tests you'll start repeating yourself",
    "code":
"describe(\"my slides\", function() {\n" +
"    it(\"should have a way to go to a slide\", function(){\n" +
"        var $slideDiv, slideData, slides;    \n" +
"        $slideDiv = $(\"<div>\");\n" +
"        slideData = [{title:\"hello world\",foo:\"stuff\"}];\n" +
"        slides = presentation.slides($slideDiv, slideData);\n" +
"        slides.show(0); // act\n" +
"        expect(slides.getCurrentSlide()).toEqual(0); // assert\n" +
"    });\n" +
"    \n" +
"    it(\"should show slide content\", function() {\n" +
"        var $slideDiv, slideData, slides;    \n" +
"        $slideDiv = $(\"<div>\");\n" +
"        slideData = [{title:\"hello world\",foo:\"stuff\"}];\n" +
"        slides = presentation.slides($slideDiv, slideData);\n" +
"        slides.show(0);\n" +
"        expect($slideDiv.text()).toContain(\"hello world\");\n" +
"    }); \n" +
"});"
},
{
    "prose": "Use beforeEach and afterEach to <em>DRY</em> out your code",
    "code":
"describe(\"my slides\", function() {\n" +
"    var $slideDiv, slideData, slides;    \n" +
"    beforeEach(function(){\n" +
"        $slideDiv = $(\"<div>\");\n" +
"        slideData = [{title:\"hello world\",foo:\"stuff\"}];\n" +
"        slides = presentation.slides($slideDiv, slideData);\n" +
"    });\n" +
"    \n" +
"    it(\"should have a way to go to a slide\", function(){\n" +
"        slides.show(0);\n" +
"        expect(slides.getCurrentSlide()).toEqual(0); // assert\n" +
"    });\n" +
"    \n" +
"    it(\"should show slide content\", function() {\n" +
"        slides.show(0);\n" +
"        expect($slideDiv.text()).toContain(\"hello world\");\n" +
"    }); \n" +
"});"
},
{
    "title": "Spies/Mocks/Stubs/Fakes",
    "prose": "spies let you test only what you want:",
    "footer": "see Jasmine's <a href=\"http://pivotal.github.com/jasmine/#section-Spies\">docs</a> for more on spies",
    "code":
"it(\"should hide and show between slides\", function() {\n" +
"    spyOn($slideDiv,\"show\");\n" +
"    spyOn($slideDiv,\"hide\");\n" +
"    slides.show(0);\n" +
"    slides.show(1);\n" +
"    expect($slideDiv.show.calls.length).toEqual(2);\n" +
"    expect($slideDiv.hide.calls.length).toEqual(1);\n" +
"});\n"
    
},
{
    "title": "Timing is         everything",
    "prose": "to test timeout driven functionality,<br /> use a mock clock:",
    "code":
"it(\"should have a playback function\", function() {\n" +
"    jasmine.Clock.useMock();\n" +
"    slides.playback(500);\n" +
"    expect(slides.getCurrentSlide()).toEqual(0);\n" +
"    jasmine.Clock.tick(501);\n" +
"    expect(slides.getCurrentSlide()).toEqual(1);\n" +
"});"
},
{
    "title": "Asynchronous hard behavior is",
    "prose": "you can test asynchronous code using run and wait:",
    "code":
"it(\"should support a slide change callback\", function() {\n" +
"    var callback = jasmine.createSpy(\"callback\");\n" +
"    slides.onSlideChange(callback);\n" +
"    runs(function(){\n" +
"        slides.playback(100);\n" +
"    });\n" +
"\n" +
"    waitsFor(function(){\n" +
"        return callback.calls.length > 0;\n" +
"    },\"the callback should have been called\",200);\n" +
"});\n"

},
{
    "title": "Questions?",
"footer":"this presentation and associated code is up on github at <a href='https://github.com/eburley/jasmine.presentation'>https://github.com/eburley/jasmine.presentation</a>"
}
];
});