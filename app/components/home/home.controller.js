(function(){
	"use strict";

	angular
	.module('forumapp')
	.controller('HomeController',homeController);

	function homeController($scope,$http,$log){
		$scope.topForum = [];

		function init(){
			this.getTopthread = function(){
				$http.get('app/data/topthreads.json').success(function(res,status){
					if(status!=undefined && status===200){
						$scope.topForum = res.top;
					}
				}).error(function(res,status){
					$log.error(res);
				});
			}
		}
		(new init()).getTopthread();


		$scope.signin = function(invalid){
			if(invalid){
				alert('Please enter username / password');
				return;
			}
		}
	}
})();