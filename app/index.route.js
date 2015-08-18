(function(){
	"use strict";

	angular
	.module('forumapp')
	.config(routerConfiguration);

	// Defining router configuration
	function routerConfiguration($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/home/entry');

		$stateProvider
		.state('home',{
			url:'/home',
			templateUrl:'app/common/common.html',
			controller:'CommonController'
		})
		.state('home.entry',{
			url:'/entry',
			templateUrl:'app/components/entry/entry.html'
		});
	}
})();