'use strict';

angular.module('myApp', [
    'ui.router'
  ])

    .config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('main', {
          url: '/',
          templateUrl: 'views/main.html',
          controller: 'mainCtrl'
        })

        .state('signin', {
            url: '/signin',
            templateUrl: 'views/signin.html',
            controller: 'signinCtrl'
        })

        .state('signup', {
          url: '/signup',
          templateUrl: 'views/signup.html',
          controller: 'signupCtrl'
        })
        
        .state('questionaire', {
          url: '/questionaire',
          templateUrl: 'views/questionaire.html',
          controller: 'questionCtrl'
        })

        .state('profile', {
          url: '/profile',
          templateUrl: 'views/profile.html',
          controller: 'profileCtrl'
        })
});
