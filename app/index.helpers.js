(function () {
    "use strict";

    angular
	.module('forumapp')
	.value('$forumConfig', {
	    userdetail: [],
	    apiUrl: 'http://localhost:4321/'
	});


    angular.module('forumapp').run(function ($rootScope, manageapi, $state) {
        $rootScope.loginusername = '';
    });
})();