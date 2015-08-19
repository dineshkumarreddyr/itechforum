(function(){
	"use strict";

	angular
	.module('forumapp')
	.config(routerConfiguration);

	// Defining router configuration
	function routerConfiguration($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('home',{
			url:'/',
			templateUrl:'app/components/home/forum.home.html',
			controller:'HomeController'
		})
		.state('home.entry',{
			url:'/entry',
			templateUrl:'app/components/entry/entry.html'
		});
	}
})();