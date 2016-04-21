describe('E-LEARNING: communityController Controller test', function(){
    var ctrl, $scope, $httpBackend, state;
    var comm = {"statusCode":200,"message":"ok","result":[{"createdAt":"2016-03-23T06:40:02.496Z"}]};
    var comm1 = {"statusCode":200,"message":"ok","result":[]};
    /**
    /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
    beforeEach(module('stateMock'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector,$state, _$httpBackend_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;
        state = $state;

        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
        ctrl = $controller('communityController', {
            $scope: $scope,
            state : $state
        });
    }));
     it('variables  test :: should have a equal value', inject(function() {
       expect($scope.commloader).toEqual(true);
    }));
    it('showCommunityList method :: should have a showCommunityList function', inject(function(){
        expect(angular.isFunction($scope.showCommunityList)).toBe(true);
    }));
  
    it('showCommunityList method :: should have a showCommunityList function', inject(function(){
        expect(angular.isFunction($scope.showCommunityList)).toBe(true);
    }));
  
    it('should fetch activity in community', function(){
        $httpBackend.when('GET', '/activity').respond(comm);
        $scope.showCommunityList();
        $httpBackend.flush();
    });
    it('should fetch activity in community', function(){
        $httpBackend.when('GET', '/activity').respond(comm1);
        $scope.showCommunityList();
        $httpBackend.flush();
    });
    it('viewActivity method :: should have a viewActivity function', inject(function(){
        expect(angular.isFunction($scope.viewActivity)).toBe(true);
    }));
    it('viewActivity call method :: should have a viewActivity defination', inject(function($rootScope){
        $rootScope.isLoggedIn = false;
        $scope.viewActivity();
    }));
    it('loadMore call method :: should have a loadMore defination', inject(function(){
        $scope.loadMore();
    }));
    it('viewActivitySpace method :: should have a viewActivitySpace body', function() {
        $httpBackend.when('GET', '/activity').respond(comm);
        $scope.viewActivity('56ssss98192d3f379fd13eabdd4');
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4').respond({"statusCode":200,"message":"ok","result":{"likes":['rr34344']}});
        $httpBackend.when('GET', 'app/shared/activityDetail/viewSharedActivity.html').respond();
        $httpBackend.flush();
    });
});    