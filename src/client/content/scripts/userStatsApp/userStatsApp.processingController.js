(function(){

	/**
	 * Controller used to display modal while processing json data.
	 * @param $uibModalInstance - The modal instance this controller is used with.
	 * @param userStatsAppService - Singleton service responsible for manipulating data.
	 * @param data - The json data that is used to build the graphs
	 */
	function processingController($uibModalInstance, userStatsAppService, data, $timeout){
		$timeout(function(){
			userStatsAppService.processJsonData(data).then(function(){
					$uibModalInstance.close();
				}, function(err){
					$uibModalInstance.dismiss(err);
				});			
		}, 100);
	
	}

	angular.module('userStatsApp.processingController', [])
	.controller('processingController', ['$uibModalInstance', 'userStatsAppService', 'data', '$timeout', processingController]);
})();