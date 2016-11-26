/**
 * Rename all public assets to include a hash at the end of the filename,
 * (to force cache invalidation), and createa a json file that tracks the new
 * name vs the old name (used in rev-collector.js task).
 */
 
var gulp   = require('gulp');
var rev    = require('gulp-rev');
var config = require('../../config').revision;

gulp.task('revision', function() {
  return gulp.src(config.src.assets, { base: config.src.base })
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev())
    .pipe(gulp.dest(config.dest.assets))
    .pipe(rev.manifest({ path: config.dest.manifest.name }))
    .pipe(gulp.dest(config.dest.manifest.path));
});