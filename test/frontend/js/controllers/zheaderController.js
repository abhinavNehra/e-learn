'use strict';
describe('E-LEARNING: headerController Controller test', function(){
    var ctrl, $scope, $httpBackend;
    var noti_result = {"statusCode":200,"message":"ok","result":[{}],"error":false};
    var noti_result_fail = {"statusCode" : 201}
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, _$httpBackend_, $controller, $rootScope,$uibModal){
        $httpBackend = _$httpBackend_;

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
        ctrl = $controller('headerController', {
            $scope: $scope,
            $uibModal : $uibModal
        });
    }));
   // $scope.bodyClasses = 'default';
    it('variables  test :: should have a equall value', inject(function() {
       expect($scope.animationsEnabled).toEqual(true);
    }));
    it('showRegisterForm method :: should have a showRegisterForm function', inject(function() {
        expect(angular.isFunction($scope.showRegisterForm)).toBe(true);
    }));
    it('showRegisterForm method body :: should have a showRegisterForm function', inject(function() {
        $scope.showRegisterForm();
        expect($scope.showRegForm).toEqual(true);
    }));
    it('menuAccount method :: should have a menuAccount function', inject(function() {
        expect(angular.isFunction($scope.menuAccount)).toBe(true);
    }));
    it('seenAllMessage method :: should have a seenAllMessage function', inject(function() {
        expect(angular.isFunction($scope.seenAllMessage)).toBe(true);
    }));
     it('viewLikeActivity method :: should have a viewLikeActivity function', inject(function() {
        expect(angular.isFunction($scope.viewLikeActivity)).toBe(true);
    }));
    it('seenAllMessage method :: should have a seenAllMessage function', inject(function() {
        $scope.getTotalNotification  = 3;
        $scope.seenAllMessage();
        
        $httpBackend.when('PUT', 'users/56dff82e37bca6b31a4168be/notifications/unseen').respond({"statusCode":200,"message":"ok"});
    $httpBackend.flush();
    }));
    it('getAllNotificationShow method :: should have a getAllNotificationShow function', inject(function() {
        expect(angular.isFunction($scope.getAllNotificationShow)).toBe(true);
    }));
    it('getAllNotificationShow method :: should have a removeNotification function', inject(function() {
        expect(angular.isFunction($scope.removeNotification)).toBe(true);
    }));
    it('getAllNotificationShow method :: should have a removeNotification function', inject(function() {
       $scope.removeNotification();
    }));
    it('getAllNotificationShow method :: should have a getAllNotificationShow body', inject(function() {
        $scope.getNotificationShow  = true;
        $scope.getAllNotificationShow();
        $httpBackend.when('GET', '/users/56dff82e37bca6b31a4168be/notifications?limit=5&skip=0').respond(noti_result);
        $httpBackend.flush();
    }));
    it('getAllNotificationShow method :: should have a getAllNotificationShow body', inject(function() {
        $scope.getAllNotificationShow();
       $httpBackend.when('GET', '/users/56dff82e37bca6b31a4168be/notifications?limit=5&skip=0').respond(noti_result);
        $httpBackend.flush();
    }));
     it('getAllNotificationShow method :: should have a getAllNotificationShow body', inject(function() {
        $scope.getAllNotificationShow();
       $httpBackend.when('GET', '/users/56dff82e37bca6b31a4168be/notifications?limit=5&skip=0').respond(noti_result_fail);
        $httpBackend.flush();
    }));
    it('menuAccount method :: should have a cancel function', inject(function() {
        expect(angular.isFunction($scope.cancel)).toBe(true);
    }));
    it('emit event :: should have a callHeaderController $on event', inject(function($rootScope) {
        $rootScope.$emit('callHeaderController');
    }));
    it('emit event :: should have a ShowModalLogin $on event', inject(function($rootScope) {
        $scope.$emit('ShowModalLogin');
    }));
   /* it('menuAccount method :: should have a cancel function body', function() {
        $scope.cancel();
        expect($uibModal.dismiss).toHaveBeenCalled();
    });*/
    it('menuAccount method body :: should have a menuAccount function', inject(function() {
        $scope.menuAccount();
        expect($scope.showDropMenu).toEqual(true);
    }));

});    