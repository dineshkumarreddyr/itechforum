(function () {
    "use strict";

    angular
	.module('forumapp')
	.factory('manageapi', ['$http', '$q', '$log', '$forumConfig', function ($http, $q, $log, $forumConfig, $state) {
	    function getCategories() {
	        var def = $q.defer();

	        $http.get('app/data/forumthreads.json')
			.success(function (res) {
			    def.resolve(res);
			})
			.error(function (res) {
			    def.reject('API Failed');
			});
	        return def.promise;
	    }

	    function getTopics() {
	        var def = $q.defer();

	        $http.get('app/data/forumthreads.json')
			.success(function (res) {
			    def.resolve(def);
			})
			.error(function (res) {
			    def.reject('API Failed');
			});
	        return def.promise;
	    }
	    function getReplies() {
	        var def = $q.defer();

	        $http.get('app/data/forumthreads.json')
			.success(function (res) {
			    def.resolve(def);
			})
			.error(function (res) {
			    def.reject('API Failed');
			});
	        return def.promise;
	    }
	    function createuser(data) {
	        var deferred = $q.defer();

	        $http.post($forumConfig.apiUrl + 'signup', data)
            .success(function (res, status) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
                $log.error('API failed - ' + res);
            })
	        return deferred.promise;
	    };
	    function loginuser(data) {
	        var deferred = $q.defer();

	        $http.post($forumConfig.apiUrl + 'signin', data)
            .success(function (res) {
                deferred.resolve(res);
            }).error(function (res) {
                deferred.reject(res);
                $log.error('API failed  - ' + res);
            });
	        return deferred.promise;
	    };

	    function logoutuser() {
	        $forumConfig.userdetail = [];
	        $state.go('/');
	    };

	    function logquery(data) {
	        var deferred = $q.defer();

	        $http.post($forumConfig.apiUrl + 'iquery', data)
            .success(function (res) {
                deferred.resolve(res);
            }).error(function (res) {
                deferred.reject(res);
                $log.error('API failed  - ' + res);
            });
	        return deferred.promise;
	    };

	    function getQueries() {
	        var deferred = $q.defer();

	        $http.get($forumConfig.apiUrl + 'gquery')
            .success(function (res) {
                deferred.resolve(res);
            })
            .error(function (res) {
                deferred.reject(res);
                $log.error('API failed - ' + res);
            });
	        return deferred.promise;
	    };

	    return {
	        getCategories: getCategories,
	        getTopics: getTopics,
	        getReplies: getReplies,
	        createUser: createuser,
	        loginUser: loginuser,
	        logoutUser: logoutuser,
	        logQuery: logquery,
	        Queries: getQueries
	    }
	}]);
})();