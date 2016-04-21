app.factory('postCommentService', function ($resource) {
	return  $resource(APP.endpoints.postComment);
});
app.factory('postListCommentService', function ($resource) {
	return  $resource(APP.endpoints.postComment, {},{query: { method: "GET", isArray: false }});
});
app.factory('deleteCommentService', function ($resource) {
	return  $resource(APP.endpoints.updateComment, {id : '@id' ,commentId : '@commentId'},{ delete: { method: "DELETE"}});
});
app.factory('editCommentService', function ($resource) {
	return  $resource(APP.endpoints.updateComment, {id : '@id' ,commentId : '@commentId'},{ update: { method: "PUT"}});
});