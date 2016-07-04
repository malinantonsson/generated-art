/* libs */
var gulp = require('gulp');
var gutil = require('gulp-util');
var ignore = require('gulp-ignore');
var runSequence = require('run-sequence');

var $ = require('gulp-load-plugins')();
var lazypipe = require('lazypipe');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');
var argv = require('yargs').argv;

var plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
});

/* vars */
var appPath = './src';
var distPath = './dist/';

var sassSrc = appPath + '/styles/*.scss';
var sassDist = distPath + '/css/';

var jsSrc = appPath + '/js/*.js';
var jsDist = distPath + '/js/';

var templatesSrc = appPath + '/templates/';
var partialsSrc = templatesSrc + '/partials/';
var pagesPath = appPath + '/pages/**/*.nunjucks';
var pagesDist = distPath;

var config = {
  defaultPort: 3000,
  supportedBrowsers: [
    'ie >= 9',
    'last 1 Firefox versions',
    'last 1 Chrome versions',
    'Safari >= 6',
    'iOS >= 6',
    'ChromeAndroid >= 4.2'
  ],
  version: require('./package.json').version,
  minify: argv.minify || false
};

// Clean site directory
gulp.task('clean', del.bind(null, [distPath], {dot: true}));


gulp.task('styles', function() {
  gulp.src(sassSrc)
  	.pipe(sourcemaps.init()) // Initialize sourcemap plugin
    .pipe(sass()) 
    .pipe(autoprefixer()) // Passes it through gulp-autoprefixer 
    .pipe(sourcemaps.write()) // Writing sourcemaps 
    .pipe(gulp.dest(sassDist)) // Outputs it in the css folder
    // Reloading the stream
    .pipe(browserSync.reload({
      stream: true
    }));
});

var scriptsFinish = lazypipe()
  .pipe(gulp.dest, jsDist)
  .pipe(function () {
    return $.if(config.minify, $.uglify());
  })
  .pipe(function () {
    return $.if(config.minify, $.rename({suffix: '.min'}));
  })
  .pipe(function () {
    return $.if(config.minify, gulp.dest(jsDist));
  });

// Lint and build scripts
gulp.task('scripts', function() {
  return gulp.src(jsSrc)
    .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
    .pipe($.if(config.isWatching, $.jshint()))
    .pipe($.if(config.isWatching, $.jshint.reporter('jshint-stylish')))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')))
    .pipe($.concat('scripts.js'))
    .pipe(scriptsFinish());
});
 
gulp.task('nunjucks', function() {
  // Gets .html and .nunjucks files in pages
  return gulp.src(pagesPath)
  // Renders template with nunjucks
  .pipe(nunjucksRender({
      path: [templatesSrc]
    }))
  // output files in app folder
  .pipe(gulp.dest(pagesDist))
});

gulp.task('setWatch', function() {
  config.isWatching = true;
});

// Development task
gulp.task('dev', ['default', 'setWatch'], function() {
  browserSync({
    port: argv.port || config.defaultPort, //default: 3000
    server: { baseDir: distPath},
    ui: {
      port: argv.port + 5000 || config.defaultPort + 5000, //default: 8000
      weinre: { port: argv.port + 6092 || config.defaultPort + 6092 } //default: 9092
    },
    notify: false,
    logLevel: 'silent' //other oprions: info, debug
  });

  gulp.watch([sassSrc], ['styles', reload]);
  gulp.watch([templatesSrc + '**/*.nunjucks'], ['nunjucks', reload]);
  gulp.watch([pagesPath], ['nunjucks', reload]);
  gulp.watch([jsSrc], ['scripts', reload]);
});

// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
  runSequence([
      'styles',
      'scripts',
      'nunjucks'
    ], cb);
});