/* Starts the web app using nodedemon */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('../../config').nodemon.development;

gulp.task('nodemon', function () {
	nodemon(config).on('restart', function () {
		console.log('restarted!')
	});
});