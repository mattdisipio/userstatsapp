global.rootRequire = function(name) {
    return require('../../../src/server/' + '\\' + name);
};

var proxyquire = require('proxyquire');
var routesFactory = rootRequire('routing/routesFactory');
var request = require('request');
var utils = require('../../utils.spec.js');

// Returns a mock of express.js' app.js object
function getAppMock() {
	return {
		paths: {			
		},
		// express.js exposes a use function, to register new routes
		use: function (path, route) {
			this.paths[path] = route;		
		},
		post : function(path, auth, route){
			//if route is null here auth holds the route
			this.paths[path] = !route ? auth : route;
		},	
		get : function(path,  route){
			this.paths[path] = route;
		}
	};
}

var app = getAppMock();

var request = {};


describe ('routesFactory', function () {
	it ('is a function', function () {
		expect(typeof routesFactory).toBe('function');
	});
	
	describe ('registers', function () {
		it('partials', function () {
			var mock = getAppMock();
			routesFactory(mock);
			expect(mock.paths.hasOwnProperty('/partials')).toBeTruthy();
			expect(mock.paths['/partials']).toBeTruthy();
			expect(typeof mock.paths['/partials'].get).toBe('function'); // we'd check explicitly that its a Route object, but express.js changes this from time to time.
		});
	});

});
