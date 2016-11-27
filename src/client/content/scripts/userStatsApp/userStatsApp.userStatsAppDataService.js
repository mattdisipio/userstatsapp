(function(){
	'use strict';

	function userStatsAppDataService($q){
		this.vm = {

		}
	}

	angular.module('userStatsApp.userStatsAppDataService', [])
	.service('userStatsAppDataService', ['$q', userStatsAppDataService] )
	
})();