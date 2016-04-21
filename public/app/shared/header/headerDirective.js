app.directive('header', function () {
	return {
		templateUrl: 'app/shared/header/headerView.html',
		restrict: 'E',
		controller: 'headerController'
	};
});