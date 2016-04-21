'use strict';
describe('E-LEARNING: actionController Controller test', function(){
    var ctrl, $scope, $httpBackend,state;
    var mock_result = {
    "statusCode": 200,
    "message": "ok",
    "result": [{"_id":1}],
    "error": false
    };
    var mock_result1 = {
    "statusCode": 200,
    "message": "ok",
    "result": {"id":12},
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
    //beforeEach(inject(function($injector, $httpBackend, $controller, $rootScope){
    beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_,$state){
       $httpBackend = _$httpBackend_;
       state = $state;

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
        ctrl = $controller('actionController', {
            $scope: $scope,
            state: $state
        });
    }));
    it('fucntion  getUserActions :: should have a getUserActions function', inject(function() {
        $httpBackend.when('GET', '/actions/saves').respond(mock_result);
        $scope.getUserActions();
        $httpBackend.flush();
    }));
     it('variables  test :: should have a equal value', inject(function() {
       expect($scope.showActionList).toEqual(false);
       expect($scope.loaderShowA).toEqual(true);
    }));
    it('fucntion  toggleCheckSaveAction :: should have a toggleCheckSaveAction function', inject(function() {
       $scope.toggleCheckSaveAction();
    }));
   /* it('fucntion  getUserActions :: should have a getUserActions function', inject(function() {
        $httpBackend.when('GET', '/actions/saves').respond(mock_result);
        $scope.getUserActions();
        $httpBackend.flush();
    }));*/
   /* it('fucntion  getUserActions :: should have a getUserActions function', function() {
        $httpBackend.when('PUT', '/actions/saves/12').respond(mock_result1);
        $scope.toggleCheckSaveAction(12);
        $httpBackend.flush();
       // $timeout.flush();
    });*/
});    