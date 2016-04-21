app.controller('viewSharedController', ['$scope', '$uibModalInstance','getViewActivityService','editActivityService','likeActivityService','unlikeActivityService','activityId','$uibModal','$timeout',
    function ($scope, $uibModalInstance,getViewActivityService,editActivityService, likeActivityService, unlikeActivityService, activityId, $uibModal, $timeout) {
		$scope.isLike = false;
		$scope.isUnlike =  false;
		$scope.editDescription = false;
		$scope.editDescriptionValue = '';
		$scope.activityFormEditSubmitted = false;
		$scope.showLike = false;
			var opts = {};
			$scope.viewDetailActivity = {};
			$scope.activityLoader = true;
			opts.id = activityId;	
			getViewActivityService.query(opts,function(data){
				if(data.statusCode === 200 && data.message === 'ok'){
					$scope.viewDetailActivity = data.result;
					$scope.getLike = data.result.likes.indexOf(APP.currentUser._id);
					if($scope.getLike === -1) {
						$scope.showLike = false;
					} else {
						$scope.showLike = true;
					}
					$scope.likedPeople = data.result.likes.length;
					$scope.activityLoader = false;
				}
			});
		//$scope.showLikeView = true;
		$scope.closeModal = function () {
			$scope.viewDetailActivity = {};
			$scope.editDescription = false;
			$scope.editDescriptionValue = '';
			$scope.$emit("CallUpdatedCommunityMethod", {});
			$scope.$emit("CallUpdatedSpaceMethod", {});
			$uibModalInstance.dismiss('cancel');
        };

		/*$timeout(function(){
			$scope.loadMoreComments();
		}, 3000);  
		
		$scope.loadMoreComments = function(){
		var elmnt = document.getElementById("getHeight");
		var txt = "Height including padding and border: " + elmnt.scrollHeight + "px<br>";
		console.log("Height", txt);
		};*/
		
		// Like Activity
		$scope.likeActivity = function(id,owner_id,likedPeople){
			var opts = {};
			opts.activityOwner = owner_id;
			likeActivityService.update({id: id} , opts , function(data){
				if(data.statusCode === 200 && data.message === 'ok'){
					$scope.isLike = true;
					$scope.showLike = true;
					$scope.isUnlike =  false;
					$scope.likedPeople = likedPeople + 1;
				} else {
					console.log("error", data);
				}
			}, function(error){
				console.log("errrr", error);
			});
		};
		//Unlike Activity
		$scope.unlikeActivity = function(id, owner_id, likedPeople){
			var opts = {};
			opts.activityOwner = owner_id;
			unlikeActivityService.update({id: id} , opts , function(data){
				if(data.statusCode === 200 && data.message === 'ok'){
					$scope.isLike = false;
					$scope.showLike = false;
					$scope.isUnlike =  true;
					if($scope.likedPeople > 0){
						$scope.likedPeople = likedPeople - 1;
					} else {
						$scope.likedPeople = likedPeople;
					}
				} else {
					console.log("error", data);
				}
			}, function(error){
				console.log("errrr", error);
			});
		};

        $scope.editDetail = function(){
			$scope.editDescription = true;
			$scope.editDescriptionValue = $scope.viewDetailActivity.description;
		};
		$scope.saveDetail = function(form ,id){
			$scope.activityFormEditSubmitted = true;
			//autosize(document.querySelectorAll('.editpostbox'));
			if($scope.editDescriptionValue === undefined || $scope.editDescriptionValue === ''){
				focus('description');
				return false;
			}
			var opts = {};
			opts.description = $scope.editDescriptionValue;
			editActivityService.query({id : id} , opts , function(data){
				if(data.statusCode === 200 && data.message === "ok"){
					$scope.editDescription = false;
					$scope.viewDetailActivity.description = $scope.editDescriptionValue;
				}
			});
		};
		$scope.cancel = function(){
			$scope.editDescriptionValue = '';
			$scope.editDescription = false;
		};
		$scope.openModal = function(id){
			console.log("nie", id);
			var modalInstance = $uibModal.open({
					animation: $scope.animationsEnabled,
					size: 'lg',
					templateUrl: 'app/shared/activityDetail/detail.html',
					controller: 'findPeopleController',
					scope: $scope,
					backdrop: 'static',
					keyboard : false,
					resolve: {
						activityId: function () {
							return  id;
						}
					}
					
			});
		};	
	}
]);
app.controller("findPeopleController",['$rootScope', '$uibModalInstance','$scope', '$uibModal', '$log', 'viewLikeUserService','activityId', function($rootScope, $uibModalInstance,$scope, $uibModal,$log, viewLikeUserService, activityId) {
	console.log("in findPeopleController",activityId);
	$scope.listLikeUser = [];
	$scope.showUserLoader = true;
	viewLikeUserService.query({id:activityId},function(data){
		if(data.statusCode === 200 && data.message === "ok"){
			console.log("data", data);
			$scope.listLikeUser = data.result[0].likes;
			console.log("datalistLikeUser", $scope.listLikeUser);
			$scope.showUserLoader = false;
		}
		}, function(){} );
	$scope.closeModal2 = function () {
		console.log("closeModal2");
			$uibModalInstance.dismiss('cancel');
        };
	}
]);

