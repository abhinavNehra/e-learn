app.factory('getspaceService', function ($resource) {
	return  $resource(APP.endpoints.mySpace,{id: '@id'},{query: { method: "GET", isArray: false }});
});