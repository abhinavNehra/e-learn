app.controller("communityController",['$scope','$rootScope','getCommunityService','$uibModal','getViewActivityService', function($scope, $rootScope, getCommunityService, $uibModal, getViewActivityService) {
	$scope.commloader = true;
	$scope.activityList = [];
	$scope.mycommListShow = false;
	AWS.config.region = 'ap-northeast-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'ap-northeast-1:13efca28-48cb-445d-9b50-882e3b055c2a',
	});

	// function for get the community  
	$scope.showCommunityList  = function(){
		getCommunityService.query(function(data) {
			$scope.commloader = false;
			if(data.statusCode === 200 && data.message === 'ok'){
				if(data.result.length > 0){
					$scope.mycommListShow = false;
					$scope.activityList = data.result;
				} else {
					$scope.mycommListShow = true;
				}
			} 
		}, function(error){
			console.log("error", error);
		});
    };
    $scope.showCommunityList();
   

    // Open modal for view full detail of activity in my community
	$scope.viewActivity = function(activityId){ 
		if($rootScope.isLoggedIn === false){
			$scope.$emit("ShowModalLogin", {});
		} else {	
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				size: 'lg',
				templateUrl: 'app/shared/activityDetail/viewSharedActivity.html',
				controller: 'viewSharedController',
				scope: $scope,
				backdrop: 'static',
				keyboard : false,
				resolve: {
					activityId: function () {
						return  angular.copy(activityId);
					}
				}
			});
		}
	};
	// $on on click on like
	$scope.$on('callViewActivityLike', function (event, args) {
		$scope.id = args.id;
		console.log($scope.id);
		$scope.viewActivity($scope.id);
 });
	// Scrolling in page
	$scope.loadMore = function(){
		//$scope.showCommunityList();
		console.log("gggg");
	};
	
}]);
