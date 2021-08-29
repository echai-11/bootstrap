"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const browserSync = require("browser-sync").create();
//compile scss into css
function style() {
  return gulp
    .src("styles/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("styles"))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "/index.html",
    },
  });
  gulp.watch("styles/*.scss", style);
  gulp.watch("./*.html").on("change", browserSync.reload);
  gulp.watch("./js/*.js").on("change", browserSync.reload);
}

exports.style = style;
exports.default = watch;
