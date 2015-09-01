(function(){
	"use strict";

	angular
	.module('forumapp')
	.factory('manageapi', ['$http','$q', function($http,$q){
		function getCategories(){
			var def = $q.defer();

			$http.get('app/data/forumthreads.json')
			.success(function(res){
				def.resolve(res);
			})
			.error(function(res){
				def.reject('API Failed');
			});
			return def.promise;
		}

		function getTopics(){
			var def =$q.defer();

			$http.get('app/data/forumthreads.json')
			.success(function(res){
				def.resolve(def);
			})
			.error(function(res){
				def.reject('API Failed');
			});
			return def.promise;
		}
		function getReplies(){
			var def =$q.defer();

			$http.get('app/data/forumthreads.json')
			.success(function(res){
				def.resolve(def);
			})
			.error(function(res){
				def.reject('API Failed');
			});
			return def.promise;
		}
		return {
			getCategories:getCategories,
			getTopics:getTopics,
			getReplies:getReplies
		}
	}]);
})();