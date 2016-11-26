/**
 * Run JavaScript through Browserify
 */
 
var gulp         = require('gulp');
var browsersync  = require('browser-sync');
var browserify   = require('browserify');
var source       = require('vinyl-source-stream');
var watchify     = require('watchify');
var bundleLogger = require('../../util/bundleLogger');
var handleErrors = require('../../util/handleErrors');
var config       = require('../../config').browserify;

gulp.task('scripts', function(callback) {

  browsersync.notify('Compiling JavaScript');   // Should display a message on the page, with the given message.

  var bundleQueue = config.bundleConfigs.length;

  var browserifyThis = function(bundleConfig) {

    var bundler = browserify({
      // Required watchify args
      cache: {}, 
      packageCache: {}, 
      fullPaths: false,

      entries: bundleConfig.entries, // Specify the entry point of your app
      extensions: config.extensions, // Add file extentions to make optional in your requires
      debug: config.debug            // Enable source maps!
    });

    var bundle = function() {
      bundleLogger.start(bundleConfig.outputName);  // Log when bundling starts

      return bundler

        .bundle()
        .on('error', handleErrors)              // Report compile errors
        .pipe(source(bundleConfig.outputName))  // Use vinyl-source-stream to make the stream gulp compatible.  Specify output filename here.
        .pipe(gulp.dest(bundleConfig.dest))     // Specify the output destination
        .on('end', reportFinished);
    };

    bundler = watchify(bundler);  // Wrap with watchify and rebundle on changes
    bundler.on('update', bundle); // Rebundle on update
      
    var reportFinished = function() {
      bundleLogger.end(bundleConfig.outputName) // Log when bundling completes

      if(bundleQueue) {
        bundleQueue--;
        if(bundleQueue === 0) {
          
          // If queue is empty, tell gulp the task is complete.
          // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
          callback();
        }
      }
    };

    return bundle();
  };

  // Start bundling with Browserify for each bundleConfig specified
  config.bundleConfigs.forEach(browserifyThis);
});