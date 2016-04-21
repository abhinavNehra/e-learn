app.factory('resetPasswordService', function($resource){
	return $resource(APP.endpoints.resetPassword);
});
