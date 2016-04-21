app.factory('registerService', function ($resource) {
	return  $resource(APP.endpoints.validateEmail);
});
app.factory('signupService', function ($resource) {
	return  $resource(APP.endpoints.signup);
});
app.factory('loginService', function ($resource) {
	return  $resource(APP.endpoints.login);
});
app.factory('profileService', function ($resource) {
	return  $resource(APP.endpoints.profile ,{}, {query: { method: "GET", isArray: false }});
});
app.factory('logoutService', function ($resource) {
	return  $resource(APP.endpoints.logout);
});
app.factory('isAuthenticated', function ($resource) {
	return  $resource(APP.endpoints.isAuthenticated ,{}, {query: { method: "GET", isArray: false }});
});
app.factory('forgotPasswordService', function($resource){
	return $resource(APP.endpoints.forgotPassword);
});
