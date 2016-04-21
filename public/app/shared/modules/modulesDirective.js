app.directive('modulesList', function () {
	return {
		templateUrl: 'app/shared/modules/modulesView.html',
		restrict: 'E',
		controller: 'modulesController'
	};
});