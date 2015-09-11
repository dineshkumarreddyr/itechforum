(function () {
    "use strict";

    angular
	.module('forumapp')
	.controller('HomeController', homeController);

    function homeController($scope, $http, $log, $state, $forumConfig, manageapi) {
        $scope.topForum = [];

        function init() {
            this.getTopthread = function () {
                $http.get('app/data/topthreads.json').success(function (res, status) {
                    if (status != undefined && status === 200) {
                        $scope.topForum = res.top;
                    }
                }).error(function (res, status) {
                    $log.error(res);
                });
            }
        }
        (new init()).getTopthread();

        $scope.showCategories = function () {
            $state.go('list');
        }

        $scope.signin = function (invalid) {
            if (invalid) {
                alert('Please enter username / password');
                return;
            }
            if ($scope.signusername == 'forumapp' && $scope.signpassword == 'user1') {
                $forumConfig.userdetail.push({
                    "name": $scope.signusername
                });
                angular.element('#signPop').modal('hide');

                setTimeout(function () {
                    $state.go('list');
                }, 500);
            }
        }

        $scope.signup = function (invalid) {
            if (invalid) {
                alert('Please fill all the mandatory fields');
                return;
            }
            var data = {
                user: $scope.user,
                pass: $scope.pass,
                email: $scope.email
            }

            manageapi.createUser(data).then(function (res) {
                if (res && res.status.indexOf('success') > -1) {
                    alert('Account created successfully!!');
                    $scope.resetSignup();
                }
            }, function (e) {
                $log.error(e);
            });

        }

        $scope.resetSignup = function () {
            $scope.user = $scope.email = $scope.pass = null;
        }
    }
})();