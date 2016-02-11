'use strict';

angular.module('myApp')
  .controller('signinCtrl', ['$scope', '$location', 'Auth',function($scope, $location, Auth) {
  	$scope.user = {};
// functions
  	$scope.signin = function(){
  		console.log("sign in")
	    Auth.signin($scope.user)
	      .then(function (token) {
	        $window.localStorage.setItem('com.shortly', token);
	        $location.path('/profile');
	        console.log($window.localStorage)
	      })
	      .catch(function (error) {
	        alert("WRONG")
	        console.error(error);
	      });
  	}
	$scope.goToSignup = function(){
		$location.path('/signup')
	}
  }]);
