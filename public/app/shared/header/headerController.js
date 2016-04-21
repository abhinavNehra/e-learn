app.controller("headerController",['$rootScope', '$scope', '$uibModal', '$log','getNotificationService','viewAllNotificationService','viewOneNotificationService', function($rootScope, $scope, $uibModal,$log, getNotificationService, viewAllNotificationService, viewOneNotificationService) {
	$scope.showRegForm = false;
	$scope.animationsEnabled = true;
	$scope.showDropMenu = false;
	$scope.skip = 0;
	$scope.showAllNotificationList = [];
	//Code for notification section
	$scope.notificationloader = false;


	// show registration form
	$scope.showRegisterForm = function(){
		$scope.$broadcast("CallParamsCloseMethod", {});
		$scope.showRegForm = true;
		var modalInstance = $uibModal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'app/shared/register/registerView.html',
			controller: 'registerController',
			scope: $scope,
			backdrop: 'static',
			keyboard : false
		});
	
	modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
    };
	$scope.menuAccount = function(){
		$scope.showDropMenu = true;
	};
	$scope.cancel = function () {
		$uibModal.dismiss('cancel');
	};
	// $on in parent method for show login form
	$scope.$on("ShowModalLogin", function(){
		$scope.showRegisterForm();
	});
	$rootScope.$on("callHeaderController", function(event, value){
        $scope.backToLessons = value;
    });
	$scope.listResponse = 1;
	$scope.allTotal = 0;
    // Function for get the all notification in list
    $scope.getAllNotificationShow = function(){
		var limit_start = $scope.showAllNotificationList.length;
		var limit = 5;
		if ((( $scope.allTotal > limit_start) || $scope.allTotal === 0 ) && $scope.listResponse === 1) {
			$scope.listResponse = 0;
			$scope.notificationloader = true;
			getNotificationService.query({id : APP.currentUser._id,skip:limit_start,limit:limit}, function(data){
				$scope.listResponse = 1;
				if(data.statusCode === 200 && data.message === "ok"){
					$scope.notificationloader = false;
					$scope.getNotificationShow = true;
					$scope.allTotal = data.result.totalCount;
					$scope.showAllNotificationList = $scope.showAllNotificationList.concat(data.result.notifications);
				}  else {
					$scope.notificationloader = false;
					$scope.getNotificationShow = 0;
					$scope.showAllNotificationList = [];
					$scope.allTotal = 0;
				}
			},function(error){
				console.log("error", error);
			});
		}
    };
    //view All notifications 
	$scope.seenAllMessage = function(){
		if($scope.getTotalNotification > 0){ 
			viewAllNotificationService.update({id:APP.currentUser._id},function(data){
				if(data.statusCode === 200 && data.message === "ok"){
					$scope.$emit("callTotalNotification", {});
				}
			}, function(){});
		}
	};
	$scope.removeNotification = function(index){
		//console.log("removeNotification");
	};
	$scope.viewLikeActivity = function(index,id, notiId){
		$scope.getNotificationShow = true;
		$scope.showAllNotificationList[index].status = 'seen';
		$("#activity-noti-"+ index).removeClass("unread-noti").addClass("read-noti");
		$scope.$broadcast('callViewActivityLike', { id: id });
		viewOneNotificationService.update({id: APP.currentUser._id, nid : notiId}, function(data){
		}, function(){});
	};
	$scope.loadMoreNoti = function(){
		console.log("loadMoreNoti");
		$scope.getAllNotificationShow();
	};
}]);
