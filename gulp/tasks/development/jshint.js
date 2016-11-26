/**
 * Check JavaScript sytax with JSHint
 */
 
var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var config  = require('../../config').jshint;

gulp.task('jshint', function() {
  return gulp.src(config.src)
    .pipe(jshint({node : true, esversion : 6}))
    .pipe(jshint.reporter(stylish));
});