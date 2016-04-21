'use strict';
describe('E-LEARNING: AppController Controller test', function(){
  var $scope, state, $httpBackend;
  /**
  * Load Sixthcontinent module before execute any test
  */
  var statis = {
    "statusCode": 200,
    "message": "ok",
    "result": {
        "statistics": {
          
        }
    },
    "error": false
  };
  var mock_result= {"statusCode":200,"message":"ok","result":"Authenticated","error":false};
  var noti_result = {"statusCode":200,"message":"ok","result":[],"error":false};
  var profile_result = {"statusCode":200,"message":"ok","result":{"statusCode":200,"message":"ok","result":{"createdAt":"2016-04-01T06:09:15.728Z","updatedAt":"2016-04-01T06:09:15.728Z","_id":"56dff82e37bca6b31a4168be","__v":0,"local":{"dob":"30/03/2016","name":"nitesh","password":"$2a$08$RVEBnmVPP4lcajZcPxHSgOLyFjzaB.4EQKjIg.pPdlkedoBbCHiT6","email":"nitesh.jatav@daffodilsw.com","active":false,"deleted":false,"rev":0,"ambassdor":false,"avatar_url":null,"lastlogin_at":"2016-04-01T06:09:15.624Z"}},"error":false},"error":false};

  beforeEach(module('eLearning'));
  beforeEach(module('stateMock'));

  /**
  * Inject required dependencies as $httpBackend, $controller and $rootscope etc
  */
   beforeEach(angular.mock.inject(function($rootScope, $controller, _$httpBackend_){
        $httpBackend = _$httpBackend_;
       state = jasmine.createSpyObj('$state', ['go']);
        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
          $controller('AppController', {
            $scope: $scope,
            state : state
        });
    }));
    it('variables  test :: should have a equall value', inject(function() {
        expect($scope.bodyClasses).toEqual('default');
    }));

    /*it('fucntion  logout :: call logout api',function() {
        $httpBackend.when('GET', '/isAuthenticated').respond(mock_result);
        $httpBackend.when('GET', '/profile').respond({});
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $scope.logout();
        $httpBackend.when('GET', '/logout').respond(mock_result);
        $httpBackend.flush();
       // state.transitionTo('home');
    });*/
   
    it('fucntion  isAuthenticated :: should have a isAuthenticated fail result function', function() {
        $httpBackend.when('GET', '/isAuthenticated').respond({"statusCode":201});
        $httpBackend.when('GET', '/profile').respond({});
        $scope.isAuthenticated();
        $httpBackend.when('GET', '/isAuthenticated').respond({"statusCode":201});
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $httpBackend.flush();
    });

   

    it('should fetch list of statistics', function(){
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $httpBackend.when('GET', '/isAuthenticated').respond(mock_result);
        $httpBackend.when('GET', '/profile').respond(profile_result);
        $scope.getStatistics();
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $httpBackend.flush();
    });
     it('fucntion  isAuthenticated :: should have a isAuthenticated success result function', function() {
        $httpBackend.when('GET', '/isAuthenticated').respond(mock_result);
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $httpBackend.when('GET', '/profile').respond(profile_result);
        $scope.isAuthenticated();
        $httpBackend.when('GET', '/isAuthenticated').respond(mock_result);
        $httpBackend.flush();
    });

    it('function  getAllNotification :: should have a getAllNotification success result functions', function(){
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $httpBackend.when('GET', '/isAuthenticated').respond(mock_result);
        $httpBackend.when('GET', '/profile').respond(profile_result);
        $scope.getAllNotification('56fe108bdf55df6d2d3534dc');
        $httpBackend.when('GET', '/users/56fe108bdf55df6d2d3534dc/notifications').respond(noti_result);
        $httpBackend.flush();
    });


    it('function  getAllNotification :: should have a getAllNotification success result functions', function(){
        $httpBackend.when('GET', '/auth/statistics').respond(statis);
        $httpBackend.when('GET', '/isAuthenticated').respond(mock_result);
        $httpBackend.when('GET', '/profile').respond(profile_result);
        $scope.getAllNotification('56fe108bdf55df6d2d3534dc');
        $httpBackend.when('GET', '/users/56fe108bdf55df6d2d3534dc/notifications').respond({"statusCode":201});
        $httpBackend.flush();
    });
    it('variables  test :: should have a equall value', inject(function() {
        expect($scope.bodyClasses).toEqual('default');
    }));

    it('is defined', inject(function(getStatistics) {  
        expect(getStatistics).toBeDefined();
    }));


    it('isAuthenticated method :: should have a isAuthenticated function', inject(function() {
        expect(angular.isFunction($scope.isAuthenticated)).toBe(true);
    }));

    it('logout method :: should have a logout function', inject(function() {
        expect(angular.isFunction($scope.logout)).toBe(true);
    }));

    it('getStatistics method :: should have a getStatistics function', inject(function() {
        expect(angular.isFunction($scope.getStatistics)).toBe(true);
    }));
});
