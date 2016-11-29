(function(){
	'use strict';
	/**
	 * Entry point for user stats angular app.
	 */
	angular.module('userStatsApp', ['userStatsApp.uploadController', 'userStatsApp.resultsController', 'userStatsApp.processingController', 'userStatsApp.userStatsAppService', 'ui.bootstrap', 'ngRoute', 'chart.js', 'customOnChange', 'toaster'])
	.config(function($routeProvider){
		$routeProvider.when('/', {
			templateUrl : 'partials/upload',
			controller : 'uploadController',
			controllerAs : 'uploadCtrl'
		})
		.when('/results', {
			templateUrl : 'partials/results',
			controller : 'resultsController',
			controllerAs : 'resultsCtrl'
		})
	})
})();