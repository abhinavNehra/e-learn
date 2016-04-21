app.directive('mySpace', function () {
	return {
		templateUrl: 'app/shared/myspace/myspaceView.html',
		restrict: 'E',
		controller: 'myspaceController'
	};
});