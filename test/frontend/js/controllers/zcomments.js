'use strict';
describe('E-LEARNING: commentsController Controller test', function(){
    var ctrl, $scope, $httpBackend, $timeout;
    var getComment = {"statusCode":200,"message":"ok","result":{"comments":[{"comment":"ok"}]}};
    var getCommentTotal = {"statusCode":200,"message":"ok","result":{"comments":[{"comment":"ok"}],"totalCount":3}};
   
   /**
    * Load Sixthcontinent module before execute any test
    */
    beforeEach(module('eLearning'));
     beforeEach(module('stateMock'));
    /**
    * Inject required dependencies as $httpBackend, $controller and $rootscope etc
    */
    beforeEach(inject(function($injector, _$httpBackend_, _$timeout_, $controller, $rootScope){
        $httpBackend = _$httpBackend_;
        $uibModalInstance = jasmine.createSpyObj('$uibModalInstance',  ['dismiss']);
         $timeout = _$timeout_;
        //create a new scope that's a child scope of $rootscope
        $scope = $rootScope.$new();
    
        //create contorller
        ctrl = $controller('commentsController', {
            $scope: $scope,
            $timeout :$timeout
           // $uibModalInstance: $uibModalInstance
        });
    }));
    it('variables  test :: should have a equall value', inject(function() {
        expect($scope.errorComment).toEqual(false);
    }));
    it('variables  test :: should have a watch function called', inject(function() {
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $httpBackend.flush();
        
    }));
    it('postComment method :: should have a postComment function', inject(function() {
        expect(angular.isFunction($scope.postComment)).toBe(true);
    }));
    it('cancelPost method :: should have a cancelPost function', inject(function() {
        expect(angular.isFunction($scope.cancelPost)).toBe(true);
    }));
    it('showAllComments method :: should have a showAllComments function', inject(function() {
        expect(angular.isFunction($scope.showAllComments)).toBe(true);
    }));
    it('editComment method :: should have a editComment function', inject(function() {
        expect(angular.isFunction($scope.editComment)).toBe(true);
    }));
    it('cancelPost method :: should have a cancelPost function', inject(function() {
        expect(angular.isFunction($scope.cancelPost)).toBe(true);
    }));
    it('deleteComment method :: should have a deleteComment function', inject(function() {
        expect(angular.isFunction($scope.deleteComment)).toBe(true);
    }));
    it('updateComment method :: should have a updateComment function', inject(function() {
        expect(angular.isFunction($scope.updateComment)).toBe(true);
    }));
    it('postComment method :: should have a postComment body', inject(function() {
        $scope.txtcomment = 'hello';
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        
        $scope.postComment();
        $httpBackend.when('POST', '/activity/56ssss98192d3f379fd13eabdd4/comments').respond({"statusCode":200,"message":"ok","result":[{}]});
        $httpBackend.flush();
    }));
    it('postComment method :: should have a postComment body', inject(function() {
        $scope.txtcomment = 'hello';
        $scope.commentList =[];
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $scope.postComment();
        $httpBackend.when('POST', '/activity/56ssss98192d3f379fd13eabdd4/comments').respond({"statusCode":201});
        $httpBackend.flush();
    }));
    it('deleteComment method body :: should call the api function',inject(function(){
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $scope.loader =[];
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $scope.deleteComment(1, '55ssss98192d3f379fd13eabdd4');
        $httpBackend.when('DELETE', '/activity/56ssss98192d3f379fd13eabdd4/comments/55ssss98192d3f379fd13eabdd4').respond({"statusCode":200, message:"ok"});
        $httpBackend.flush();
    }));
    it('cancelPost method :: should have a cancelPost function body', inject(function() {
        $scope.cancelPost(0);
    }));
    it('updateComment method :: should have a updateComment function body', inject(function() {
        $scope.updateComment(0, {});
    }));
    it('showAllComments method :: should have a showAllComments function body', inject(function() {
        $scope.showAllComments();
    }));
    it('editComment method :: should have a editComment function body', inject(function() {
        $scope.editComment(1,{});
        $scope.editCommentText = [];
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $httpBackend.when('PUT', '/activity/56ssss98192d3f379fd13eabdd4/comments/55ssss98192d3f379fd13eabdd4').respond({"statusCode":200, message:"ok"});
        $timeout.flush();
    }));
    it('editComment method :: should have a editComment function body', inject(function() {
        $scope.editCommentText[1] = '';
        $scope.editComment(1,{});
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $httpBackend.when('PUT', '/activity/56ssss98192d3f379fd13eabdd4/comments/55ssss98192d3f379fd13eabdd4').respond({"statusCode":200, message:"ok"});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('editComment method :: should have a editComment function body', inject(function() {
        $scope.editCommentText[0] = "test";
        $scope.activeCommentEdit = [];
        $scope.isEditComment =[];
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $scope.getComments(1);
        $scope.editComment(0,{"_id":"55ssss98192d3f379fd13eabdd4"});
        $httpBackend.when('PUT', '/activity/56ssss98192d3f379fd13eabdd4/comments/55ssss98192d3f379fd13eabdd4').respond({"statusCode":200, message:"ok"});
        $httpBackend.flush();
        $timeout.flush();
    }));
    it('editComment method :: should have a editComment function body', inject(function() {
        $scope.editCommentText[0] = "test";
        $scope.activeCommentEdit = [];
        $scope.isEditComment =[];
        $scope.commentInProcess =[];
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getComment);
        $scope.getComments(1);
        $scope.editComment(0,{"_id":"55ssss98192d3f379fd13eabdd4"});
        $httpBackend.when('PUT', '/activity/56ssss98192d3f379fd13eabdd4/comments/55ssss98192d3f379fd13eabdd4').respond({"statusCode":201});
       $httpBackend.flush();
    }));
    it('getComment method :: should have a getComment function body', inject(function() {
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getCommentTotal);
        $scope.getComments(1);
        $httpBackend.flush();
    }));
    it('getComment method :: should have a getComment function body', inject(function() {
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond(getCommentTotal);
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments').respond(getCommentTotal);
        $scope.getComments(2);
        $httpBackend.flush();
    }));
    it('getComment method :: should have a getComment function body', inject(function() {
        $scope.activityId = '56ssss98192d3f379fd13eabdd4';
        $httpBackend.when('GET', '/activity/56ssss98192d3f379fd13eabdd4/comments?limit=6&skip=0').respond({"statusCode":201});
        $scope.getComments(1);
        $httpBackend.flush();
    }));

});    