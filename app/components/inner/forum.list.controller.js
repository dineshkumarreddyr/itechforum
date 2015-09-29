(function () {
    "use strict";

    angular
	.module('forumapp')
	.controller('ListController', listController);

    function listController($scope, $http, $forumConfig, $state, manageapi, $log) {
        var vm = this;

        vm.userloggedin = false;
        if ($forumConfig.userdetail.length > 0) {
            vm.username = $forumConfig.userdetail[0].user;
            vm.userloggedin = true;
        }
        vm.categories = [];
        vm.topics = [];
        vm.tempTopics = [];
        vm.currentPage = 0;
        vm.pageSize = 5;

        vm.getCurrentPageSizeArray = function (num) {
            return new Array(num);
        }

        vm.pagingclick = function (index) {
            vm.currentPage = index;
        }

        vm.numberOfPages = function () {
            return Math.ceil(vm.tempTopics.length / vm.pageSize);
        }

        function init() {
            //this.getCategories = function () {
            //    manageapi.getCategories().then(function (data) {
            //        vm.categories = data.categories;
            //        vm.topics = data.topics;
            //    }, function (error) {
            //        $log.error(error);
            //    });
            //};

            this.getQueries = function () {
                manageapi.Queries().then(function (response) {
                    vm.topics = response.records;
                    vm.categories = _.chain(response.records).groupBy("category").pairs()
                             .map(function (currentItem) {
                                 return _.object(_.zip(["category"], currentItem));
                             }).value();

                    
                }, function (error) {
                    $log.error(error);
                });
            }
        }
        //(new init()).getCategories();
        (new init()).getQueries();

        vm.getTopics = function (index) {
            if (vm.topics.length > 0) {
                vm.tempTopics.length = 0;
                var obj = _.filter(vm.topics, function (v) {
                    return v.category == vm.categories[index].category;
                });

                if (obj.length > 0) {
                    vm.tempTopics = obj;
                }
            }
        }

        vm.signout = function () {
            $forumConfig.userdetail.length = 0;
            $state.go('home');
        }

        vm.showdetail = function (index) {
            $state.go('detail', { id: vm.tempTopics[index].queryid });
        }
    }
})();