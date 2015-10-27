'use strict';

module.exports = function (grunt) {

  var gruntConfig = require('./gruntconfig');


  // Load grunt tasks
  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  grunt.initConfig(gruntConfig);


  // creates distributable version of application
  grunt.registerTask('build', [
    'clean',
    'dev',

    'copy:dist',
    'uglify',
    'postcss:dist'
  ]);

  // default task useful during development
  grunt.registerTask('default', [
    'dev',

    'jshint:test',

    'browserify:test',
    'browserify:bundle',
    'copy:test',

    'connect:test',
    'mocha_phantomjs',

    'configureProxies:dev',
    'connect:template',
    'connect:dev',

    'watch'
  ]);

  // builds development version of application
  grunt.registerTask('dev', [
    'jshint:dev',

    'browserify:index',
    'copy:dev',
    'copy:dygraph',
    'postcss:dev'

  ]);

  // starts distribution server and preview
  grunt.registerTask('dist', [
    'build',
    'configureProxies:dist',
    'connect:template',
    'connect:dist:keepalive'
  ]);

  // runs tests against development version of library
  grunt.registerTask('test', [
    'dev',

    'jshint:test',

    'browserify:test',
    'browserify:bundle',
    'copy:test',

    'connect:test',
    'mocha_phantomjs'
  ]);
};
