

/*global module:false*/
module.exports = function(grunt) {

  var reloadPort = 32000;

  var jsCode = ['slides.js'];
  var jsSpecs = ['slides_spec.js'];
  var jsData = ['slide_data.js'];

  var jsFiles = jsCode.concat(jsCode, jsSpecs, jsData);

  // Project configuration.
  grunt.initConfig({

    jshint:{
      all: jsCode.concat(jsData)
    },
    jasmine: {
      all: {
        src: jsCode.concat(jsData),
        options:{
          specs: jsSpecs,
          vendor: ['lib/jquery*.js']
        }
      }
    },
    watch:{
      files: ['index.html', 'SpecRunner.html', 'slides.css'].concat(jsFiles),
      tasks: ['jshint', 'jasmine'],
      options: {
        livereload: {
          port: reloadPort
        }
      }
    },
    connect:{
      server:{
        options: {
          port: 8000,
          open: true,
          livereload: reloadPort
        }
      }
    }
  });

  // load all the task runners.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine', 'connect', 'watch']);
  // alias jasmine as test
  grunt.registerTask('test', ['jasmine']);

};
