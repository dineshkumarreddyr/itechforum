(function () {
    "use strict";

    angular
	.module('forumapp')
	.controller('HomeController', homeController);

    function homeController($scope, $http, $log, $state, $forumConfig, manageapi, $rootScope) {
        $scope.topForum = [];
        $scope.loggedin = false;

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

        $scope.signin = function (invalid) {
            if (invalid) {
                alert('Please enter mandatory fields');
                return;
            }
            var data = {
                user: $scope.signusername,
                pass: $scope.signpassword
            };

            manageapi.loginUser(data).then(function (res) {
                if (res && res.status != undefined) {
                    if (res.status.indexOf('success') > -1) {
                        $scope.loggedin = true;
                        angular.element('#signPop').modal('hide');
                        $scope.loggedinuser = res.records[0].user;
                        $scope.loggedinuserid = res.records[0].userid;
                        $rootScope.loginusername = res.records[0].user;
                        $forumConfig.userdetail.push(res.records[0]);
                    }
                    else if (res.status.indexOf('error') > -1) {
                        alert('Invalid email address or password. Please check your details and try again');
                    }
                }
            }, function (res) {
                $log.error(res);
            });
        }

        $scope.resetSignup = function () {
            $scope.user = $scope.email = $scope.pass = null;
        }

        $scope.addTopic = function () {
            if ($forumConfig.userdetail.length > 0) {
                $state.go('qentry');
            }
            else {
                angular.element('#signPop').modal('show');
            }
        }
    }
})();