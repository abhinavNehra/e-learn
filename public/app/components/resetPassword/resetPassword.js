app.controller("resetPasswordController",['$scope','$stateParams','resetPasswordService','$timeout', function($scope, $stateParams, resetPasswordService, $timeout) {
	//$scope.editUser = APP.currentUser.local;
	$scope.tokenId = $stateParams.user;
	$scope.submittedResetForm = false;
	$scope.password = {};
	$scope.resetLoader = false;
	$scope.submitResetPassword = function(){
		$scope.resetError = '';
		$scope.submittedResetForm = true;
		
		if($scope.password.newpass === null || $scope.password.newpass === undefined){
			focus('password1');
			return false;
		}  else if($scope.password.conpass === null || $scope.password.conpass === undefined){
			focus('password2');
			return false;
		} else if($scope.password.conpass !== $scope.password.newpass){
			focus('password2');
			$scope.resetError = 'password did not match';
			$timeout(function() {
				$scope.resetError = '';
			}, 3000); 
			return false;
		}
		$scope.resetLoader = true;
		var opts = {};
		opts.access_token = $scope.tokenId;
		opts.password = $scope.password.newpass;
		opts.confirmPassword = $scope.password.newpass;
		resetPasswordService.save(opts, function(data){
			$scope.resetLoader = false;
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.password = {};
				$scope.submittedResetForm = false;
				$scope.resetError = 'The Password has been changed with Success';
				$timeout(function() {
					$scope.resetError = '';
				}, 3000);
			} else if ((data.statusCode === 401 && data.message === 'unauthorized') || (data.statusCode === 422)){
				$scope.resetError = 'You are not authorized for reset password';
				$timeout(function() {
					$scope.resetError = '';
				}, 3000);
			} else {
				$scope.resetError = 'Error occured in reset password';
				$timeout(function() {
					$scope.resetError = '';
				}, 3000);
			}
		}, function(error){
			console.log("error in forgot password");
		});
	};
}]);