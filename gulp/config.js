/* The configuration class for all of our various gulp tasks, in one location.
 * The top level property of this object should be the same as the name of the gulp task.
 *
 * @object
 */

var appPort = 3000;

var root = 'src';
var serverRoot = root + '/server';
var clientRoot = root + '/client';

var sourceDir = clientRoot + '/content';
var processedDir = clientRoot + '/public';

var scriptsDir = '/scripts';
var stylesDir = '/stylesheets';
var imagesDir = '/images';

module.exports = {
	nodemon: {

		/* Use nodemon to restart the server whenever a file changes that requires more than a browser refresh. */
		development: {
			script: 'src/bin/www',
			ext: 'js',
			ignore: [serverRoot + "/views/**/*", "spec/**/*", clientRoot + "/**/*", "node_modules/**/*", "gulp/**/*"]	
		}
	},

	browserSync: {
		development: {
			proxy: 'localhost:' + appPort.toString(),
			port: (appPort + 1),
			files: [processedDir + '/**/*', serverRoot + '/views/**/*']
		}
	},

	browserify: {
		// Enable source maps
		debug: false,

		// A separate bundle will be generated for each 
		// bundle config in the list below
		bundleConfigs: [/*{
			entries: './' + sourceDir + scriptsDir + '/map.js',
			dest: './' + processedDir + scriptsDir,
			outputName: 'map.js'
		}*/]
	},

	jshint: {
		src: root + '/**/*.js'
	},

	jasmine: {
		src: 'spec/server/**/*.spec.js'
	},

	optimize: {
  		css: {
    		src:  sourceDir + stylesDir + '/*.css',
    		dest: processedDir + stylesDir + '/',
    		options: {
      			keepSpecialComments: 0
    		}
  		},
  		js: {
			src:  sourceDir + scriptsDir + '/*.js',
			dest: processedDir + scriptsDir + '/',
			options: {}
		},
		images: {
			src:  sourceDir + imagesDir + '/**/*.{jpg,jpeg,png,gif}',
			dest: processedDir + imagesDir + '/',
			options: {
				optimizationLevel: 3,
				progessive: true,
				interlaced: true
			}
		}
	},

	revision: {
		src: {
			assets: [
				processedDir + stylesDir + '/*.css',
				processedDir + scriptsDir + '/*.js',
				processedDir + imagesDir + '/**/*'
			],
			base: processedDir
		},
		dest: {
			assets: processedDir,
			manifest: {
				name: 'manifest.json',
				path: processedDir
			}
		}
	},

	collect: {
		src: [
			processedDir + '/manifest.json',
			root + '/**/*.{html,xml,txt,json,css,js}',
		],
		dest: processedDir
	}
};