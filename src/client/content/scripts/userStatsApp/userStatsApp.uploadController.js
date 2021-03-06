(function(){
	'use strict';

	/**
	 * Used on page load. This controller is responsible for data intake as well as receiving files for processing.
	 * @param $scope - The scope of the controller.
	 * @param userStatsAppService - Singleton service responsible for manipulating data.
	 * @param $location - Service responsible for chaning the route once data is processed.
	 * @param $uibModal - Service responsible for displaying blocking modal while charts are being built.
	 */
	function uploadController($scope, userStatsAppService, $location, $uibModal, toaster){
		/*jshint validthis:true */
		var _this = this;

		/*jshint validthis:true */
	 	this.vm = {
	 		jsonInput : '',
	 		actualJson : '',
	 		isValidJson : false,
	 		processingFile : false
	 	};	

	 	/**
	 	* Checks to make sure text entered into the textarea is valid json for processing. 
	 	* Only checks that text is in json format, doesn't check to make sure it is in the format
	 	* needed for the user stats app.
	 	**/
		this.change = function(){
			 try {
        			_this.vm.actualJson = JSON.parse(_this.vm.jsonInput);
        			if(!Object.keys(_this.vm.actualJson).length == 0){
          				_this.vm.isValidJson = true;
        			}
    			} catch(exp) {
    				_this.vm.isValidJson = false;
    				_this.vm.actualJson = '';
    		}
		};

		/**
		* When a file is selected, this function blocks the ui while the file is read into the textarea.
		**/
		this.processFile = function($event){
			$scope.$apply(function(){
				_this.vm.processingFile = true;
			});

			var file = $event.target.files[0];

			if(file){
				var r = new FileReader();
				r.onload = function(e) {
					$scope.$apply(function(){
				  		_this.vm.jsonInput = e.target.result;
				  		_this.change();
				  		_this.vm.processingFile = false;
					});
				};

	          	r.readAsText(file);
			}
		};

		/**
		* Displays a modal while charts are being generated.
		**/
		this.processJson = function(){
			$uibModal.open({
                templateUrl: '/partials/processing',
                backdrop: 'static',
                resolve : {
                	data : function(){
                		return _this.vm.actualJson;
                	}
                },
                controller : 'processingController'
            }).result.then(function(){
				$location.path('/results');

            }, function(err){
            	toaster.pop('error', 'Something Went Wrong!', 'Most likely due to bad json. Message: ' + err.message);
            });			
		};

	}

	angular.module('userStatsApp.uploadController', [])
	.controller('uploadController', ['$scope', 'userStatsAppService', '$location', '$uibModal', 'toaster', uploadController]);
})();