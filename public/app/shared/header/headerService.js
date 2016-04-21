app.factory('getStatistics', function ($resource) {
	return  $resource(APP.endpoints.statistics,{}, {query :{method : "GET", isArray :false}});
});

app.factory('getNotificationService', function ($resource) {
	return  $resource(APP.endpoints.getNotification,{}, {query :{method : "GET", isArray :false}});
});
app.factory('viewAllNotificationService', function ($resource) {
	return  $resource(APP.endpoints.viewAllNotification,{ id: '@id'}, {update: { method: "PUT"}});
});
app.factory('viewOneNotificationService', function ($resource) {
	return  $resource(APP.endpoints.viewOneNotification,{ id: '@id',nid : '@nid'}, {update: { method: "PUT"}});
});