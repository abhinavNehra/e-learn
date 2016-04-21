'use strict';
describe('E-LEARNING: modulesController Controller test', function(){
    var ctrl, $scope, $httpBackend, state , $timeout;
    var moduleRes = { "statusCode": 200, "message": "ok", "result": [{
            "description": "sfgsdfgsd",
            "name": "Nitesh",
            "_id": "56b5e059b7d52a8145c13824",
            "__v": 0,
            "deleted": false
        }] };
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
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, _$httpBackend_, $controller, $rootScope, $uibModal,_$timeout_){
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
        state = jasmine.createSpyObj('$state', ['go']);

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
         
    
        //create contorller
        ctrl = $controller('modulesController', {
            $scope: $scope,
            state: state,
            $uibModal : $uibModal,
            $rootscope : $rootScope
        });
    }));
    it('variables  test :: should have a equal value', inject(function() {
        expect($scope.lesson).toEqual('');
        expect($scope.showActivity).toEqual(false);
        expect($scope.actionlist).toEqual(false);
    }));
    it('showAction method :: should have a showAction function', inject(function() {
        expect(angular.isFunction($scope.showAction)).toBe(true);
    }));
     it('CallParamsCloseMethod event :: should have a CallParamsCloseMethod $on event', inject(function($rootScope) {
        $rootScope.$broadcast('CallParamsCloseMethod');
    }));
    it('createActivityItem method :: should have a createActivity function', inject(function() {
        expect(angular.isFunction($scope.createActivityItem)).toBe(true);
    }));
    it('getlessonDetail method :: should have a getlessonDetail function', inject(function() {
        expect(angular.isFunction($scope.getlessonDetail)).toBe(true);
    }));
     it('expandLesson method :: should have a expandLesson function', inject(function() {
        expect(angular.isFunction($scope.expandLesson)).toBe(true);
    }));
    it('variable  module :: call modules api', inject(function() {
        $httpBackend.when('GET', '/modules').respond(moduleRes);
        expect($scope.modules).toEqual([]);
        $httpBackend.flush();
    }));
    it('submitSave method Body:: should have a getlessonDetail function', inject(function() {
        $scope.expandLesson('56b5e075b7d52a8145c13825');
        expect($scope.showLesson).toBe(false);
    }));
 
    it('expandLesson method Body:: should have a expandLesson function', function() {
        var e = jasmine.createSpyObj('e', [ 'stopPropagation' ]);
         $scope.getlessonDetail(e ,'564444444fd13eabdd4', true);
        $httpBackend.when('GET', '/modules').respond({});
        $httpBackend.when('GET', '/lessons/564444444fd13eabdd4').respond({"statusCode":200,"result":[]});
        $httpBackend.when('GET', '/activity/lessons/564444444fd13eabdd4').respond({"statusCode":200,"result":[]});

        $httpBackend.flush();
    });
    it('expandLesson method Body:: should have a expandLesson function', function() {
        var e = jasmine.createSpyObj('e', [ 'stopPropagation' ]);
        $scope.getlessonDetail(e ,'56b98192d3f379fd13eabdd4', true);
        $httpBackend.when('GET', '/modules').respond({});
        $httpBackend.when('GET', '/lessons/56b98192d3f379fd13eabdd4').respond({"statusCode":200,"result":[]});
        $httpBackend.when('GET', '/activity/lessons/56b98192d3f379fd13eabdd4').respond({"statusCode":200,"result":[{}]});
        $httpBackend.flush();
    });
    it('expandLesson method Body:: should have a expandLesson function', inject(function() {
        var e = jasmine.createSpyObj('e', [ 'stopPropagation' ]);
        $scope.getlessonDetail(e ,'4444', false);
        expect($scope.actionlist).toBe(false);
    }));
   

    it('createActivity method :: should have a createActivity function', inject(function() {
        $scope.createActivityItem();
    }));
    it('createActivityItem method :: should have a createActivityItem with rootscope isLoggedIn false function', inject(function($rootScope) {
        $scope.activity.description = '';
        $scope.createActivityItem();
    }));
    it('createActivityItem method :: should have a createActivityItem with rootscope isLoggedIn false function', inject(function($rootScope) {
        $rootScope.isLoggedIn =true;
        $scope.activity.description = undefined;
        $scope.createActivityItem();
    }));
     it('createActivity method :: should have a createActivity with rootscope isLoggedIn false function', inject(function($rootScope) {
        $rootScope.isLoggedIn = false;
        $scope.createActivityItem();
    }));
     it('upload method :: should have a upload with rootscope isLoggedIn false function', inject(function($rootScope) {
       // $rootScope.isLoggedIn = false;
       //closeModal $scope.upload();
    }));
    it('upload method :: should have a upload with rootscope isLoggedIn false function', inject(function($rootScope) {
        $rootScope.isLoggedIn = false;
        $scope.upload();
    }));
    it('finishLesson method :: should have a finishLesson with rootscope isLoggedIn false function', inject(function($rootScope) {
        $rootScope.isLoggedIn = false;
        $scope.finishLesson();
    }));
    it('showAction method :: should have a showAction with rootscope isLoggedIn false function', inject(function($rootScope) {
        $rootScope.isLoggedIn = false;
        $scope.showAction();
    }));
    it('closeLessonDetail method :: should have a closeLessonDetail function', inject(function() {
        $scope.closeLessonDetail();
    }));
    it('closeActionDetail method :: should have a closeActionDetail function', inject(function() {
        $scope.closeActionDetail();
    }));
     it('hidePreview method :: should have a hidePreview function', inject(function() {
        $scope.hidePreview();
    }));
    it('switchLessonDescription method :: should have a switchLessonDescription function', inject(function() {
        $scope.switchLessonDescription();
    }));
    it('showAction method :: should have a showAction body', function() {
        $scope.showAction('56b98192d3f379fd13eabdd4');
        $httpBackend.when('GET', '/modules').respond({});
        $httpBackend.when('GET', '/lessons/56b98192d3f379fd13eabdd4/actions').respond({"statusCode": 200,"message":"ok","result":[{}]});
        $httpBackend.flush();
    });
    it('showAction method :: should have a showAction body', function() {
        $scope.showAction('56b98192d3f379fd13eabdd4');
        $httpBackend.when('GET', '/modules').respond({});
        $httpBackend.when('GET', '/lessons/56b98192d3f379fd13eabdd4/actions').respond({"statusCode": 200,"message":"ok","result":[]});
        $httpBackend.flush();
    });
    it('closeLessonModal method :: should have a closeLessonModal function', inject(function() {
        $scope.closeLessonModal();
    }));
    it('toggleCheckAction method :: should have a toggleCheckAction function', inject(function() {
        $scope.toggleCheckAction();
    }));
    it('saveAction method :: should have a saveAction body', inject(function() {
        $scope.saveAction();
    }));
    it('saveAction method :: should have a saveAction body', inject(function() {
        $scope.selectAction = [{"id":'56b98192d3f379fd13eab345',"moduleId":"56b45192d3f379fd13eab345"}];
        $scope.saveAction('56b98192d3f379fd13eab245','44b98192d3f379fd13eab345');
        $httpBackend.when('GET', '/modules').respond({});
        $httpBackend.when('PUT', '/lessons/44b98192d3f379fd13eab345/actions/56b98192d3f379fd13eab345/save').respond({"statusCode":200,"message":"ok"});
        $httpBackend.when('GET', '/lessons/44b98192d3f379fd13eab345/actions').respond({"statusCode":200,"message":"ok"});
        $httpBackend.flush();
        $timeout.flush();
}));
    it('saveUserActions method :: should have a saveUserActions body', inject(function() {
        $scope.saveUserActions();
    }));
     it('saveUserActions method :: should have a saveUserActions function', inject(function() {
        expect(angular.isFunction($scope.saveUserActions)).toBe(true);
    }));
    it('finishLesson method :: should have a finishLesson body', function() {
        $httpBackend.when('GET', '/modules').respond({});
        $scope.finishLesson(111111, '4444444');
        $httpBackend.when('POST', '/completedLessons').respond({"statusCode":200,"message":"ok"});
        $httpBackend.when('GET', '/modules/4444444/lessons').respond({"message":"ok" , "result":[{}]});
        $httpBackend.when('GET', '/activity/modules/4444444').respond({"message":"ok" , "result":[{}]});
        $httpBackend.flush();
    });
     it('finishLesson method :: should have a finishLesson body', function() {
       // APP.currentUser._id = '12dddd';
         $httpBackend.when('GET', '/modules').respond({});

        $scope.finishLesson(111111, '4444444');
        $httpBackend.when('POST', '/completedLessons').respond({"statusCode":200,"message":"ok"});
        $httpBackend.when('GET', '/modules/4444444/lessons').respond({"message":"ok" , "result":[{}]});
        $httpBackend.when('GET', '/activity/modules/4444444').respond({"message":"ok" , "result":[]});
        $httpBackend.flush();
    });
    it('finishLesson method :: should have a finishLesson function', inject(function() {
        expect(angular.isFunction($scope.finishLesson)).toBe(true);
    }));
  
});        