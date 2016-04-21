'use strict';
describe('E-LEARNING: homeController Controller test', function(){
    var ctrl, $scope, $httpBackend ,state;
    var comm = {"statusCode":200,"message":"ok","result":[{"createdAt":"2016-03-23T06:40:02.496Z"}]};
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, $state, _$httpBackend_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;
        state = $state;

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
        ctrl = $controller('homeController', {
            $scope: $scope,
            state :$state
        });
    }));
    it('variables  test :: should have a equal value', inject(function() {
        expect($scope.oneAtATime).toEqual(true);
        expect($scope.showSpace).toEqual(false);
        expect($scope.showGroup).toEqual(false);
        expect($scope.showCommunity).toEqual(true);
    }));
    it('should fetch activity in community', function(){
        $httpBackend.when('GET', '/activity').respond(comm);
        $scope.showMycommunity();
        $httpBackend.flush();
    });
    it('showMycommunity method :: should have a showMycommunity function', inject(function() {
        expect(angular.isFunction($scope.showMycommunity)).toBe(true);
    }));
    it('showMyGroups method :: should have a showMyGroups function', inject(function() {
        expect(angular.isFunction($scope.showMyGroups)).toBe(true);
    }));
    it('showMyspace method :: should have a showMyspace function', inject(function() {
        expect(angular.isFunction($scope.showMyspace)).toBe(true);
    }));
    
    
    it('showSpace method :: should have a showMyspace function', inject(function() {
        $scope.showMyspace();
        expect($scope.showGroup).toEqual(false);
        expect($scope.showCommunity).toEqual(false);
        expect($scope.showSpace).toEqual(true);
    }));
    it('showMycommunity method params :: should have a showMycommunity function', inject(function() {
        $scope.showMycommunity();
        expect($scope.showGroup).toEqual(false);
        expect($scope.showCommunity).toEqual(true);
        expect($scope.showSpace).toEqual(false);
    }));
   
    it('showMyGroups method :: should have a showMyGroups function', inject(function() {
        $scope.showMyGroups();
        expect($scope.showGroup).toEqual(true);
        expect($scope.showCommunity).toEqual(false);
        expect($scope.showSpace).toEqual(false);
    }));
});