(function(){
	'use strict';

	const startsWithAThroughM = new RegExp('^[a-m]', 'i');

	
	function calculateAge(dob) { 
		var birthday = new Date(dob);
	    var ageDifMs = Date.now() - birthday.getTime();
	    var ageDate = new Date(ageDifMs); 
	    return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	function userStatsAppService($q){
		var _this = this;
		this.vm = {
			numFemale : 0,
			firstNameAToM : 0,
			lastNameAToM : 0,
			totalPopulation : 0,
			genderDataPoints : [],
			firstNameDataPoints : [],
			lastNameDataPoints : [],
			populationByStateLabels : [],
			populationByStateDataPoints : [[], [], []],
			ageGroupStats : {
				zeroToTwenty : 0,
				twentyOneToForty : 0,
				fortyOneToSixty : 0,
				sixtyOneToEighty : 0,
				eightyOneToOneHundred : 0,
				oneHundredPlus : 0
			},
			statesDataObject : []
		}

		var generateDataPoints = function(){
			var deferred = $q.defer();
			var numFemale = Math.round((_this.vm.numFemale / _this.vm.totalPopulation) * 100);
			_this.vm.genderDataPoints = [numFemale, 100 - numFemale]

			var firstNameStartsWith = Math.round((_this.vm.firstNameAToM / _this.vm.totalPopulation) * 100);
			_this.vm.firstNameDataPoints = [firstNameStartsWith, (100 - firstNameStartsWith)]

			var lastNameStartsWith = Math.round((_this.vm.lastNameAToM / _this.vm.totalPopulation) * 100)
			_this.vm.lastNameDataPoints = [lastNameStartsWith, (100 - lastNameStartsWith)]

			_this.vm.ageGroupDataPoints = [((_this.vm.ageGroupStats.zeroToTwenty / _this.vm.totalPopulation) * 100), 
			((_this.vm.ageGroupStats.twentyOneToForty/_this.vm.totalPopulation) * 100),
			((_this.vm.ageGroupStats.fortyOneToSixty / _this.vm.totalPopulation) * 100) , ((_this.vm.ageGroupStats.sixtyOneToEighty / _this.vm.totalPopulation) * 100),
			((_this.vm.ageGroupStats.eightyOneToOneHundred / _this.vm.totalPopulation) * 100), ((_this.vm.ageGroupStats.oneHundredPlus / _this.vm.totalPopulation) * 100)]

			var topPopulationStates = _this.vm.statesDataObject.slice(0, 10);

			_this.vm.populationByStateLabels = topPopulationStates.map(function(element){
				return element.stateName;
			})

			topPopulationStates.forEach(function(element){
				var percentageOfTotalPopulation = (element.population/_this.vm.totalPopulation) * 100;
				var percentageOfFemales = (element.females/element.population) * 100;
				var percentageOfMales = 100 - percentageOfFemales;
				_this.vm.populationByStateDataPoints[0].push(percentageOfTotalPopulation);
				_this.vm.populationByStateDataPoints[1].push(percentageOfFemales);
				_this.vm.populationByStateDataPoints[2].push(percentageOfMales);
			})

			deferred.resolve();

			return deferred.promise;
		}

		var compare = function(stateOne, stateTwo) {
			  if (stateOne.population < stateTwo.population)
			    return 1;
			  if (stateOne.population > stateTwo.population)
			    return -1;
			  return 0;
			}

		var getStateObject = function(stateName){
			return function(element){
				return element.stateName === stateName;
			}
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

				var temp = _this.vm.statesDataObject.filter(getStateObject(element.location.state))
				if(!temp.length > 0){
					var stateObj = {
						females : 0,
						population : 0,
						stateName : element.location.state
					}

					_this.vm.statesDataObject.push(stateObj);
				}

				var currentStateObj = _this.vm.statesDataObject.filter(getStateObject(element.location.state))[0];
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

			_this.vm.statesDataObject.sort(compare)

			generateDataPoints().then(function(){
				deferred.resolve();
			});			

			return deferred.promise;
		}
	}

	angular.module('userStatsApp.userStatsAppService', [])
	.service('userStatsAppService', ['$q', userStatsAppService])
})();