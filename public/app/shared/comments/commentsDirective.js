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
