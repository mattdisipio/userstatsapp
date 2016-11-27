(function(){
	'use strict';

	function resultsController(userStatsAppService){
		this.vm = {
			json : userStatsAppService.vm.json,
			genderLabels : ['Female', 'Male'],
			genderColors :  ['#f26565' , '#6e6cfc'],
			ageLabels : ['21-40', '41-60', '61-80', '81-100', '100+'],
			ageSeries : ['Percentage In Group'],
			ageData : [10, 20, 40, 10, 5]

		}
		console.log(userStatsAppService.vm.json)


		this.labels = ["Female", "Male"];
  		this.data = [40, 60];

	 	this.barLabels = ['State 1', 'State 2', 'State 3', 'State 4', 'State 5', 'State 6', 'State 7', 'State 8', 'State 9', 'State 10'];
		this.barSeries = ['Data Set 1', 'Data Set 2', 'Data Set 3'];

		this.barData = [
			[65, 59, 40, 41, 56, 55, 40, 10, 20, 30],
			[28, 48, 40, 19, 46, 27, 40, 10, 20, 30],
			[28, 48, 40, 19, 46, 27, 40, 10, 20, 30]
		];
	}

	angular.module('userStatsApp.resultsController', [])
	.controller('resultsController', ['userStatsAppService', resultsController])
})();