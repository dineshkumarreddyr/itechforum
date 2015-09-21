(function () {
    "use strict";

    angular
	.module('forumapp')
	.controller('QueryentryController', queryentryController);

    function queryentryController($scope, $http, $forumConfig, $state, manageapi, $log) {
        var vm = this;

        vm.userloggedin = false;
        if ($forumConfig.userdetail.length > 0) {
            vm.username = $forumConfig.userdetail[0].user;
            vm.userloggedin = true;
        }


        vm.entry = function (invalid) {
            if (invalid) {
                alert('Please enter all mandator fields');
                return;
            }

            var data = {
                category: vm.category,
                topic: vm.topic,
                description: vm.query,
                user: $forumConfig.userdetail[0].loggedinuserid
            }

            manageapi.logQuery(data).then(function (res) {
                if (res != undefined && res.status.indexOf('success') > -1) {
                    alert('Data inserted successfully!!');
                    resetForm();
                }
            }, function (res) {
                $log.error(res);
            });
        }

        var resetForm = function () {
            vm.category = vm.topic = vm.query = null;
        }
    }
})();