(function(){
	'use strict';

	function resultsController(userStatsAppService){
		this.vm = {
			json : userStatsAppService.vm.json,
			genderLabels : ['Female', 'Male'],
			genderColors :  ['#f26565' , '#6e6cfc'],
			nameLabels : ['Starts With A-M', 'Does Not Start With A-M'],
			ageLabels : ['0-20', '21-40', '41-60', '61-80', '81-100', '100+'],
			ageSeries : ['Percentage In Group'],
			genderDataPoints : userStatsAppService.vm.genderDataPoints,
			firstNameDataPoints : userStatsAppService.vm.firstNameDataPoints,
			lastNameDataPoints : userStatsAppService.vm.lastNameDataPoints,
			ageGroupDataPoints : userStatsAppService.vm.ageGroupDataPoints,
			populationByStateLabels : userStatsAppService.vm.populationByStateLabels,
			populationByStateDataPoints : userStatsAppService.vm.populationByStateDataPoints,			
			barSeries : ['Percentage Of People', 'Percentage Male', 'Percentage Female']

		}


		this.barData = [
			[65, 59, 40, 41, 56, 55, 40, 10, 20, 30],
			[28, 48, 40, 19, 46, 27, 40, 10, 20, 30],
			[28, 48, 40, 19, 46, 27, 40, 10, 20, 30]
		];
	}

	angular.module('userStatsApp.resultsController', [])
	.controller('resultsController', ['userStatsAppService', resultsController])
})();