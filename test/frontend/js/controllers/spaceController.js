'use strict';
describe('E-LEARNING: ModalController Controller test', function(){
    var ctrl, $scope, $httpBackend , $timeout,state;
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));

    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector,$state, $rootScope,_$httpBackend_,_$timeout_,$controller){
        $httpBackend = _$httpBackend_;
        state = $state;
        $timeout = _$timeout_;
        $rootScope = $rootScope;
        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    	$uibModalInstance = jasmine.createSpyObj('$uibModalInstance',  ['dismiss']);

        //create contorller
        ctrl = $controller('myspaceController', {
            $scope: $scope,
            $uibModalInstance: $uibModalInstance,
            state : $state
        });
    }));
    
    it('variables  test :: should have a equall value', inject(function() {
       expect($scope.spaceloader).toEqual(true);
    }));
    it('fucntion  get activity in my space :: should have a activity in my space', inject(function() {
        $httpBackend.when('GET', '/activity/users/'+ APP.currentUser._id).respond({"statusCode":200,"message":"ok","result":[{}]});
        $httpBackend.flush();
    }));
    
    it('CallUpdatedSpaceMethod method :: should have a CallUpdatedSpaceMethod $on event', inject(function($rootScope) {
        $rootScope.$broadcast('CallUpdatedSpaceMethod');
    }));
    it('viewActivitySpace method :: should have a viewActivitySpace function', inject(function() {
        expect(angular.isFunction($scope.viewActivitySpace)).toBe(true);
    }));
    it('deleteMyActivity method :: should have a deleteMyActivity function', inject(function() {
        expect(angular.isFunction($scope.deleteMyActivity)).toBe(true);
    }));
    it('viewActivitySpace method :: should have a viewActivitySpace body', function() {
        $httpBackend.when('GET', '/activity/users/'+ APP.currentUser._id).respond({"statusCode":200,"message":"ok","result":[{}]});
        $scope.viewActivitySpace('56ssss98192d3f379fd13eabdd4');
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4').respond({"statusCode":200,"message":"ok","result":{"likes":[APP.currentUser._id]}});
        $httpBackend.when('GET', 'app/shared/activityDetail/viewSharedActivity.html').respond();
        $httpBackend.flush();
    });
    it('viewActivitySpace method :: should have a viewActivitySpace body', function() {
        $httpBackend.when('GET', '/activity/users/'+ APP.currentUser._id).respond({"statusCode":200,"message":"ok","result":[{}]});
        $scope.viewActivitySpace('56ssss98192d3f379fd13eabdd4');
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4').respond({"statusCode":200,"message":"ok","result":{"likes":['rr34344']}});
        $httpBackend.when('GET', 'app/shared/activityDetail/viewSharedActivity.html').respond();
        $httpBackend.flush();
    });
    it('deleteMyActivity method :: should have a deleteMyActivity body', inject(function() {
        $httpBackend.when('GET', '/activity/users/'+ APP.currentUser._id).respond({"statusCode":200,"message":"ok","result":[{}]});
        var e = jasmine.createSpyObj('e', [ 'stopPropagation' ]);
        $scope.deleteMyActivity(e,'56ssss98192d3f379fd13eabdd4','');
        $httpBackend.when('DELETE', '/activity/56ssss98192d3f379fd13eabdd4').respond({"statusCode":200,"message":"ok"});
        $httpBackend.flush();
    }));
    it('deleteMyActivity method :: should have a deleteMyActivity body', inject(function() {
        $httpBackend.when('GET', '/activity/users/'+ APP.currentUser._id).respond({"statusCode":200,"message":"ok","result":[{}]});
        var e = jasmine.createSpyObj('e', [ 'stopPropagation' ]);
        $scope.deleteMyActivity(e,'56ssss98192d3f379fd13eabdd4','pic.com');
        $httpBackend.when('DELETE', '/activity/56ssss98192d3f379fd13eabdd4').respond({"statusCode":200,"message":"ok"});
        $httpBackend.flush();
    }));
    
});