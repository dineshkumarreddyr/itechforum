(function(){
	"use strict";

	angular
	.module('forumapp')
	.controller('CommonController',commonController);

	// Common controller configuration
	function commonController($scope,$http,$log){
		
		// Decalring scope variables
		$scope.menulist = [];

		function init(){
			this.getMenudata = function(){
				$http.get('app/data/menu.json').success(function(response,status){
					if(status!=undefined && status===200){
						$scope.menulist = response.menu;
					}
				}).error(function(response){
					$log.error(response);
				});
			}
		}
		// onActive
		(new init()).getMenudata();
	}

})();