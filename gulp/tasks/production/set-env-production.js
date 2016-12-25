/**
	Sets node environment variables for production
**/
var env = require('gulp-env'); 
var gulp = require('gulp');

gulp.task('set-env-production', function(){
  env({
    vars: {
      NODE_ENV : 'Production'
    }
  })
});