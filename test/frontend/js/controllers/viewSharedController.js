'use strict';
describe('E-LEARNING: viewSharedController Controller test', function(){
    var ctrl, $scope, $httpBackend;
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));

    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, _$httpBackend_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    	$uibModalInstance = jasmine.createSpyObj('$uibModalInstance',  ['dismiss']);

        //create contorller
        ctrl = $controller('viewSharedController', {
            $scope: $scope,
            $uibModalInstance: $uibModalInstance,
            activityId : '56dab3598e0f0fa40d98b3c7'
        });
    }));
    it('variables  test :: should have a equal value', inject(function() {
       expect($scope.isLike).toEqual(false);
    }));
    it('closeModal method body :: should have a closeModal function', inject(function() {
       $scope.closeModal();
    }));
      it('closeModal method body :: should have a closeModal function', inject(function() {
       $scope.cancel();
    }));
    it('editDetail method body :: should have a editDetail function', inject(function() {
       $scope.editDetail();
    }));
    it('likeActivity method body :: should have a likeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.likeActivity('5e4ssss98192d3f379fd13eabdd4' ,1);
      $httpBackend.when('PUT','/activity/5e4ssss98192d3f379fd13eabdd4/likes').respond({"statusCode":200,"message":"ok"})
      $httpBackend.flush();
    });
    it('likeActivity method body :: should have a likeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.likeActivity('5e4ssss98192d3f379fd13eabdd4' ,1);
      $httpBackend.when('PUT','/activity/5e4ssss98192d3f379fd13eabdd4/likes').respond({"statusCode":201})
      $httpBackend.flush();
    });
   it('unlikeActivity method body :: should have a likeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.unlikeActivity('5e4ssss98192d3f379fd13eabdd4' ,1);
      $httpBackend.when('PUT','/activity/5e4ssss98192d3f379fd13eabdd4/unlikes').respond({"statusCode":200,"message":"ok"})
      $httpBackend.flush();
    });
    it('unlikeActivity method body :: should have a unlikeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.likedPeople = 2;
      $scope.unlikeActivity('5e4ssss98192d3f379fd13eabdd4' ,1);
      $httpBackend.when('PUT','/activity/5e4ssss98192d3f379fd13eabdd4/unlikes').respond({"statusCode":201})
      $httpBackend.flush();
    });
    it('saveDetail method body :: should have a likeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.editDescriptionValue = undefined;
      $scope.saveDetail(' ','5e4ssss98192d3f379fd13eabdd4');
    });
    it('saveDetail method body :: should have a likeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.editDescriptionValue = '';
      $scope.saveDetail(' ','5e4ssss98192d3f379fd13eabdd4');
    });
    it('saveDetail method body :: should have a likeActivity body',function() {
      $httpBackend.when('GET', '/activity/56dab3598e0f0fa40d98b3c7').respond({});
      $scope.editDescriptionValue = '111111';
      $scope.saveDetail(' ','5e4ssss98192d3f379fd13eabdd4');
      $httpBackend.when('PUT','/activity/5e4ssss98192d3f379fd13eabdd4').respond({"statusCode":200,"message":"ok"})
      $httpBackend.flush();
    });
});    