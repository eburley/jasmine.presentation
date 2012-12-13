describe("my slides", function(){

    var $slideDiv, slide_data, slides;    
    beforeEach(function(){
        $slideDiv = $("#current_slide");
        slide_data = [
                        {title:"hello world",foo:"stuff"},
                        {stuff:["one","two"], code:"function(){}//code"}
                     ];
        slides = presentation.slides($slideDiv, slide_data);
    });

    afterEach(function(){
        // you can cleanup messes here.
    });

    it("should have a way to go to a slide", function(){
        slides.show(0); // act
        expect(slides.getCurrentSlide()).toEqual(0); // assert
    });

    it("should show slide content", function() {
        slides.show(0);
        expect($slideDiv.text()).toContain("hello world");
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


    it("should syntax highlight code", function(){
        slides.show(1);
        expect($slideDiv.html()).toContain("comment");
    });

});

describe("navigation functions", function(){

    var $slideDiv, slide_data, slides;    
    beforeEach(function(){
        $slideDiv = $("#current_slide");
        slide_data = [{title:"hello world",foo:"stuff"},
                      {title: "slide two"}];
        slides = presentation.slides($slideDiv, slide_data);
    });

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

    describe("hash function", function(){

        afterEach(function() {
            window.location.hash = '';
        });


        it("should change the url to reflect the slide", function() {
            slides.show(0);
            expect(window.location.href).toContain(encodeURI(slide_data[0].title));
        });

        it("should react to changes in the url to reflect the slide", function() {
            slides.show(0);
            window.location.hash = encodeURI(slide_data[1].title);        
            $(window).trigger('hashchange');
            waitsFor(function(){
                return slides.getCurrentSlide() == 1;
            },'the location should change',250);
            
        });

    });
    

});
