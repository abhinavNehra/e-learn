var app = angular.module('eLearning', ['ui.router','ngMessages','ngAnimate','ui.bootstrap','ngResource', 'file-model','infinite-scroll']);
app.controller("AppController", ['$scope', '$rootScope','logoutService','$state','getStatistics', 'isAuthenticated','profileService','getNotificationService',function($scope, $rootScope, logoutService, $state, getStatistics, isAuthenticated, profileService, getNotificationService) {
	$scope.bodyClasses = 'default';
	$scope.getTotalNotification = 0;
	$rootScope.isLoggedIn = false;
	$scope.showTotalNotification = false;
	$rootScope.showEditProfile = false;
	if( !localStorage.getItem('loggedInUser')) {
		$rootScope.isLoggedIn = false;
		APP.currentUser = {};
	} else {
		$rootScope.isLoggedIn = true;
		APP.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
	};
	$scope.isAuthenticated = function(){
		isAuthenticated.query(function(data){
			if(data.statusCode === 200 && data.error === false && data.message ==="ok"){
				profileService.query(function(data){
					localStorage.setItem("loggedInUser", JSON.stringify(data.result));
					$rootScope.isLoggedIn = true;
					APP.currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
					if(APP.currentUser.hasOwnProperty("local") === true ){
						if(APP.currentUser.local.hasOwnProperty("token") === true){
							if(APP.currentUser.local.token !== '' && APP.currentUser.local.token !== null && APP.currentUser.local.token !== undefined){
								$rootScope.showEditProfile = true;
							}
						}
					}
					$state.go('home');
				});
			}else{
				APP.currentUser = {};
				localStorage.removeItem('loggedInUser');
				$rootScope.isLoggedIn = false;
			}
		}, function(error){
		
		});	
	};
	$scope.isAuthenticated();
	$scope.logout = function(){
		logoutService.query(function(){
			APP.currentUser = {};
			localStorage.removeItem('loggedInUser');
			$rootScope.isLoggedIn = false;
			$rootScope.showEditProfile = false;
			$state.go('home',{},{ reload: true });
		}, function(error){
		
		});	
	};
	
	// get Statistics
	$rootScope.getStatistics = function(){
		getStatistics.query(function(data){
			if(data.statusCode == 200 && data.message === 'ok'){
				$scope.statistics = data.result.statistics;
			} else {

			}
		}, function(error){
		});
	};
	$rootScope.$on("callTotalNotification", function(){
    	$rootScope.getAllNotification(APP.currentUser._id);
    });
	$rootScope.getAllNotification = function(id){
		$scope.getTotalNotification = 0;
		$scope.showTotalNotification = false;
		if(id !== ''){
			getNotificationService.query({id :id}, function(data){
				if(data.statusCode === 200 && data.message === "ok"){
					$scope.getTotalNotification = data.result.newNoticationCount;
					if(data.result.totalCount > 0){
						$scope.showTotalNotification = true;
					};
				}  else {
					$scope.getTotalNotification = 0;
				}
			},function(error){
				//console.log("error", error);
			});
		};
	};

	
	$rootScope.getStatistics();
	//$rootScope.getAllNotification();

}]);
app.run(function($rootScope,$state){
	
	$rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
	  $rootScope.containerClass = toState.containerClass;
	  console.log("state change", APP.currentUser);
	  $rootScope.getStatistics();
	  if(!Object.keys(APP.currentUser).length){
		if(toState.name !== "reset" && toState.name !== "/"){
	  		$state.go('home');
	  	}
	    }else{
	    	$rootScope.getAllNotification( APP.currentUser._id);
	  	if(toState.name === "reset" || toState.name === "/")
	  		$state.go('home');
		}
	});
});
/*app.run(function($rootScope){
  $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
	  $rootScope.containerClass = toState.containerClass;
	});
});*/