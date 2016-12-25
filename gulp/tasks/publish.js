/* Configures which tasks gulp should run when set in production mode.
 */

var gulp = require('gulp');

/**
 * Run task browsersync:production
 */
gulp.task('publish', ['browserSync:production']);
