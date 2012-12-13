

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    reload: {
        port: 6001,
        proxy: {
            host: 'localhost',
            port: 8000
        }
    },
    watch:{
        files:['index.html', '*.js', 'SpecRunner.html', 'slides.css'],
        tasks:'reload'
    }
  });

  grunt.loadNpmTasks('grunt-reload');

  // Default task.
  grunt.registerTask('default', 'reload server watch');

};
