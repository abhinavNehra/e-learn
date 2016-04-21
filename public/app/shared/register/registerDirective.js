app.directive('registerForm', function () {
	return {
		templateUrl: 'app/shared/register/registerView.html',
		restrict: 'E',
		controller: 'registerController'
	};
});