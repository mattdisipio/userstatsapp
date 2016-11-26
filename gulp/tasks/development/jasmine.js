/* Run all unit tests with jasmine-node */

var gulp    = require('gulp');
var jasmine  = require('gulp-jasmine-node');
var config  = require('../../config').jasmine;


gulp.task('jasmine', function () {
  return gulp.src(config.src)
    .pipe(jasmine({
      showColors: true, // spec output uses color to indicate passing (green)
                        // or failing (red) specs
      verbose: true     // verbose output as the specs run
    }))
});