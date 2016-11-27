(function(){
	'use strict';

	function uploadController($scope, userStatsAppService, $location, $uibModal){
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

		this.processJson = function(){
			/** $uibModal.open({
                templateUrl: '/partials/processing',
                controller: '',
                backdrop: 'static'
            });
            **/

			userStatsAppService.processJsonData(_this.vm.actualJson).then(function(){
				$location.path('/results');
			});
		}

	}

	angular.module('userStatsApp.uploadController', [])
	.controller('uploadController', ['$scope', 'userStatsAppService', '$location', '$uibModal', uploadController])
})();