(function(){
	'use strict';

	function uploadController($scope){
		var _this = this;
	 	this.vm = {
	 		jsonInput : '',
	 		actualJson : '',
	 		isValidJson : false
	 	}		

		this.change = function(){
			 try {
        			_this.vm.actualJson = JSON.parse(_this.vm.jsonInput);
        			_this.vm.isValidJson = true;
    			} catch(exp) {
    				_this.vm.isValidJson = false;
    		};
		}
	}

	angular.module('userStatsApp.controllers', [])
	.controller('uploadController', ['$scope', uploadController])
})();