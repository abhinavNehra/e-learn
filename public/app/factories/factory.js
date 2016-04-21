app.factory('focus', function($timeout) {
    return function(id) {
      $timeout(function() {
        var element = document.getElementById(id);
        if(element){
          element.focus();
        }
      },400);
    };
});
app.filter('capitalize', function(){
   return function(input){
        if(input){
            return input[0].toUpperCase() + input.slice(1);
        }
   };
});

app.directive('confirmClick', function() {
    return {
        link: function (scope, element, attrs) {
            // setup a confirmation action on the scope
            scope.confirmClick = function(msg) {

              msg = msg || attrs.confirmClick || frontendSettings.confirmDeleteActivity ;
                // return true/false to continue/stop the ng-click
                return confirm(msg);
            };
        }
    };
});
app.directive('confirmClickDelete', function() {
    return {
        link: function (scope, element, attrs) {
           
            // setup a confirmation action on the scope
            scope.confirmClick = function(msg) {
               msg = msg || attrs.confirmClick || frontendSettings.confirmDeleteAccount ;
                // return true/false to continue/stop the ng-click
                return confirm(msg);
            };
        }
    };
});
app.directive('confirmClickComment', function() {
    return {
        link: function (scope, element, attrs) {
           
            // setup a confirmation action on the scope
            scope.confirmClick = function(msg) {
               msg = msg || attrs.confirmClick || frontendSettings.confirmDeleteComment ;
                // return true/false to continue/stop the ng-click
                return confirm(msg);
            };
        }
    };
});
 //Displaying the loading image form for loading
  app.directive('showProgressBar', function() {
    return {
      restrict: 'E',
      template: '<img src="assets/img/proceed.gif" alt="processing..." />'
    };
  });
