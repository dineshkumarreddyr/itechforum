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
		})
        .state('qentry', {
            url: '/entry',
            templateUrl: 'app/components/queryentry/forum.queryentry.html',
            controller: 'QueryentryController',
            controllerAs:'vm'
        });
	}
})();