/* Configures which tasks gulp should run when set in development mode.
 */

var gulp = require('gulp');

gulp.task('default', ['nodemon', 'browserSync', 'scripts', 'jshint', 'jasmine', 'karma', 'set-env']);