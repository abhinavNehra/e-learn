describe('E-LEARNING: ModalController Controller test', function(){
    var ctrl, $scope, httpBackend;
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, $rootScope,$httpBackend, $controller, $rootScope){
        httpBackend = $httpBackend;
        $rootScope = $rootScope;
        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    	$uibModalInstance = jasmine.createSpyObj('$uibModalInstance',  ['dismiss']);

        //create contorller
        ctrl = $controller('ModalController', {
            $scope: $scope,
            $uibModalInstance: $uibModalInstance
        });
    }));
    
    it('closeModal method :: should have a closeModal function', inject(function() {
        expect(angular.isFunction($scope.closeModal)).toBe(true);
    }));
     it('closeModal method :: should have a closeModal $on event', inject(function($rootScope) {
        $rootScope.$broadcast('closeModal');
    }));
    it('closeModal method :: should have a closeModal body', inject(function() {
        $scope.closeModal();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
    }));
    
    
    it('closePostActivityModal method :: should have a closePostActivityModal function', inject(function() {
        expect(angular.isFunction($scope.closePostActivityModal)).toBe(true);
    }));
    it('closePostActivityModal method :: should have a closePostActivityModal body', inject(function() {
        $scope.closePostActivityModal();
        expect($uibModalInstance.dismiss).toHaveBeenCalled();
    }));
});