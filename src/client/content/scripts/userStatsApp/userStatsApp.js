(function(){
	'use strict';

	angular.module('userStatsApp', ['userStatsApp.controllers', 'ui.bootstrap', 'ngRoute'])
	.config(function($routeProvider){
$routeProvider.when('/', {
	templateUrl : 'partials/upload',
	controller : 'uploadController',
	controllerAs : 'uploadCtrl'
})
	})
})();