app.factory('getCommunityService', function ($resource) {
	return  $resource(APP.endpoints.createActivity,{},{query: { method: "GET", isArray: false }});
});
app.factory('getViewActivityService', function ($resource) {
	return  $resource(APP.endpoints.viewActivity,{},{query: { method: "GET", isArray: false }});
});
app.factory('likeActivityService', function($resource){
	return $resource(APP.endpoints.likeActivity, { id: '@id'}, {update: { method: "PUT"}});
});
app.factory('unlikeActivityService', function($resource){
	return $resource(APP.endpoints.unlikeActivity, { id: '@id'}, {update: { method: "PUT"}});
});
app.factory('removeActivityService', function ($resource) {
	return  $resource(APP.endpoints.deleteActivity,{id: '@id'},{remove: { method: "DELETE"}});
});
app.factory('editActivityService', function ($resource) {
	return  $resource(APP.endpoints.editActivity,{id: '@id'},{query: { method: "PUT"}});
});
app.factory('viewLikeUserService', function ($resource) {
	return  $resource(APP.endpoints.getListLike,{}, {query: { method: "GET",  isArray: false }});
});