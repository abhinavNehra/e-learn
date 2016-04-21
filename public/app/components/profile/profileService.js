app.factory('changeNameService', function ($resource) {
   return  $resource(APP.endpoints.changeUserName,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changeEmailService', function ($resource) {
   return  $resource(APP.endpoints.changeUserEmail,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changePasswordService', function ($resource) {
   return  $resource(APP.endpoints.changeUserPass,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changeUserDobService', function ($resource) {
   return  $resource(APP.endpoints.changeUserDob,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('changeUserImageService', function ($resource) {
   return  $resource(APP.endpoints.changeUserImage,{ id: '@id'},{update: { method: "PUT"}});
});
app.factory('deleteAccountService', function ($resource) {
   return  $resource(APP.endpoints.deleteAccount,{ id: '@id'},{update: { method: "PUT"}});
});
