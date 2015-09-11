(function () {
    "use strict";

    angular
	.module('forumapp')
	.value('$forumConfig', {
	    userdetail: [],
	    apiUrl: 'http://localhost:4321/'
	});
})();