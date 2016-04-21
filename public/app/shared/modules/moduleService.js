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
