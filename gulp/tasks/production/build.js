/**
 * Run all tasks needed for a build in defined order
 */
 
var gulp = require('gulp');

gulp.task('build:production', [
    'optimize:css',
    'optimize:js',
    'optimize:images',
    'optimize:html',
    'copy:fonts:production',
    'set-env-production'
  ]
);