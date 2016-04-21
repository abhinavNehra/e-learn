function doGet($resource, url, opt, callback){
	var data = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
};
callback(data);
$resource(url,{}, {query : {method : "GET" , isArray :  true} });
/* $resource("api/StudentsApi", {}, {
            query: { method: "GET", isArray: true },
            create: { method: "POST" },
            get: { method: "GET", url: "/api/StudentsApi?id=:id" },
            remove: { method: "DELETE", url: "/api/StudentsApi?id=:id" },
            update: { method: "PUT", url: "/api/StudentsApi?id=:id" }
       });
*/


}
app.factory('focus', function($timeout) {
    return function(id) {
      $timeout(function() {
        var element = document.getElementById(id);
        if(element){
          element.focus();
        }
      },400);
    };
});
app.filter('capitalize', function(){
   return function(input){
        if(input){
            return input[0].toUpperCase() + input.slice(1);
        }
   };
});

app.directive('confirmClick', function() {
    return {
        link: function (scope, element, attrs) {
            // setup a confirmation action on the scope
            scope.confirmClick = function(msg) {

              msg = msg || attrs.confirmClick || frontendSettings.confirmDeleteActivity ;
                // return true/false to continue/stop the ng-click
                return confirm(msg);
            };
        }
    };
});
app.directive('confirmClickDelete', function() {
    return {
        link: function (scope, element, attrs) {
           
            // setup a confirmation action on the scope
            scope.confirmClick = function(msg) {
               msg = msg || attrs.confirmClick || frontendSettings.confirmDeleteAccount ;
                // return true/false to continue/stop the ng-click
                return confirm(msg);
            };
        }
    };
});
app.directive('confirmClickComment', function() {
    return {
        link: function (scope, element, attrs) {
           
            // setup a confirmation action on the scope
            scope.confirmClick = function(msg) {
               msg = msg || attrs.confirmClick || frontendSettings.confirmDeleteComment ;
                // return true/false to continue/stop the ng-click
                return confirm(msg);
            };
        }
    };
});
 //Displaying the loading image form for loading
  app.directive('showProgressBar', function() {
    return {
      restrict: 'E',
      template: '<img src="assets/img/proceed.gif" alt="processing..." />'
    };
  });

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
/*app.factory('getActionUserService', function ($resource) {
	console.log("hiiiiii",APP.endpoints.actionSave);
   return  $resource(APP.endpoints.actionSave);
});*/
/*app.factory('getActionService', function ($resource) {
	return  $resource(APP.endpoints.actionSave);
});*/
app.factory('getActionService', function ($resource) {
   return  $resource(APP.endpoints.actionSave,{},{query: { method: "GET", isArray: false }});
});
app.factory('saveCompleteActionService',function($resource){
	return $resource(APP.endpoints.saveCompleteAction,{ id: '@id'}, {update: { method: "PUT"}});
});

app.controller("homeController",['$rootScope','$scope','moduleService','lessonService','lessonDetailService','getCommunityService', function($rootScope, $scope,moduleService, lessonService, lessonDetailService, getCommunityService) {
  $scope.oneAtATime = true;
  $scope.showSpace = false;
  $scope.showGroup = false;
  $rootScope.$emit("callHeaderController",false);
  //$scope.showActivity = false;
  $scope.showCommunity = true;
 // $scope.actionlist = false;
  $scope.showMyspace = function(){
    $scope.showGroup = false;
    $scope.showCommunity = false;
    $scope.showSpace = true;
    $scope.$broadcast("CallUpdatedSpaceMethod", {});
    /*var container = angular.element('#masoranyGrid1');
    container.imagesLoaded( function() {
      container.masonry({
        columnWidth:1,
        itemSelector: '.girdItem',
        gutter: 13,
         percentPosition: true
      });
    });*/
  };

  $scope.showMycommunity = function(){
    $scope.showGroup = false;
    $scope.showCommunity = true;
    $scope.showSpace = false;
    /*var container = angular.element('#masoranyGrid');
    container.imagesLoaded( function() {
      container.masonry({
        columnWidth:1,
        itemSelector: '.girdItem',
        gutter: 13,
        percentPosition: true
      });
    });*/
    getCommunityService.query(function(data) {
      $scope.commloader = false;
      if(data.statusCode === 200 && data.message === 'ok'){
        if(data.result.length > 0){
          $scope.activityList = data.result;
        }
      } 
  }, function(error){
      console.log("error", error);
  });

  };
  $scope.showMyGroups = function(){
    $scope.showGroup = true;
    $scope.showCommunity = false;
    $scope.showSpace = false;
  };
  
 /* $scope.closeThis = function () {
    $scope.showActivity = false;
    angular.element('#fadein').removeClass('color-overlay');
  };
  $scope.showAction = function(){
    $scope.actionlist = true;
    $scope.showActivity = true;
  };*/
  //$scope.users = UserService.query();
  /*moduleService.get({ id: 10 },function (data) {
     console.log('success, got data: ', data);
   }, function (err) {
     alert('request failed');
   });
  /*moduleService.getAllModules(opts ,function(data){
    console.log("datatatta", data);
  });*/
  //console.log(moduleService.query());
}]);
app.factory('moduleService', function ($resource) {
   return  $resource(APP.endpoints.module,{},{query: { method: "GET", isArray: false }});
});
app.factory('lessonService', function ($resource) {
   return  $resource(APP.endpoints.lesson);
});
app.factory('lessonDetailService', function ($resource) {
   return  $resource(APP.endpoints.lessonDetail);
});



app.controller("landingController",['$scope', function($scope) {
	$scope.landing  = true;
}]);

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
app.factory('changeNameService', function ($resource) {
   return  $resource(APP.endpoints.changeUserName,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changeEmailService', function ($resource) {
   return  $resource(APP.endpoints.changeUserEmail,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changePasswordService', function ($resource) {
   return  $resource(APP.endpoints.changeUserPass,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changeUserDobService', function ($resource) {
   return  $resource(APP.endpoints.changeUserDob,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changeUserImageService', function ($resource) {
   return  $resource(APP.endpoints.changeUserImage,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('deleteAccountService', function ($resource) {
   return  $resource(APP.endpoints.deleteAccount,{ id: '@id'},{update: { method: "PUT"}});
});

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
app.factory('resetPasswordService', function($resource){
	return $resource(APP.endpoints.resetPassword);
});

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
					//$scope.loadMoreComments();
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

		$timeout(function(){
			$scope.loadMoreComments();
		}, 3000);  
		
		$scope.loadMoreComments = function(){
		var elmnt = document.getElementById("getHeight");
		var txt = "Height including padding and border: " + elmnt.scrollHeight + "px<br>";
		console.log("Height", txt);
		};
		
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


app.controller("commentsController",['$scope','postCommentService','postListCommentService','$timeout','deleteCommentService','editCommentService', function($scope,postCommentService, postListCommentService, $timeout, deleteCommentService, editCommentService){
	$scope.commentFormSubmitted = false;
	$scope.commentList = [];
	$scope.errorComment = false;
	$scope.notificationloader = false;
	$scope.commentProcess = false;
	$scope.hideAllComments = false;
	$scope.remainingComments = 0;
	$scope.fixedComment = false;
	$scope.avatar = APP.currentUser.local.avatar_url;
	
	// watch the activity id	
	$scope.$watch('activityId',function handleIdChange( newValue, oldValue ) {
        $scope.activityId = newValue;
        $scope.UserId = APP.currentUser._id;
        $scope.commentList = [];
        $scope.getComments(1);
	});

	//get the comments 
    $scope.getComments = function(index){
		var limit_start = 0;
		var limit = 6;
		var opts;
		if(index == 1){
			opts = {id : $scope.activityId,skip:limit_start,limit:limit };
		} else {
			opts = {id : $scope.activityId};
		}
		$scope.notificationloader = true;
		postListCommentService.query(opts, function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.notificationloader = false;
				$scope.commentProcess = false;
				$scope.commentList = data.result.comments;
				/*if(data.result.comments.length > 4){
					$scope.fixedComment = true;
				}*/
				var elmnt = document.getElementById("commentBox");
		var txt = "Height including padding and border: " + elmnt.scrollHeight + "px<br>";
		console.log("Height", txt);
				if(data.result.totalCount > data.result.comments.length){
					$scope.remainingComments = data.result.totalCount - data.result.comments.length;
				}
				if(index == 2) $scope.hideAllComments = true;
			}  else {
				$scope.notificationloader = false;
				$scope.commentList = [];
				$scope.commentProcess = false;
			}
		});
	};	
	// post the comments
    $scope.postComment = function() {
		$scope.commentFormSubmitted = true;
		var opts = {};
		opts.user = APP.currentUser._id;
		$scope.errorComment = false;
		opts.comment = $scope.txtcomment.trim();
		opts.activity = $scope.activityId;
		postCommentService.save({id:$scope.activityId}, opts , function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.commentList.push(data.result[0]);
				$scope.txtcomment = '';
				$scope.commentFormSubmitted = false;
			} else {
				$scope.errorComment = false;
				$scope.errCommentMessage = frontendSettings.errorOccured;
				$timeout(function() {
					$scope.errorComment = false;
				}, 3000);
			}
		});
	};
	//delete the comment for id
	$scope.deleteComment = function(index, id){
		$scope.loader[index] = true;
		deleteCommentService.delete({id :$scope.activityId ,commentId : id}, function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.commentList .splice(index, 1);
				$scope.loader[index] = true;
			}
		}, function(error){
			console.log("delete", error);
		});
	};
	$scope.commentLoading =[];
	$scope.editCommentText = [];
	$scope.isEditComment = [];
	$scope.activeCommentEdit = [];
	$scope.commentErrorMsg = [];
    $scope.commentErrorCls = [];
    // open the edit comment box

	$scope.updateComment = function(index, comment){
		$scope.commentLoading[index] = true;
		$scope.activeCommentEdit = [];
		$scope.commentErrorMsg[index] = '';
        $scope.commentErrorCls[index]= '';
		$scope.isEditComment[index] = false;
		$scope.editCommentText[index] = comment.comment;
		$scope.activeCommentEdit[index] = comment._id;
		$("#commentBox").hide();
	};
	// cancel edit comment
	$scope.cancelPost = function(index){
		$scope.commentLoading[index] = false;
		$scope.commentLoading = [];
		$scope.editCommentText = [];
		$scope.isEditComment = [];
		$scope.activeCommentEdit = [];
		$scope.commentErrorMsg = [];
        $scope.commentErrorCls = [];
        $("#commentBox").show();
	};
	// edit comment
	$scope.editComment = function(index , comment){
		var opts = {};
        $scope.commentErrorMsg[index]= '';
        $scope.isEditComment[index]= false;
        var newText = $scope.editCommentText[index];
        if(newText === undefined || newText === '') {
            $scope.commentErrorCls[index] = 'text-red';
            $scope.commentErrorMsg[index] = "Can not save empty comment";
            $timeout(function(){
                $scope.commentErrorCls[index] = '';
                $scope.commentErrorMsg[index] = '';
            }, 8000);
            return false;
        } 
		var opts1 ={};
		opts1.comment = newText;
		$scope.isEditComment[index]= true;
		editCommentService.update({id :$scope.activityId ,commentId : comment._id},opts1,function(data){
			if(data.statusCode === 200 && data.message === "ok"){
				$scope.activeCommentEdit[index] = '';
				$scope.commentErrorCls[index] = '';
				$scope.commentErrorMsg[index] = '';
				$scope.editCommentText[index] = '';
				$scope.commentList[index].comment = newText;
				$scope.isEditComment[index] = false;
				$("#commentBox").show();
			}  else {
				$scope.commentInProcess[index] = false;
				$scope.isEditComment[index] = false;
				$scope.commentErrorCls[index] = 'text-red';
				$scope.commentErrorMsg[index]= frontendSettings.errorOccured;
				$("#commentBox").show();
			}
			$timeout(function(){
				$scope.commentErrorCls[index] = '';
				$scope.commentErrorMsg[index] = '';
			}, 8000);
		}, function(error){

		});
	};
	// show all comments on click on view all comments
	$scope.showAllComments = function(){
		$scope.commentProcess = true;
		$scope.getComments(2);
	};
}]);
app.directive('commentsForm', ['postListCommentService' ,function (postListCommentService) {
	return {
		templateUrl: 'app/shared/comments/commentsView.html',
		restrict: 'E',
		scope : true,
		link: function ($scope, element, $attrs) {
			$scope.activityId = $attrs.activityId;
		},
		controller: 'commentsController'
	};
}]);

app.factory('postCommentService', function ($resource) {
	return  $resource(APP.endpoints.postComment);
});
app.factory('postListCommentService', function ($resource) {
	return  $resource(APP.endpoints.postComment, {},{query: { method: "GET", isArray: false }});
});
app.factory('deleteCommentService', function ($resource) {
	return  $resource(APP.endpoints.updateComment, {id : '@id' ,commentId : '@commentId'},{ delete: { method: "DELETE"}});
});
app.factory('editCommentService', function ($resource) {
	return  $resource(APP.endpoints.updateComment, {id : '@id' ,commentId : '@commentId'},{ update: { method: "PUT"}});
});
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

app.directive('community', function () {
	return {
		templateUrl: 'app/shared/community/communityView.html',
		restrict: 'E',
		controller: 'communityController'
	};
});

app.factory('getCommunityService', function ($resource) {
	return  $resource(APP.endpoints.createActivity,{},{query: { method: "GET", isArray: false }});
});
app.factory('getViewActivityService', function ($resource) {
	return  $resource(APP.endpoints.viewActivity,{},{query: { method: "GET", isArray: false }});
});
app.factory('likeActivityService', function($resource){
	return $resource(APP.endpoints.likeActivity, { id: '@id'}, {update: { method: "PUT"}});
});
app.factory('unlikeActivityService', function($resource){
	return $resource(APP.endpoints.unlikeActivity, { id: '@id'}, {update: { method: "PUT"}});
});
app.factory('removeActivityService', function ($resource) {
	return  $resource(APP.endpoints.deleteActivity,{id: '@id'},{remove: { method: "DELETE"}});
});
app.factory('editActivityService', function ($resource) {
	return  $resource(APP.endpoints.editActivity,{id: '@id'},{query: { method: "PUT"}});
});
app.factory('viewLikeUserService', function ($resource) {
	return  $resource(APP.endpoints.getListLike,{}, {query: { method: "GET",  isArray: false }});
});
app.directive('myGroup', function () {
	return {
		templateUrl: 'app/shared/group/groupView.html',
		restrict: 'E',
		controller: ''
	};
});
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

app.directive('header', function () {
	return {
		templateUrl: 'app/shared/header/headerView.html',
		restrict: 'E',
		controller: 'headerController'
	};
});
app.factory('getStatistics', function ($resource) {
	return  $resource(APP.endpoints.statistics,{}, {query :{method : "GET", isArray :false}});
});

app.factory('getNotificationService', function ($resource) {
	return  $resource(APP.endpoints.getNotification,{}, {query :{method : "GET", isArray :false}});
});
app.factory('viewAllNotificationService', function ($resource) {
	return  $resource(APP.endpoints.viewAllNotification,{ id: '@id'}, {update: { method: "PUT"}});
});
app.factory('viewOneNotificationService', function ($resource) {
	return  $resource(APP.endpoints.viewOneNotification,{ id: '@id',nid : '@nid'}, {update: { method: "PUT"}});
});
app.factory('actionService', function ($resource) {
	return  $resource(APP.endpoints.actions);
});
app.factory('actionUserService', function ($resource) {
	return  $resource(APP.endpoints.actionUser,  { id: '@id',actionId:'@actionId' },{query: { method: "PUT"}});
});
app.factory('createActivity', function($resource){
	return $resource(APP.endpoints.createActivity);
});
app.factory('moduleCommunityService', function($resource){
	return $resource(APP.endpoints.moduleCommunity);
});
app.factory('lessonCommunityService', function($resource){
	return $resource(APP.endpoints.lessonCommunity);
});
app.factory('completedLessonService', function($resource){
	return $resource(APP.endpoints.completedLesson);
});

app.controller("modulesController",['$scope','$rootScope','$timeout', 'moduleService','lessonService','lessonDetailService','actionService','actionUserService','createActivity','$uibModal','$state','moduleCommunityService','lessonCommunityService','completedLessonService','$window' ,function($scope,$rootScope, $timeout,moduleService,lessonService,  lessonDetailService, actionService, actionUserService, createActivity,$uibModal,$state, moduleCommunityService, lessonCommunityService, completedLessonService, $window) {
	$scope.modules =[];
	$scope.lesson = '';
	$scope.lessonDetail = '';
	$scope.loader = false;
	$scope.actionlist = false;
	$scope.showActivity = false;
	$scope.activityFormSubmitted = false;
	$scope.lessonSeeMore = false;
	$scope.selectAction = [];
	$scope.activity = {};
	$scope.shareLoader =false;
	$scope.module_id = '';
	$scope.mycommListShow = false;
	$scope.noFile = '';	
	$scope.successAct = false;
	$scope.activityError = false;
	$scope.lenAction = false;
	$scope.uploadLoader = false;
	$scope.showLesson = false;
	$scope.delImage = false;
	$scope.uploadSuccess = false;
	
	//AWS 
	AWS.config.region = 'ap-northeast-1'; // Region
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: 'ap-northeast-1:13efca28-48cb-445d-9b50-882e3b055c2a',
	});
	
	//close detail of lesson
	$scope.$on("CallParamsCloseMethod", function(){
		$scope.closeLessonModal();
	});
	$scope.closeLessonModal = function(){
		$scope.actionlist = false;
		$scope.showActivity = false;
		
	};

	// Api call for module list
	var module = moduleService.query(function(data) {
		$scope.modules = data.result;
    });



    // Function for show the action list regarding to lesson id

	$scope.showAction = function(id){
		if($rootScope.isLoggedIn === false){
			$scope.actionlist = false;
			$scope.showActivity = false;
			$scope.$emit("ShowModalLogin", {});
		} else {
			$scope.selectAction = [];
			$scope.actionlist = true;
			$scope.dataAction = [];
			$scope.noActionList = false;
			$scope.loader = true;
			$scope.showActivity = true;
			opts = {};
			opts.id = id;
			actionService.get(opts, function(data){
				if(data.statusCode === 200 && data.message === 'ok'){
					if(data.result.length > 0){
						$scope.dataAction = data.result;
						$scope.showactionList = true;
						$scope.loader = false;
					} else {
						$scope.showactionList = false;
						$scope.noActionList = true;
						$scope.loader = false;
					}
				}
			},function(error){
				console.log("error", error);
			});
		}
	};
	//toggle checkbox for actions save
	$scope.toggleCheckAction = function(id, moduleId){
		var filtered  = $scope.selectAction.filter(function(element, index){
			if (element.id == id){
				return index+1;
			}
		});

		if (filtered.length) {
			$scope.selectAction.splice($scope.selectAction.indexOf(filtered[0]), 1);
		} else {
			$scope.selectAction.push({id: id , moduleId : moduleId});
		}
	};

	// save actions of lesson
	$scope.saveAction = function(id, lessonId){
		$scope.lenAction = false;
		$scope.actionLoader = false;
		$scope.successAction = false;
		if($scope.selectAction.length === 0){
			$scope.lenAction = true;
		} else {
			$scope.actionLoader = true;
			for(var i = 0; i<$scope.selectAction.length; i++){
				var last = ( i == $scope.selectAction.length-1 ? 1 : 0);
				$scope.saveUserActions(last ,lessonId ,$scope.selectAction[i].id,$scope.selectAction[i].moduleId);
			}
		}
	};
	// save user action from loop
	$scope.saveUserActions = function(last ,lessonId,id , moduleId){
		var opts = {};
		opts.lesson = lessonId;
		opts.user = APP.currentUser._id;
		opts.action = id;
		opts.module = moduleId;
		actionUserService.query({id:lessonId, actionId: id},opts, function(data){
			if(data.statusCode === 200 && data.message === 'ok'){
				if(last ===1) {
					$scope.actionLoader = false;
					$scope.successAction = true;
					$timeout(function() {
						$scope.successAction = false;
						$scope.showAction(lessonId);
					}, 3000);
				}	
			} else {
				console.log("error", data);
			}
		},function(error){
			console.log("error1", error);
		});
	};
	// Close the activity section

	/*	$scope.closeThis = function () {
			$scope.showActivity = false;
			angular.element('#fadein').removeClass('color-overlay');
		};
	*/
	// Expand the lesson regarding to particular module id

	$scope.expandLesson = function(Id){
		//$scope.selected = index; 
		angular.element('#fadein').removeClass('color-overlay');
		$scope.showactionList = false;
		$scope.showActivity = false;
		$scope.showLesson = false;
		//$scope.mycommListShow = false;
		
		$scope.loader = true;
		lessonService.get({ id: Id }, function(data) {
		$scope.loader = false;
		$scope.lesson = data.result;
		if($scope.lesson.length > 0){
			$scope.showLesson = true;
		}
		moduleCommunityService.get({id: Id}, function(data){
			if(data.result.length > 0){
				$scope.activityList = data.result;
				$scope.mycommListShow = false;	
			} else {
				$scope.activityList = data.result;
				$scope.mycommListShow = true;
			}
		});

		}, function(error){
			console.log("erorr");
		});
	};
	// Get lesson detail on click on lesson

	$scope.getlessonDetail = function($event , id, completeAttr){
		$scope.noFile = '';
		$scope.activity = {};
		angular.element('#fileUploaded').val(null);
		$scope.activityList = [];
		$scope.mycommListShow = false;
		$scope.activityFormSubmitted = false;
		$event.stopPropagation();
		angular.element('#fadein').addClass('color-overlay');
		$scope.showActivity = true;
		$scope.actionlist = false;
		if(completeAttr === true){
			$("#completeDft").attr("disabled","disabled");
		} else {
			$("#completeDft").removeAttr("disabled");
		}
		lessonDetailService.get({id : id }, function(data){
		if(data.statusCode == 200){
			$scope.lessonDetail = data.result;
			$scope.module_id = $scope.lessonDetail.module;
			$scope.Keytakeaways = $scope.lessonDetail.Keytakeaways ? $scope.lessonDetail.Keytakeaways.split(".") : [];
			lessonCommunityService.get({id: id}, function(data){
				if(data.result.length > 0){
					$scope.activityList = data.result;
					$scope.mycommListShow = false;	
				} else {
					$scope.mycommListShow = true;
					$scope.activityList = data.result;	
				}
			});
		} else {
			console.log("in else part");
		}
		});
	};
	// Create function for finish the lesson
	$scope.finishLesson = function(id, moduleId){
		if($rootScope.isLoggedIn === false){
			$scope.actionlist = false;
			$scope.showActivity = false;
			$scope.$emit("ShowModalLogin", {});
		} else {
			var opts = {};
			opts.user = APP.currentUser._id;
			opts.lesson = id;
			completedLessonService.save(opts, function(data){
				//$state.go('home',{}, {reload : true});
				if(data.message === 'ok' && data.statusCode === 200){
					$scope.closeLessonDetail();
					$scope.expandLesson(moduleId);
				}
			}, function(error){
				console.log("error");
			});
		}
	};
	// close lesson detail
	$scope.closeLessonDetail = function(){
		$scope.showactionList = false;
		$scope.activity.description = '';
		$scope.showActivity = false;
		angular.element('#fadein').removeClass('color-overlay');
	};
	$scope.switchLessonDescription = function(){
		$scope.lessonSeeMore = $scope.lessonSeeMore ? false : true;
	};
	// close action list detail
	$scope.closeActionDetail = function(){
		$scope.actionlist = false;
	};
	// Close the image preview
	$scope.hidePreview = function(){
		$scope.activity.location = '';
		$scope.activity.fileModel = null;
		var bucketInstance = new AWS.S3();
		var params = {
			Bucket: 'mindmaxdaffo',
			Key: $scope.imag
		};
		bucketInstance.deleteObject(params, function (err, data) {
		});
	};
	$scope.confirmClick = function(){
		//console.log("ggggg");
	};

	// Function for uplad the image on s3 server
	$scope.upload = function (element) {
		
		if($rootScope.isLoggedIn === false){
			$scope.actionlist = false;
			$scope.showActivity = false;
			$scope.$emit("ShowModalLogin", {});
		} else {
			$scope.noFile = '';
			$scope.delImage = false;
			$scope.imag = '';
			$scope.uploadSuccess = false;
			$scope.showProgressBar = false;
			//$scope.showProgressBar = false;
			$scope.activity.fileModel =  element.files[0];
			$scope.uploadLoader = false;
			if ($scope.activity.fileModel) {
				if($scope.activity.fileModel.type === 'image/jpeg' || $scope.activity.fileModel.type === 'image/png'){
					$scope.uploadLoader = true;
					var bucket = new AWS.S3({params: {Bucket: 'mindmaxdaffo'}});
					var imageName = $scope.activity.fileModel.name + Math.floor(Date.now() / 1000);
					$scope.imag = imageName;
					var params = {Key: imageName, ContentType: $scope.activity.fileModel.type, Body: $scope.activity.fileModel};
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
							$scope.uploadSuccess = true;
							$scope.activity.location = data.Location;
							if($scope.delImage) {
								$scope.hidePreview();
								$scope.activity.location = '';
								$scope.activity.fileModel = null;
							}
							$scope.showProgressBar = true;
							//$scope.noFile = 'Image uploaded successfully';
							$timeout(function() {
								$scope.noFile = '';
							}, 3000);  
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
	}
	return   $scope.activity.location;
	};

	// Create activity item
	$scope.createActivityItem = function(i , lesson_id, module_Id){
		$scope.delImage = false;
		if($rootScope.isLoggedIn === false){
			$scope.actionlist = false;
			$scope.showActivity = false;
			$scope.$emit("ShowModalLogin", {});
		} else {
			$scope.activityFormSubmitted = true;
			if($scope.activity.description === undefined || $scope.activity.description === ''){
				focus('description');
				return false;
			}
			if($scope.uploadLoader === true){
				if ($window.confirm(frontendSettings.confirmPostActivity)) {
					$scope.uploadLoader = false;
					$scope.delImage = true;
					$scope.activity.location = '';
					$scope.activity.fileModel = null;
					$scope.showProgressBar = false;
				} else {
					$scope.showActivity = true;
				} 
			} 
			if(!$scope.activity.fileModel || $scope.uploadSuccess){
				$scope.showActivity = false;
				var modalInstance = $uibModal.open({
					animation: $scope.animationsEnabled,
					templateUrl: 'app/shared/shareActivity/shareActivityView.html',
					controller: 'ModalController',
					scope: $scope,
					backdrop: 'static',
					keyboard : false
				});
			}	
		// Function for post the activity
		$scope.postActivity = function(i, mygroupcheck){
		
			var opts = {};
			opts.user = APP.currentUser._id;
			opts.lesson = lesson_id;
			opts.type = 'image';
			opts.description = $scope.activity.description;
			if($scope.activity.location === '' || $scope.activity.location === undefined){
				opts.url = '';
			} else {
				opts.url = $scope.activity.location;
			}
			opts.module = $scope.module_id;
			
			createActivity.save(opts,function(data){
				$scope.shareLoader = false;
				if(data.statusCode === 200 && data.message === 'ok'){
					if(mygroupcheck === undefined || mygroupcheck === false) { 
						$scope.successAct = true;
						$scope.successActMsg = frontendSettings.shareCom;
					} else {
						$scope.successAct = true;
						$scope.successActMsg = frontendSettings.shareGroup;
					}
					$scope.module_id = '';
					$scope.activity = {};
					$scope.showProgressBar = false;
					angular.element('#fileUploaded').val(null);
					$timeout(function() {
						$scope.successAct = false;
						modalInstance.dismiss('cancel');
						$scope.expandLesson(module_Id);
						$scope.$broadcast("CallUpdatedCommunityMethod", {});
						$scope.$broadcast("CallUpdatedSpaceMethod", {});
						$rootScope.getStatistics();
						//$state.go('home',{id:module_Id},{ reload: true });
					}, 1800); 

				} else {
					$scope.activityError = true;
					$scope.showProgressBar = false;
					$timeout(function() {
						$scope.activityError = false;
						modalInstance.dismiss('cancel');
						$scope.expandLesson(module_Id);
					}, 1800); 
				}
			}, function(error){
				$scope.activityError = true;
					$timeout(function() {
						$scope.activityError = false;
						modalInstance.dismiss('cancel');
						$state.go('home',{},{ reload: true });
					}, 1800); 
			});
		};
	}	
	};
}]);
app.directive('modulesList', function () {
	return {
		templateUrl: 'app/shared/modules/modulesView.html',
		restrict: 'E',
		controller: 'modulesController'
	};
});
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
app.directive('mySpace', function () {
	return {
		templateUrl: 'app/shared/myspace/myspaceView.html',
		restrict: 'E',
		controller: 'myspaceController'
	};
});
app.factory('getspaceService', function ($resource) {
	return  $resource(APP.endpoints.mySpace,{id: '@id'},{query: { method: "GET", isArray: false }});
});
app.controller("registerController",['$scope','$uibModalInstance','registerService','focus','signupService','loginService','profileService','$state','$rootScope','$uibModal','forgotPasswordService','$timeout', function($scope, $uibModalInstance, registerService, focus, signupService, loginService, profileService, $state, $rootScope, $uibModal, forgotPasswordService, $timeout) {
	$scope.showLoginForm = true;
	$scope.showRegForm = false;
	$scope.showErrEmail = false;
	$scope.formSubmitted = false;
	$scope.loginFormSubmitted = false;
	$scope.user = {};
	$scope.forgot = {};
    $scope.signupStart = false;
    $scope.userNotFound = false;
    $scope.userPassWrong = false;
    $scope.showForgotPass = false;
    $scope.msgShow = '';
    $scope.forgotLoader = false;
    $scope.forgotmessage = '';
    // show login form
	$scope.showLogin = function(){
		$scope.user = {};
		$scope.dt = '';
		$scope.showLoginForm = true;
		$scope.showRegForm = false;
		$scope.formSubmitted = false;
		$scope.loginFormSubmitted = false;
	};
	$scope.popup1 = {
		opened: false
	};
	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1,
		showWeeks:'false'
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
	
	$scope.toggleMin();
	
	// show registration form
	$scope.showRegister = function(){
		$scope.user = {};
		$scope.dt = '';
		$scope.showRegForm = true;
		$scope.showLoginForm = false;
		$scope.formSubmitted = false;
		$scope.loginFormSubmitted = false;
	};

	// Validate email
	$scope.emailValidate = function(){
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
	};
	$scope.convert = function(str){
		var date = new Date(str),
		mnth = ("0" + (date.getMonth()+1)).slice(-2),
		day  = ("0" + date.getDate()).slice(-2);
		return [ day, mnth , date.getFullYear() ].join("/");
	};
	$scope.login = function(){

		$scope.loginFormSubmitted = true;
		$scope.loginStart = false;
		if($scope.user.email === undefined || $scope.user.email === ''){
            focus('uname');
            return false;
        } else if($scope.user.password === undefined || $scope.user.password === ''){
            focus('password');
            return false;
        }
        var opts1= {};
        $scope.loginStart = true;
		
        opts1.email = $scope.user.email;
        opts1.password = $scope.user.password;
        loginService.save(opts1, function(data){
			if(data.statusCode == 200 && data.message === 'ok'){
				$scope.loginStart = false;
				APP.currentUser = data.result;
				localStorage.setItem("loggedInUser", JSON.stringify(data.result));
				$rootScope.isLoggedIn = true;
				$uibModalInstance.dismiss('cancel');
				//angular.element(document.getElementById('headerController')).scope().cancel();
				$state.go('home',{},{ reload: true });
			} else if (data.statusCode == 422 && data.message.email === false && data.message.password === false){
				$scope.loginStart = false;
				$scope.userNotFound = true;
				$scope.msgShow = 'User not found';
				$timeout(function() {
					$scope.msgShow = '';
				}, 3000);
			} else if (data.statusCode == 422 && data.message.email === true && data.message.password === false){
				$scope.loginStart = false;
				$scope.userPassWrong = true;
				$scope.msgShow = 'Password is wrong';
				$timeout(function() {
					$scope.msgShow = '';
				}, 3000); 
			} else {
				$scope.loginStart = true;
			}
		}, function(error){
				console.log("error ", data);
		});
	};
	// Forgot Password
	$scope.forgotPassword = function(){
		$scope.showForgotPass = true;
		$scope.showLoginForm = false;
		$scope.showRegForm = false;
	};
	// function for send mail in  forgot password

	$scope.forgotPasswordSave = function(){
		$scope.forgotSubmitted = true;
		$scope.forgotmessage = '';
		if($scope.forgot.email === undefined || $scope.forgot.email === null){
			return false;
		}
		$scope.forgotLoader = true;
		var opts = {};
		opts.email = $scope.forgot.email;
		opts.url = APP.resetPasswordUrl;
		forgotPasswordService.save(opts, function(data){
			$scope.forgotLoader = false;
			if(data.statusCode === 200 && data.message === 'ok'){
				$scope.forgotmessage = 'Email send successfully on your email-id';
				$scope.forgot = {};
				$scope.forgotSubmitted = false;
				/*$timeout(function() {
					$scope.forgotmessage = '';
				}, 15000); */

			} else {
				$scope.forgotmessage = 'Email not registered';
				/*$timeout(function() {
					$scope.forgotmessage = '';
				}, 15000); */
			}
		}, function(error){
			console.log("error in forgot password");
		});
	};

	$scope.submitRegistration = function(){
		$scope.formSubmitted = true;
		$scope.sucessMessage = false;
		
		$scope.dob = '';
		if($scope.dt){
			$scope.dob = $scope.convert($scope.dt);
		}
		if($scope.user.name === undefined || $scope.user.name === ''){
            focus('uname');
            return false;
        } else if($scope.dob === undefined || $scope.dob === ''){
            focus('dob');
            return false;
        } else if($scope.user.email === undefined || $scope.user.email === ''){
            focus('email');
            return false;
        } else if($scope.user.password === undefined || $scope.user.password === ''){
            focus('password');
            return false;
        } else if ($scope.showErrEmail === true){
			focus('email');
            return false;
        }
        // var opts = { email :$scope.user.email ,password : $scope.user.password,
		//	dob : $scope.dob , name : $scope.user.name};
		$scope.signupStart = true;
        var opts = {};
        opts.email = $scope.user.email;
        opts.password = $scope.user.password;
        opts.dob = $scope.dob;
        opts.name = $scope.user.name;
       // opts.username = "preeti sachdeva";

      /*  signupService.save(opts, function(data){
			console.log("Successs jgd", data);
			$scope.login();
        });*/
        signupService.save(opts, function(data){
				if(data.statusCode == 200 && data.message === 'ok'){
					$scope.sucessMessage = true;
					$scope.signupStart = false;
					$scope.login();
				} else if(data.statusCode == 422 && data.message.email === false){
					$scope.signupStart = false;
					$scope.showErrEmail = true;
					$scope.errMsg = frontendSettings.userregistered;
				} else {
					$scope.signupStart = true;
				}
		}, function(error){
			console.log("error", error);
        });
	};
	//  Function for close modal
	$scope.closeModal = function () {
        $uibModalInstance.dismiss('cancel');
        angular.element('#fadein').removeClass('color-overlay');
    };
    // facebookLogin function
    $scope.facebookLogin = function(){
		window.location.href = APP.facebookLogin;
	};
	// twitter Login function
    $scope.twitterLogin = function(){
		window.location.href = APP.twitterLogin;
	};
}]);
app.directive('registerForm', function () {
	return {
		templateUrl: 'app/shared/register/registerView.html',
		restrict: 'E',
		controller: 'registerController'
	};
});
app.factory('registerService', function ($resource) {
	return  $resource(APP.endpoints.validateEmail);
});
app.factory('signupService', function ($resource) {
	return  $resource(APP.endpoints.signup);
});
app.factory('loginService', function ($resource) {
	return  $resource(APP.endpoints.login);
});
app.factory('profileService', function ($resource) {
	return  $resource(APP.endpoints.profile ,{}, {query: { method: "GET", isArray: false }});
});
app.factory('logoutService', function ($resource) {
	return  $resource(APP.endpoints.logout);
});
app.factory('isAuthenticated', function ($resource) {
	return  $resource(APP.endpoints.isAuthenticated ,{}, {query: { method: "GET", isArray: false }});
});
app.factory('forgotPasswordService', function($resource){
	return $resource(APP.endpoints.forgotPassword);
});

app.controller('ModalController', ['$scope', '$uibModalInstance',
    function ($scope, $uibModalInstance) {

        $scope.$on('closeModal', function () {
            $uibModalInstance.dismiss('cancel');
        });

        $scope.closeModal = function () {
           $uibModalInstance.dismiss('cancel');
        };
        $scope.closePostActivityModal = function () {
			$uibModalInstance.dismiss('cancel');
			angular.element('#fadein').removeClass('color-overlay');
        };
	}
]);

