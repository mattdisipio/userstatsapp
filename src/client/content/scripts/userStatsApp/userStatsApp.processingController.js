(function(){

	function processingController($uibModalInstance, userStatsAppService, data){
		userStatsAppService.processJsonData(data).then(function(){
			$uibModalInstance.close();
		});
	}

	angular.module('userStatsApp.processingController', [])
	.controller('processingController', ['$uibModalInstance', 'userStatsAppService', 'data', processingController])
})();