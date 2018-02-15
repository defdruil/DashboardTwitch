'use strict';
var gulp = require("gulp");
var sass = require("gulp-sass");
var importer = require("node-sass-tilde-importer");
var watch = require("gulp-watch");

gulp.task("sass", function(){
    gulp.src("private/main.scss").pipe(sass({importer: importer})).pipe(gulp.dest("public/css"));
});

gulp.task('watch', function() {
    return watch('private/*.scss', function() {
      gulp.start('sass');
    });
  });

gulp.task("default", function(){
    gulp.start("sass");
});