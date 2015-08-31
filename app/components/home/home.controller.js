(function(){
	"use strict";

	angular
	.module('forumapp')
	.controller('HomeController',homeController);

	function homeController($scope,$http,$log,$state,$forumConfig){
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
			if($scope.signusername=='forumapp' && $scope.signpassword=='user1'){
				$forumConfig.userdetail.push({
					"name":$scope.signusername
				});
				angular.element('#signPop').modal('hide');

				setTimeout(function(){
					$state.go('list');
				},500);
			}
		}
	}
})();