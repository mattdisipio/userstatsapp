var gulp = require('gulp');
var Server = require('karma').Server;

/**
 * Run karma and watch files for updates
 */
gulp.task('karma', function (done) {
  new Server({
    configFile: '../../../spec/angular/karma.conf.js'
  }, done).start();
});