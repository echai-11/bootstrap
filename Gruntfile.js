"use strict";

module.exports = function (grunt) {
  // Time how long tasks take. Can help when optimizing build times
  require("time-grunt")(grunt);

  // Automatically load required Grunt tasks
  require("jit-grunt")(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          "styles/styles.css": "styles/styles.scss",
        },
      },
    },
    watch: {
      files: "styles/*.scss",
      tasks: ["sass"],
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["styles/*.css", "*.html", "js/*.js"],
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./",
          },
        },
      },
    },
  });

  grunt.registerTask("css", ["sass"]);
  grunt.registerTask("default", ["browserSync", "watch"]);
};
