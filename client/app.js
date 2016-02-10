'use strict';

angular.module('myApp', [
    'ui.router'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('signin', {
            url: '/',
            templateUrl: 'views/signin.html',
            controller: 'MainCtrl'
        })

        .state('signup', {
          url: '/signup',
          templateUrl: 'views/signup.html',
          controller: 'AboutCtrl'
        });
        
});
