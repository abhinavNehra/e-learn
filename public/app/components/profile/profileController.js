app.controller("profileController",['$rootScope','$scope','changeNameService','focus', 'profileService','changeEmailService','changePasswordService','changeUserDobService','$timeout','changeUserImageService','deleteAccountService','$state', 'registerService' , function($rootScope, $scope, changeNameService, focus, profileService, changeEmailService, changePasswordService, changeUserDobService, $timeout, changeUserImageService, deleteAccountService, $state, registerService) {
	$scope.basicProfile = function(){
		profileService.query(function(data){
		$scope.editUser = data.result.local;
		APP.currentUser = data.result;
		});
	};
	$scope.basicProfile();
	$scope.showErrEmail = false;
	$scope.errMsg = '';
	$scope.activeAction = false;
	$scope.activeProfile = true;
	$scope.nameSubmit = false;
	$scope.openeditName = false;
	$scope.openeditEmail = false;
	$scope.emailSubmit = false;
	$scope.openeditPassword = false;
	$scope.passwordSubmit = false;
	$scope.openeditDob = false;
	$scope.dobSubmit = false;
	$scope.uploadLoader = false;
	$scope.noFile = '';
	$scope.location = '';	
	$scope.uploadLoader = false;
	$scope.openeditImage = false;
	$scope.errorDelete = false;
	$scope.popup1 = {
		opened: false
	};
	//AWS 
	AWS.config.region = 'ap-northeast-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'ap-northeast-1:13efca28-48cb-445d-9b50-882e3b055c2a',
	});
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};
	$scope.format = 'dd-MMMM-yyyy';
	$scope.disabled = function(date, mode) {
		return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	};
	$scope.altInputFormats = ['M!/d!/yyyy'];
	$scope.maxDate = new Date();
	$scope.toggleMin = function() {
		$scope.minDate =  null;
	};
	$scope.open1 = function() {
		$scope.popup1.opened = true;
	};
	/*$scope.emailValidate = function(){
		$scope.showErrEmail = false;
		$scope.errMsg = '';
		if($scope.user.email === undefined){
		} else {
			registerService.save({email : $scope.user.email }, function(data){
				if(data.statusCode == 200 &&  data.message == "ok" && data.result.message == 'verified'){
					
				} else if (data.statusCode == 422 && data.message == 'email already registered'){
					$scope.showErrEmail = true;
					$scope.errMsg = frontendSettings.userregistered;
				} else  if (data.statusCode == 422 && data.message == 'email should be registered with any email provider'){
					$scope.showErrEmail = true;
					$scope.errMsg = frontendSettings.domainnotValid;
				} else {
					$scope.showErrEmail = true;
					$scope.errMsg = frontendSettings.errorOccured;
				} 
			});
		}
	};*/
	
	$scope.toggleMin();
	// Open edit form
	$scope.openEditForm = function(index){
		console.log("in", index);
		$scope.openeditImage = false;
		$scope.openeditName = false;
		$scope.openeditDob = false;
		$scope.openeditEmail = false;
		$scope.openeditPassword = false;
		switch(index){
			case 1 :
				$scope.openeditImage = true;
				break;
			case 2 :
				$scope.openeditName = true;
				break;
			case 3 :
				$scope.openeditDob = true;
				break;
			case 4 :
				$scope.openeditEmail = true;
				$scope.showErrEmail = false;
				$scope.errMsg = '';
				break;
			case 5 :
				$scope.openeditPassword = true; 
				$scope.editUser.password = '';
				break;	
		}		
	};
	// Edit change Name
	$scope.changeName = function(){
		$scope.nameSubmit = true;
		if($scope.editUser.name === undefined || $scope.editUser.name === ''){
			focus('name');
			return false;
		}
		var opts = {};
		opts.name = $scope.editUser.name;
		changeNameService.update({id: APP.currentUser._id}, opts, function(data){
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.openeditName = false;
				$scope.nameSubmit = false;
				$scope.basicProfile();
			}
		});
	};
	// Edit change email
	$scope.changeEmail = function(){
		$scope.emailSubmit = true;
		if($scope.editUser.email === undefined || $scope.editUser.name === ''){
			focus('email');
			return false;
		} else if($scope.showErrEmail === true){
			focus('email');
			return false;
		}

		
		registerService.save({email : $scope.editUser.email }, function(data){
				if(data.statusCode == 200 &&  data.message == "ok" && data.result.message == 'verified'){
					var opts = {};
					opts.email = $scope.editUser.email;
					changeEmailService.update({id: APP.currentUser._id}, opts, function(data){
						if(data.statusCode === 200 && data.message === 'ok'){
							$scope.openeditEmail = false;
							$scope.emailSubmit = false;
							$scope.basicProfile();
						}
					});
				} else if (data.statusCode == 422 && data.message == 'email already registered'){
					$scope.showErrEmail = true;

					$timeout(function() {
						$scope.showErrEmail = false;
					}, 3000); 
					$scope.errMsg = frontendSettings.userregistered;
				} else  if (data.statusCode == 422 && data.message == 'email should be registered with any email provider'){
					$scope.showErrEmail = true;
					$scope.errMsg = frontendSettings.domainnotValid;
					$timeout(function() {
						$scope.showErrEmail = false;
					}, 3000); 
				} else {
					console.log("fdgfdgdfgdfdgfd");
					$scope.showErrEmail = true;
					$scope.errMsg = frontendSettings.domainnotValid;
					$timeout(function() {
						$scope.showErrEmail = false;
					}, 3000); 
				} 
		});

			
		
	};
	//Edit change password
	$scope.changePassword = function(){
		$scope.passwordSubmit = true;
		if($scope.editUser.password === undefined || $scope.editUser.password === ''){
			focus('password');
			return false;
		}
		var opts = {};
		opts.password = $scope.editUser.password;
		changePasswordService.update({id: APP.currentUser._id}, opts, function(data){
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.openeditPassword = false;
				$scope.passwordSubmit = false;
				$scope.basicProfile();
			}
		});
	};
	// covert calender date
	$scope.convert = function(str){
		var date = new Date(str),
		mnth = ("0" + (date.getMonth()+1)).slice(-2),
		day  = ("0" + date.getDate()).slice(-2);
		return [ day, mnth , date.getFullYear() ].join("/");
	};
	//Edit Date of birth
	$scope.changeDob = function(){
		$scope.dobSubmit = true;
		if($scope.dt === undefined || $scope.dt === ''){
			focus('dob');
			return false;
		}
		$scope.dob = $scope.convert($scope.dt);
		var opts = {};
		opts.dob = $scope.dob;
		changeUserDobService.update({id: APP.currentUser._id}, opts, function(data){
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.openeditDob = false;	
				$scope.popup1.opened = false;
				$scope.dobSubmit = false;
				$scope.basicProfile();
			}
		});
	};
	// Upload image in profile data for  logged user
	
	$scope.upload = function (element) { 
		$scope.noFile = '';
		$scope.imag = '';
		$scope.showProgressBar = false;
		$scope.fileModel =  element.files[0];
		$scope.uploadLoader = false;
		if ($scope.fileModel) {
			if($scope.fileModel.type === 'image/jpeg' || $scope.fileModel.type === 'image/png'){
				$scope.uploadLoader = true;
				var bucket = new AWS.S3({params: {Bucket: 'mindmaxdaffo'}});
				var imageName = $scope.fileModel.name + Math.floor(Date.now() / 1000);
				$scope.imag = imageName;
				var params = {Key: imageName, ContentType: $scope.fileModel.type, Body: $scope.fileModel};
				bucket.upload(params).on('httpUploadProgress', function(evt) {
				$scope.barShow =  parseInt((evt.loaded * 100) / evt.total)+'%';
				$scope.percentageStyle = {
					width : $scope.barShow    
				};
				$scope.$digest();
				}).send(function(err, data) {
					if(err){
						$scope.uploadLoader = false;
						$scope.noFile = 'Error in uploading file, please try again';
						$scope.$digest();
						$timeout(function() {
							$scope.noFile = '';
						}, 3000); 
					} else {
						$scope.uploadLoader = false;
						$scope.showProgressBar = true;
						//$scope.noFile = 'Image uploaded successfully';
						$timeout(function() {
							$scope.noFile = '';
						}, 3000);  
						$scope.location = data.Location;
						$scope.barShow = '0%';
						element.value = null;
						$scope.$digest();
					}
				});
			} else {
				$scope.noFile = 'Please upload a image with jpeg and png format';
			}	
		}
		else {
			$scope.noFile = 'Please upload a file first';
		}
	};

	// change image in profile data for  logged user
	$scope.changeImage = function(){
		if($scope.location === '' || $scope.location === undefined){
			$scope.noFile = 'Please upload a file first';
			focus('image');
			$timeout(function() {
				$scope.noFile = '';
			}, 3000);  
			return false;
		}
		var opts = {};
		opts.avatar_url = $scope.location;
		changeUserImageService.update({id: APP.currentUser._id} , opts , function(data){
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.openeditImage = false;	
				$scope.editUser.avatar_url = $scope.location;
				$scope.location = '';
				$scope.basicProfile();
			}
		});
	};
	//Hide preview of image
	$scope.hidePreview = function(){
		$scope.location = '';
		$scope.openeditImage = false;	
		$scope.fileModel = null;
		var bucketInstance = new AWS.S3();
		var params = {
			Bucket: 'mindmaxdaffo',
			Key: $scope.imag
		};
		bucketInstance.deleteObject(params, function (err, data) {
		});
	};
	//Cancel edit  box
	$scope.cancelSave = function(index){
		console.log("in", index);
		switch(index){
			case 1 :
				$scope.openeditImage = false;
				$scope.basicProfile();
				break;
			case 2 :
				$scope.openeditName = false;
				$scope.basicProfile();
				break;
			case 3 :
				$scope.openeditDob = false;
				$scope.basicProfile();
				break;
			case 4 :
				$scope.openeditEmail = false;
				$scope.basicProfile();
				break;
			case 5 :
				$scope.openeditPassword = false;
				$scope.basicProfile();
				break;
		}
	};
	// Delete Account
	$scope.deleteMyAccount = function(){
		deleteAccountService.delete({id: APP.currentUser._id}, function(data){
			if(data.statusCode === 200 && data.message === 'ok' && data.result.message === 'user deleted'){
				localStorage.removeItem('loggedInUser');
				$rootScope.isLoggedIn = false;
				$state.go('home',{},{ reload: true });
			} else {
				$scope.errorDelete = true;
				$scope.delError = frontendSettings.delError;
				$timeout(function() {
					$scope.errorDelete = false;
				}, 2000);
			}
		}, function(error){
			console.log("delete", error);
		});
	};
}]);