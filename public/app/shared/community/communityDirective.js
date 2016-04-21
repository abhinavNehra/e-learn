app.directive('community', function () {
	return {
		templateUrl: 'app/shared/community/communityView.html',
		restrict: 'E',
		controller: 'communityController'
	};
});
