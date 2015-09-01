(function(){
	"use strict";

	angular
	.module('forumapp')
	.controller('ListController',listController);

	function listController($scope,$http,$forumConfig,$state,manageapi,$log){
		var vm = this;
		if($forumConfig.userdetail.length>0)
			vm.username = $forumConfig.userdetail[0].name;
		else
			vm.username = 'Guest';
		vm.categories = [];
		vm.topics = [];
		vm.tempTopics = [];
		vm.currentPage = 0;
		vm.pageSize = 5;

		vm.numberOfPages=function(){
			return Math.ceil(vm.tempTopics.length/vm.pageSize);                
		}

		function init(){
			this.getCategories = function(){
				manageapi.getCategories().then(function(data){
					vm.categories = data.categories;
					vm.topics = data.topics;
				},function(error){
					$log.error(error);
				});
			}
		}
		(new init()).getCategories();

		vm.getTopics = function(index){
			if(vm.topics.length>0){
				vm.tempTopics.length = 0;
				var obj = _.filter(vm.topics,function(v){
					return v.categoryid == vm.categories[index].id;
				});

				if(obj.length>0){
					vm.tempTopics =obj;
				}
			}
		}

		vm.signout = function(){
			$forumConfig.userdetail.length = 0;
			$state.go('home');
		}

		vm.showdetail = function(index){
			$state.go('detail',{id:vm.tempTopics[index].topicid});
		}
	}
})();