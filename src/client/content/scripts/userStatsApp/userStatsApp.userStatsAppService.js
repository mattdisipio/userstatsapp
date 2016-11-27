(function(){
	'use strict';

	const startsWithAThroughM = new RegExp('^[a-m]', 'i');

	
	function calculateAge(dob) { 
		var birthday = new Date(dob);
	    var ageDifMs = Date.now() - birthday.getTime();
	    var ageDate = new Date(ageDifMs); 
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	function userStatsAppService($q, userStatsAppDataService){
		var _this = this;
		this.vm = {
			numFemale : 0,
			firstNameAToM : 0,
			lastNameAToM : 0,
			totalPopulation : 0,
			genderDataPoints : [],
			firstNameDataPoints : [],
			lastNameDataPoints : [],
			ageGroupStats : {
				zeroToTwenty : 0,
				twentyOneToForty : 0,
				fortyOneToSixty : 0,
				sixtyOneToEighty : 0,
				eightyOneToOneHundred : 0,
				oneHundredPlus : 0
			},
			hashTable : {}
		}

		var generateDataPoints = function(){
			_this.vm.genderDataPoints = [(_this.vm.numFemale / _this.vm.totalPopulation) * 100, (1 - ((_this.vm.numFemale / _this.vm.totalPopulation))) * 100]
			_this.vm.firstNameDataPoints = [(_this.vm.firstNameAToM / _this.vm.totalPopulation) * 100, (1 - (_this.vm.firstNameAToM/ _this.vm.totalPopulation)) * 100]
			_this.vm.lastNameDataPoints = [(_this.vm.lastNameAToM / _this.vm.totalPopulation) * 100, (1 - (_this.vm.lastNameAToM / _this.vm.totalPopulation)) * 100]
			_this.vm.ageGroupDataPoints = [((_this.vm.ageGroupStats.zeroToTwenty / _this.vm.totalPopulation) * 100), 
			((_this.vm.ageGroupStats.twentyOneToForty/_this.vm.totalPopulation) * 100),
			((_this.vm.ageGroupStats.fortyOneToSixty / _this.vm.totalPopulation) * 100) , ((_this.vm.ageGroupStats.sixtyOneToEighty / _this.vm.totalPopulation) * 100),
			((_this.vm.ageGroupStats.eightyOneToOneHundred / _this.vm.totalPopulation) * 100), ((_this.vm.ageGroupStats.oneHundredPlus / _this.vm.totalPopulation) * 100)]

		}

		this.processJsonData = function(jsonData){
			var deferred = $q.defer();

			jsonData.results.map(function(element){
				if(startsWithAThroughM.test(element.name.first)){
					_this.vm.firstNameAToM ++;
				}

				if(startsWithAThroughM.test(element.name.last)){
					_this.vm.lastNameAToM ++;
				}

				if(!_this.vm.hashTable[element.location.state]){
					var stateObj = {
						females : 0,
						population : 0 
					}

					_this.vm.hashTable[element.location.state] = stateObj;
				}

				var currentStateObj = _this.vm.hashTable[element.location.state];
				if(element.gender === 'female'){
					currentStateObj.females ++;
					_this.vm.numFemale ++;
				}

				currentStateObj.population ++;

				var age = calculateAge(element.dob);

				if(age <= 20){
						_this.vm.ageGroupStats.zeroToTwenty ++;
					}
				else if(age >= 21 && age <= 40){
					_this.vm.ageGroupStats.twentyOneToForty ++;
				}
				else if(age >= 41 && age <= 60){
					_this.vm.ageGroupStats.fortyOneToSixty ++;
				}
				else if(age >= 61 && age <= 80){
					_this.vm.ageGroupStats.sixtyOneToEighty ++;
				}
				else if(age >= 81 && age <= 100){
						_this.vm.ageGroupStats.eightyOneToOneHundred ++;					
				}
				else{
					_this.vm.ageGroupStats.oneHundredPlus ++;						
				}

				_this.vm.totalPopulation ++;
			})

			generateDataPoints();
			
			deferred.resolve();

			return deferred.promise;
		}
	}

	angular.module('userStatsApp.userStatsAppService', [])
	.service('userStatsAppService', ['$q', 'userStatsAppDataService', userStatsAppService])
})();