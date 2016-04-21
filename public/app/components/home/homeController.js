app.controller("homeController",['$rootScope','$scope','moduleService','lessonService','lessonDetailService','getCommunityService', function($rootScope, $scope,moduleService, lessonService, lessonDetailService, getCommunityService) {
  $scope.oneAtATime = true;
  $scope.showSpace = false;
  $scope.showGroup = false;
  $rootScope.$emit("callHeaderController",false);
  //$scope.showActivity = false;
  $scope.showCommunity = true;
 // $scope.actionlist = false;
  $scope.showMyspace = function(){
    $scope.showGroup = false;
    $scope.showCommunity = false;
    $scope.showSpace = true;
    $scope.$broadcast("CallUpdatedSpaceMethod", {});
    /*var container = angular.element('#masoranyGrid1');
    container.imagesLoaded( function() {
      container.masonry({
        columnWidth:1,
        itemSelector: '.girdItem',
        gutter: 13,
         percentPosition: true
      });
    });*/
  };

  $scope.showMycommunity = function(){
    $scope.showGroup = false;
    $scope.showCommunity = true;
    $scope.showSpace = false;
    /*var container = angular.element('#masoranyGrid');
    container.imagesLoaded( function() {
      container.masonry({
        columnWidth:1,
        itemSelector: '.girdItem',
        gutter: 13,
        percentPosition: true
      });
    });*/
    getCommunityService.query(function(data) {
      $scope.commloader = false;
      if(data.statusCode === 200 && data.message === 'ok'){
        if(data.result.length > 0){
          $scope.activityList = data.result;
        }
      } 
  }, function(error){
      console.log("error", error);
  });

  };
  $scope.showMyGroups = function(){
    $scope.showGroup = true;
    $scope.showCommunity = false;
    $scope.showSpace = false;
  };
  
 /* $scope.closeThis = function () {
    $scope.showActivity = false;
    angular.element('#fadein').removeClass('color-overlay');
  };
  $scope.showAction = function(){
    $scope.actionlist = true;
    $scope.showActivity = true;
  };*/
  //$scope.users = UserService.query();
  /*moduleService.get({ id: 10 },function (data) {
     console.log('success, got data: ', data);
   }, function (err) {
     alert('request failed');
   });
  /*moduleService.getAllModules(opts ,function(data){
    console.log("datatatta", data);
  });*/
  //console.log(moduleService.query());
}]);