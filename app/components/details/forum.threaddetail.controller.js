(function () {
    "use strict";

    angular
	.module('forumapp')
	.controller('ThreaddetailController', threaddetailController);

    function threaddetailController($scope, $http, $forumConfig, $state, manageapi, $log, $stateParams) {
        var vm = this;
        vm.userloggedin = false;
        if ($forumConfig.userdetail.length > 0) {
            vm.username = $forumConfig.userdetail[0].user;
            vm.userloggedin = true;
        }
        else
            vm.username = 'Guest';

        vm.replies = [];

        vm.topics = [];


        function init() {
            this.getReplies = function () {
                manageapi.getCategories().then(function (data) {
                    if ($stateParams.id != undefined) {
                        var obj = _.filter(data.replies, function (v) {
                            return v.topicid == $stateParams.id;
                        });
                        if (obj.length > 0) {
                            vm.replies = obj;
                        }
                    }
                }, function (error) {
                    $log.error(error);
                });
            };
            this.getDetails = function () {
                manageapi.Queries().then(function (response) {
                    if (response != undefined && response.status.length > 0) {
                        if ($stateParams.id) {
                            vm.topics = _.filter(response.records, function (v) {
                                return v.queryid == $stateParams.id;
                            });
                        }
                    }
                }, function (response) {

                });
            };
            this.getPosts = function () {
                manageapi.GetPost($stateParams.id).then(function (response) {
                    if (response != undefined && response.status.indexOf('success') > -1) {
                        vm.replies = response.records;
                    }
                }, function (response) {
                    $log.error('API Error' + res);
                });
            }
        }
        (new init()).getPosts();
        (new init()).getDetails();


        vm.savePost = function (invalid) {
            if (invalid) {
                alert('Mandatory !!');
                return;
            }

            var data = {
                post: vm.post,
                category: vm.topics[0].category,
                topicid: $stateParams.id,
                username: $forumConfig.userdetail[0].user
            }

            if (data) {
                manageapi.SavePost(data).then(function (response) {
                    if (response != undefined && response.status.indexOf('success') > -1) {
                        alert('Thanks for your reply');
                        (new init()).getPosts();
                    }
                }, function (response) {
                    $log.error('API ERROR' + response);
                });
            }
        }


        vm.signout = function () {
            $forumConfig.userdetail.length = 0;
            $state.go('home');
        }
    }
})();