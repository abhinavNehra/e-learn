describe('E-LEARNING: headerController Controller test', function(){
    var ctrl, $scope, httpBackend;
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, $httpBackend, $controller, $rootScope,$uibModal){
        httpBackend = $httpBackend;

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