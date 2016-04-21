app.controller("actionController",['$rootScope','$scope','$timeout','getActionService','saveCompleteActionService', function($rootScope, $scope, $timeout, getActionService, saveCompleteActionService) {
	
	$scope.getAction = {};
	$scope.showActionList = false;
	$scope.loaderShowA = true;
	$scope.selectSaveActionList = [];
	$scope.activeAction = true;
	$scope.activeProfile = false;
	$scope.actionLoader = false;
	$scope.resultAction = false;
	$rootScope.$emit("callHeaderController",true);
	// get user save actions
	$scope.getUserActions = function(){
		getActionService.query(function(data) {
		$scope.loaderShowA = false;
		if(data.statusCode === 200 && data.message === 'ok'){
			if(data.result.length > 0){
			/*	for(var i = 0; i<data.result.length; i++){
					console.log("in eeeefor" , data.result[i].status);
					if(data.result[i].status == 1){
						console.log("in for" , data.result[i].status);
						$scope.showActionList = true;
						break;
					}
				}*/
				$scope.showActionList = true;
				$scope.getAction = data.result;
			}
		} 
	}, function(error){
		console.log("error", error);
	});
	};
	$scope.getUserActions();
	//toggle checkbox for actions save
	$scope.toggleCheckSaveAction = function(id){
		$scope.actionLoader = true;
		/*saveCompleteActionService.update({id:id}, function(data){
			$scope.actionLoader = false;
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.resultAction = true;
				$scope.errMsg = frontendSettings.successActionSaved;
				$timeout(function() {
					$scope.resultAction = false;
					$scope.getUserActions();
				}, 2000);
			} else {
				$scope.resultAction = true;
				$scope.errMsg = frontendSettings.errorOccured;
				$timeout(function() {
					$scope.resultAction = false;
					}, 3000);
			}
			},function(error){
				console.log("error1", error);
		});*/
	};

}]);