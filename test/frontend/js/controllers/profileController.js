describe('E-LEARNING: profileController Controller test', function(){
    var ctrl, $scope, httpBackend;
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, $httpBackend, $controller, $rootScope){
        httpBackend = $httpBackend;

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
        ctrl = $controller('profileController', {
            $scope: $scope
        });
    }));
  /*  it('variables  test :: should have a equall value', inject(function() {
        expect($scope.activeAction).toEqual(false);
    }));
    it('open1 method :: should have a open1 function', inject(function() {
        expect(angular.isFunction($scope.open1)).toBe(true);
    }));
    it('open1 method :: should have a open1 body', inject(function() {
        $scope.open1();
    }));*/
});    