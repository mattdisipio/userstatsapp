(function(){
	'use strict';

	function customOnChange(){
		return {
	    restrict: 'A',
	    link: function (scope, element, attrs) {
	      var onChangeHandler = scope.$eval(attrs.customOnChange);
	      element.bind('change', onChangeHandler);
	    }
	  };
	}

	angular.module('customOnChange', [])
	.directive('customOnChange', [customOnChange]);
})();