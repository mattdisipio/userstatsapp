(function(){

	/**
	 * Represents a book.
	 * @param $uibModalInstance - The modal instance this controller is used with.
	 * @param userStatsAppService - Singleton service responsible for manipulating data.
	 * @param data - The json data that is used to build the graphs
	 */
	function processingController($uibModalInstance, userStatsAppService, data){
		userStatsAppService.processJsonData(data).then(function(){
			$uibModalInstance.close();
		}, function(err){
			$uibModalInstance.dismiss(err);
		});
	}

	angular.module('userStatsApp.processingController', [])
	.controller('processingController', ['$uibModalInstance', 'userStatsAppService', 'data', processingController])
})();