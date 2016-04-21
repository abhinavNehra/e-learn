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