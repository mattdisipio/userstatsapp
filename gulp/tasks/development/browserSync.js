/* Run the build task and start a server with BrowserSync */

var gulp = require('gulp');
var browsersync = require('browser-sync');
var config = require('../../config').browserSync.development;

gulp.task('browserSync', ['nodemon'], function () {
	browsersync(config);
});