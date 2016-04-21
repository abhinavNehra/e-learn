'use strict';
describe('E-LEARNING: registerController Controller test', function(){
    var ctrl, $scope, $httpBackend , state, $timeout;
    var loginResult = {
    "statusCode": 200,
    "message": "ok",
    "result": {
        "__v": 0,
        "_id": "56dff82e37bca6b31a4168be",
        "createdAt": "2016-03-09T10:17:19.071Z",
        "updatedAt": "2016-03-09T10:17:19.071Z",
        "local": {
            "dob": "01/03/2016",
            "email": "preeti.sachdeva@daffodilsw.com",
            "name": "Preeti Sachdeva",
            "password": "$2a$08$wJfg24K9Q4b6x5xfS2.dnup1Pr5M.u21eLbMWdt3xu0jpgU5HR71a",
            "deleted": false,
            "rev": 0,
            "ambassdor": false,
            "lastlogin_at": "2016-03-09T10:17:18.972Z"
        }
    },
    "error": false
}; 
 var loginResult1 = {
    "statusCode": 422,
    "message": {
        "message": "No user found",
        "email": false,
        "password": false
    },
    "result": {},
    "error": true
};
var loginResult2 ={
    "statusCode": 422,
    "message": {
        "message": "Oops! Wrong password",
        "email": true,
        "password": false
    },
    "result": {},
    "error": true
}; 
var signupdatares = {"statusCode": 200,"message": "ok","result": {}, "error": false}
var signupdatares1 = {"statusCode": 422,"message": { "email": false}, "error": true}
var signupdatares2 = {"statusCode": 522,"message": { "email": false}, "error": true}
     /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
   // beforeEach(inject(function($injector, $httpBackend, $controller, $rootScope){
     beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_, _$timeout_){
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        state = jasmine.createSpyObj('$state', ['go']);
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance',  ['dismiss']);

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();

    
        //create contorller
        ctrl = $controller('registerController', {
            $scope: $scope,
            $state: state,
            $uibModalInstance: $uibModalInstance,
            $timeout :$timeout
        });
    }));
    it('variables  test :: should have a equall value', inject(function() {
       expect($scope.showLoginForm).toEqual(true);
    }));
  
    it('showLogin method :: should have a showLogin function', inject(function() {
        expect(angular.isFunction($scope.showLogin)).toBe(true);
    }));
    it('submitRegistration method :: should have a submitRegistration function', inject(function() {
        expect(angular.isFunction($scope.submitRegistration)).toBe(true);
    }));
    it('forgotPassword method :: should have a forgotPassword function', inject(function() {
        expect(angular.isFunction($scope.forgotPassword)).toBe(true);
    }));
    it('forgotPasswordSave method :: should have a forgotPasswordSave function', inject(function() {
        expect(angular.isFunction($scope.forgotPasswordSave)).toBe(true);
    }));
    it('disabled method :: should have a disabled function', inject(function() {
        expect(angular.isFunction($scope.disabled)).toBe(true);
    }));
    it('convert method :: should have a convert function', inject(function() {
        expect(angular.isFunction($scope.convert)).toBe(true);
    }));
    it('forgotPassword method body :: should have a forgotPassword function', inject(function() {
        $scope.forgotPassword();
    }));
    it('closeModal method :: should have a closeModal body', inject(function() {
        $scope.closeModal();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
    }));
    it('forgotPasswordSave method body :: should have a forgotPasswordSave function', inject(function() {
        $scope.forgot.email = undefined;
        $scope.forgotPasswordSave();
    }));
     it('forgotPasswordSave method body :: should have a forgotPasswordSave function', inject(function() {
        $scope.forgot.email = null;
        $scope.forgotPasswordSave();
    }));
    it('forgotPasswordSave method body :: should have a forgotPasswordSave function', inject(function() {
        $scope.forgot.email = 'preeti.sachdeva@daffodilsw.com';
        $scope.forgotPasswordSave();
        $httpBackend.when('POST', '/auth/resetPassword').respond({"statusCode":422,"message":{"message":"Given email is not register"},"result":{},"error":true});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('forgotPasswordSave method body :: should have a forgotPasswordSave function', inject(function() {
        $scope.forgot.email = 'preeti.sachdeva@daffodilsw.com';
        $scope.forgotPasswordSave();
        $httpBackend.when('POST', '/auth/resetPassword').respond({"statusCode":200,"message":"ok","result":{"message":"link send to your email"},"error":false});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('convert method body :: should have a convert function', inject(function() {
        $scope.convert();
    }));
    it('open1 method :: should have a open1 function', inject(function() {
        expect(angular.isFunction($scope.open1)).toBe(true);
    }));
    it('showRegister method :: should have a showRegister function', inject(function(){
        expect(angular.isFunction($scope.showRegister)).toBe(true);
    }));
    it('login method :: should have a login function', inject(function(){
        expect(angular.isFunction($scope.login)).toBe(true);
    }));
    it('convert method :: should have a convert function', inject(function(){
      //  expect(angular.isFunction($scope.convert)).toBe(true);
    }));
    it('login method body :: login have a body', inject(function(){
        $scope.user.email = 'test@gmail.com';
        $scope.user.password = '';
       $scope.login();
    }));
    it('login method body :: login have a body', inject(function(){
        $scope.user.email = '';
         $scope.user.password = '1234567';
         $scope.login();
    }));
    it('login method body :: login have a body', inject(function() {
        $scope.user.email = 'preeti.sachdeva@daffodilsw.com';
        $scope.user.password = '1234567';
        $scope.login();
        var signupdata = {"email":"preeati.sachdeva@daffodilsw.com","password":"1234567"};
        $httpBackend.when('POST', '/login').respond(loginResult);
        $httpBackend.flush();
    }));
    it('login method body :: login have a body', inject(function($timeout) {
        $scope.user.email = 'preetdi.sachdeva@daffodilsw.com';
        $scope.user.password = '1234567';
        $scope.login();
        var signupdata = {"email":"preetdi.sachdeva@daffodilsw.com","password":"1234567"};
        $httpBackend.when('POST', '/login').respond(loginResult1);
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('login method body :: login have a body', inject(function($timeout) {
        $scope.user.email = 'preetdi.sachdeva@daffodilsw.com';
        $scope.user.password = '1234567';
        $scope.login();
        var signupdata = {"email":"preeti.sachdeva@daffodilsw.com","password":"12234567"};
        $httpBackend.when('POST', '/login').respond(loginResult2);
        $httpBackend.flush();
        $timeout.flush();
    }));
     it('login method body :: login have a body', inject(function($timeout) {
        $scope.user.email = 'preetdi.sachdeva@daffodilsw.com';
        $scope.user.password = '1234567';
        $scope.login();
        var signupdata = {"email":"preeti.sachdeva@daffodilsw.com","password":"12234567"};
        $httpBackend.when('POST', '/login').respond({"statusCode": 522});
        $httpBackend.flush();
        $timeout.flush();
    }));

   

    /*it('submitRegistration method body :: submitRegistration have a body', inject(function(){
       $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.submitRegistration();
    }));*/
     it('submitRegistration method body :: submitRegistration have a body', inject(function(){
        $scope.user.name = undefined;
        $scope.submitRegistration();
    }));
    it('submitRegistration method body :: submitRegistration have a body', inject(function(){
        $scope.user.name = 'preeti';
        $scope.dt = undefined;
        $scope.dob = '';
        $scope.submitRegistration();
    }));
     it('submitRegistration method body :: submitRegistration have a body', inject(function(){
        $scope.user.name = 'preeti';
        $scope.dt = undefined;
        $scope.dob = undefined;
        $scope.submitRegistration();
    }));
    it('submitRegistration method body :: submitRegistration have a body', inject(function(){
        $scope.user.name = 'preeti';
        $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.user.email = undefined;
        $scope.submitRegistration();
    }));
    it('submitRegistration method body :: submitRegistration have a body', inject(function(){
        $scope.user.name = 'preeti';
        $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.user.email = "preeti@gmail.com";
        $scope.user.password  = undefined;
        $scope.submitRegistration();
    }));
     it('submitRegistration method body :: submitRegistration have a body', inject(function(){
        $scope.user.name = 'preeti';
        $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.user.email = "preeti@gmail.com";
        $scope.user.password  = 1234567;
        $scope.showErrEmail = true;
        $scope.submitRegistration();
    }));
    it('submitRegistration method body :: submitRegistration have a body', function(){
        $scope.user ={};
        $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.showErrEmail = false;
        $scope.user.email = "gunjan.jain@daffodilsw.com"
        $scope.user.password = "1234567";
        $scope.user.name = "preeti sachdeva";
        $scope.submitRegistration();
        $httpBackend.when('POST','/signup').respond(signupdatares);
         $httpBackend.when('POST', '/login').respond(loginResult2);
        $httpBackend.flush();
    });
    it('submitRegistration method body :: submitRegistration have a body', function(){
        $scope.user ={};
        $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.showErrEmail = false;
        $scope.user.email = "gunjan.jain@daffodilsw.com"
        $scope.user.password = "1234567";
        $scope.user.name = "preeti sachdeva";
        $scope.submitRegistration();
        $httpBackend.when('POST','/signup').respond(signupdatares1);
        $httpBackend.flush();
    });
    it('submitRegistration method body :: submitRegistration have a body', function(){
        $scope.user ={};
        $scope.dt = "Thu Mar 03 2016 00:00:00 GMT+0530 (IST)";
        $scope.showErrEmail = false;
        $scope.user.email = "gunjan1.jain@daffodilsw.com"
        $scope.user.password = "1234567";
        $scope.user.name = "preeti sachdeva";
        $scope.submitRegistration();
        $httpBackend.when('POST','/signup').respond(signupdatares2);
        $httpBackend.flush();
    });
    it('showRegister method body :: showRegister habe a body', inject(function(){
        $scope.showRegister();
    }));
     it('emailValidate method :: should have a emailValidate function', inject(function(){
        expect(angular.isFunction($scope.emailValidate)).toBe(true);
    }));

    it('emailValidate method body :: emailValidate habe a body', inject(function(){
        $scope.user.email = 'preeti.sachdeva@daffodilsw.com';
        $scope.emailValidate();
        $httpBackend.when('POST', '/auth/validateEmail').respond({});
        $httpBackend.flush();
    }));
    it('emailValidate method body :: emailValidate habe a body', inject(function(){
        $scope.user.email = undefined;
        $scope.emailValidate();
    }));
    it('open1 method body :: should have a open1 function', inject(function() {
       $scope.open1();
    }));
    it('showLogin method body :: should have a showLogin function', inject(function() {
       $scope.showLogin();
    }));
     it('disabled method body :: should have a disabled function', inject(function() {
     //  $scope.disabled('Thu Feb 18 2016 13:09:28 GMT+0530 (IST)', 'day');
    }));

});    