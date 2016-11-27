(function(){
	'use strict';

	const startsWithAThroughM = '/(^[a-m])/gi';

	

	function userStatsAppService($q, userStatsAppDataService){
		var _this = this;
		this.vm = {
			json : ''
		}

		this.processJsonData = function(jsonData){
			console.log(jsonData)
			_this.vm.json = jsonData;
		}
	}

	angular.module('userStatsApp.userStatsAppService', [])
	.service('userStatsAppService', ['$q', 'userStatsAppDataService', userStatsAppService])
})();