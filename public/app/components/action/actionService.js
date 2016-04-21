/*app.factory('getActionUserService', function ($resource) {
	console.log("hiiiiii",APP.endpoints.actionSave);
   return  $resource(APP.endpoints.actionSave);
});*/
/*app.factory('getActionService', function ($resource) {
	return  $resource(APP.endpoints.actionSave);
});*/
app.factory('getActionService', function ($resource) {
   return  $resource(APP.endpoints.actionSave,{},{query: { method: "GET", isArray: false }});
});
app.factory('saveCompleteActionService',function($resource){
	return $resource(APP.endpoints.saveCompleteAction,{ id: '@id'}, {update: { method: "PUT"}});
});
