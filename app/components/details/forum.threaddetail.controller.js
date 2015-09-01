(function(){
	"use strict";

	angular
	.module('forumapp')
	.controller('ThreaddetailController',threaddetailController);

	function threaddetailController($scope,$http,$forumConfig,$state,manageapi,$log,$stateParams){
		var vm = this;
		if($forumConfig.userdetail.length>0)
			vm.username = $forumConfig.userdetail[0].name;
		else
			vm.username = 'Guest';

		vm.replies = [];


		function init(){
			this.getReplies =function(){
				manageapi.getCategories().then(function(data){
					if($stateParams.id!=undefined){
						var obj = _.filter(data.replies,function(v){
							return v.topicid==$stateParams.id;
						});
						if(obj.length>0){
							vm.replies = obj;
						}
					}
				},function(error){
					$log.error(error);
				});
			}
		}
		(new init()).getReplies();
	}
})();