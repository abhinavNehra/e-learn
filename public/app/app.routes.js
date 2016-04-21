app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    // Now set up the states
    $stateProvider       
        // For any unmatched url, redirect to /
        .state('/', {    
            url: '/',
            templateUrl: 'app/components/landing/landingView.html',
            controller: 'landingController',
            containerClass: 'home-background'
        })
        .state('home',{
            url: '/home',
            templateUrl : 'app/components/home/homeView.html',
            controller: 'homeController',
            containerClass: 'stable-screen'
        })
        .state('landing',{
            url: '/landing',
            templateUrl : 'app/components/landing/landingView.html',
            controller: 'homeController'
        })
        .state('profile',{
            url: '/profile',
            templateUrl : 'app/components/profile/profileView.html',
            controller: 'profileController'
        })
        .state('action',{
            url: '/action',
            templateUrl : 'app/components/action/actionView.html',
            controller: 'actionController'
        })
        .state('reset',{
            url: '/reset?user',
            templateUrl : 'app/components/resetPassword/resetPassword.html',
            controller: 'resetPasswordController'
        })
}]);