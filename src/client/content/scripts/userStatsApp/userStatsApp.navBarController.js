(function(){
	'use strict';

	function navbarController($scope, $location){
	 	this.isActive = function (viewLocation) { 
        	return viewLocation === $location.path();
    	};
	}

	angular.module('userStatsApp.navbarController', [])
	.controller('navbarController', ['$scope', '$location', navbarController]);
})();