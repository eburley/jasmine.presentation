/*global module:false*/
module.exports = function(grunt) {

  // use livereload so you can see data changes reflected in the slides
  var reloadPort = 32000;

  var jsCode = ['src/**.js'];
  var jsSpecs = ['tests/**_spec.js'];
  var jsData = ['data/**.js'];

  var jsFiles = jsCode.concat(jsCode, jsSpecs, jsData);

  /**
   * configure grunt to support hinting, unit testing, watching, and a server
   * @type {Object}
   */
  grunt.initConfig({

    jshint:{
      all: jsFiles
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
  // alias jshint as lint
  grunt.registerTask('lint', ['jshint']);

};
