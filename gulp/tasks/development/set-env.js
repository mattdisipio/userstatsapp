var env = require('gulp-env');
var gulp = require('gulp');

gulp.task('set-env', function(){
  env({
    vars: {
      NODE_ENV : 'Development'
    }
  })
});