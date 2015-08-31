(function(){
	"use strict";

	angular
	.module('forumapp')
	.controller('ListController',listController);

	function listController($scope,$http,$forumConfig,$state){
		var vm = this;
		vm.username = $forumConfig.userdetail[0].name;


		function init(){
			this.getTopthread = function(){
				$http.get('app/data/topthreads.json').success(function(res,status){
					if(status!=undefined && status===200){
						vm.topForum = res.top;
					}
				}).error(function(res,status){
					$log.error(res);
				});
			}
		}
		(new init()).getTopthread();

		vm.signout = function(){
			$forumConfig.userdetail.length = 0;
			$state.go('home');
		}
	}
})();