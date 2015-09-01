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
		})
		.state('list',{
			url:'/list',
			templateUrl:'app/components/inner/forum.list.html',
			controller:'ListController',
			controllerAs:'vm'
		})
		.state('detail',{
			url:'/detail?:id',
			templateUrl:'app/components/details/forum.threaddetail.html',
			controller:'ThreaddetailController',
			controllerAs:'vm'
		});
	}
})();