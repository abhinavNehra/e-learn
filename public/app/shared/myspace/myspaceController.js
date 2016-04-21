app.controller("myspaceController",['$scope','getspaceService','getViewActivityService','$uibModal','removeActivityService', function($scope, getspaceService, getViewActivityService, $uibModal, removeActivityService) {
	$scope.spaceloader = true;
	$scope.mySpaceList = [];
	var opts = {};
	opts.id = APP.currentUser._id;
	$scope.mySpaceMsg = true;

	// function for get the community  
	$scope.showSpaceList  = function(){
		getspaceService.query(opts, function(data) {
				$scope.spaceloader = false;
				if(data.statusCode === 200 && data.message === 'ok'){
					if(data.result.length > 0){
						$scope.mySpaceList = data.result;
						$scope.mySpaceMsg = false;
					}
				} 
		}, function(error){
				console.log("error", error);
		});
	};
	$scope.showSpaceList();
	$scope.$on("CallUpdatedSpaceMethod", function(){
		$scope.showSpaceList();
	});
	// Open modal for view full detail of activity in my space
	$scope.viewActivitySpace = function(activityId){ 
		/*var opts = {};
		$scope.showLike = false;
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
			}
		});	*/
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			size: 'lg',
			templateUrl: 'app/shared/activityDetail/viewSharedActivity.html',
			controller: 'viewSharedController',
			scope: $scope,
			resolve: {
				activityId: function () {
					return  angular.copy(activityId);
				}
			}
		});
	};
	$scope.deleteMyActivity = function($event, id, url){
		$event.stopPropagation();
		removeActivityService.remove({id : id}, function(data){
		
			if(data.statusCode === 200 && data.message === 'ok'){
				//console.log("dddd", data, res);
				$scope.showSpaceList();
				if(url){
					var res = url.split("com/");
					console.log("re", res);
					var bucketInstance = new AWS.S3();
					var params = {
						Bucket: 'mindmaxdaffo',
						Key: res[1]
					};
					bucketInstance.deleteObject(params, function (err, data) {
					});
				} 
			}
		});
	};
	
}]);