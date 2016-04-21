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