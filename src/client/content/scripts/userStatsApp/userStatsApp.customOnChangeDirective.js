(function(){
	'use strict';
	/**
	 * In order to hook into a files change event handler, we use a custom
	 * directive that calls a controller function when a file has changed
	 */
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