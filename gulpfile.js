/* libs */
var gulp = require('gulp');
var gutil = require('gulp-util');
var _ = require('underscore');
var extender = require('gulp-html-extend');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
var ignore = require('gulp-ignore');
var template = require('gulp-template');
var rename = require('gulp-rename');
var shell = require('gulp-shell');
var imageResize = require('gulp-image-resize');
var rimraf = require('gulp-rimraf');
var sizeOf = require('image-size');
var runSequence = require('run-sequence');
var svgmin = require('gulp-svgmin');
var Q = require('q');

var sass = require('gulp-sass');

/* vars */
var appPath = '/src';
var distPath = '/dist';

var sassSrc = appPath + '/styles/*.scss';
var sassDist = distPath + '/styles/';

gulp.task('sass', function () {
  return gulp.src(sassSrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(sassDist));
});
 
gulp.task('sass:watch', function () {
  gulp.watch(sassSrc, ['sass']);
});