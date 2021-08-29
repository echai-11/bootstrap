"use strict";
const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const browserSync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const del = require("del"),
  uglify = require("gulp-uglify"),
  usemin = require("gulp-usemin"),
  rev = require("gulp-rev"),
  cleanCss = require("gulp-clean-css"),
  flatmap = require("gulp-flatmap"),
  htmlmin = require("gulp-htmlmin");

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

//clean

function clean() {
  return del(["dist"]);
}
function copyFonts() {
  return gulp
    .src("./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*")
    .pipe(gulp.dest("dist/fonts"));
}
function minimizeImages() {
  return gulp
    .src("img/*.{png,jpg,gif}")
    .pipe(
      imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
    )
    .pipe(gulp.dest("dist/img"));
}
function minify() {
  return gulp
    .src("./*.html")
    .pipe(
      flatmap(function (stream, file) {
        return stream.pipe(
          usemin({
            css: [rev()],
            html: [
              function () {
                return htmlmin({ collapseWhitespace: true });
              },
            ],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), "concat"],
          })
        );
      })
    )
    .pipe(gulp.dest("dist/"));
}

exports.style = style;
exports.default = watch;
exports.build = gulp.series(
  clean,
  copyFonts,
  minimizeImages,
  minify,
  (done) => {
    done();
  }
);
