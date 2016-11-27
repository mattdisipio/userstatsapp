(function(){
	'use strict';

	angular.module('userStatsApp', ['userStatsApp.uploadController', 'userStatsApp.resultsController', 'userStatsApp.userStatsAppService', 'userStatsApp.userStatsAppDataService', 'ui.bootstrap', 'ngRoute', 'chart.js'])
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