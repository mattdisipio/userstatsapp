/**
 * Goes through all of the code, and whenever it sees a name in the manifest.json
 * created in the revision task, replaces it with the new filename.
 */

var gulp    = require('gulp');
var collect = require('gulp-rev-collector');
var config  = require('../../config').collect;

gulp.task('rev:collect', function() {
  return gulp.src(config.src)
  .pipe(collect())
  .pipe(gulp.dest(config.dest));
});