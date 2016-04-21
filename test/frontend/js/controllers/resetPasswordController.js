'use strict';
describe('E-LEARNING: resetPasswordController Controller test', function(){
    var ctrl, $scope, $httpBackend , $timeout, state;
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));

    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, _$httpBackend_,$state, $controller, $rootScope, _$timeout_){
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        state = $state;
        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    	$uibModalInstance = jasmine.createSpyObj('$uibModalInstance',  ['dismiss']);

        //create contorller
        ctrl = $controller('resetPasswordController', {
            $scope: $scope,
            $uibModalInstance: $uibModalInstance,
            $timeout : $timeout,
            state : $state
        });
    }));
    it('variables  test :: should have a equal value', inject(function() {
       expect($scope.submittedResetForm).toEqual(false);
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
       $scope.submitResetPassword();
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
       $scope.password.newpass ='1234567';
       $scope.submitResetPassword();
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
        $scope.password.newpass ='1234567';
        $scope.password.conpass ='234567';
       $scope.submitResetPassword();
       $timeout.flush();
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
        $scope.password.newpass ='1234567';
        $scope.password.conpass ='1234567';
        $scope.tokenId = '12dffgrrr';
        $scope.submitResetPassword();
        $httpBackend.when('POST', '/auth/newPassword').respond({"statusCode":200 ,"message":"ok"});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
        $scope.password.newpass ='1234567';
        $scope.password.conpass ='1234567';
        $scope.tokenId = '122sffgrrr';
        $scope.submitResetPassword();
        $httpBackend.when('POST', '/auth/newPassword').respond({"statusCode":422});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
        $scope.password.newpass ='1234567';
        $scope.password.conpass ='1234567';
        $scope.tokenId = '122sffgrrr';
        $scope.submitResetPassword();
        $httpBackend.when('POST', '/auth/newPassword').respond({"statusCode":401,"message":"unauthorized"});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('submitResetPassword method body :: should have a submitResetPassword function', inject(function() {
        $scope.password.newpass ='1234567';
        $scope.password.conpass ='1234567';
        $scope.tokenId = '122sffgrrr';
        $scope.submitResetPassword();
        $httpBackend.when('POST', '/auth/newPassword').respond({"statusCode":522});
        $httpBackend.flush();
        $timeout.flush();
    }));
    
});    