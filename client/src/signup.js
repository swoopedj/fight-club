'use strict';

angular.module('myApp')
  .controller('signupCtrl', ['$scope','$http', '$location', 'Auth',function($scope,$http,$location,Auth) {
  	$scope.user = {};
// functions
  	$scope.signup = function(){
	    Auth.signup($scope.user)
	      .then(function (token) {
	        $window.localStorage.setItem('com.shortly', token);
	        $location.path('/questionaire');
	      })
	      .catch(function (error) {
	        alert("NO")
	        console.error(error);
	      });
  	}
	$scope.goToSignin = function(){
		$location.path('/signin')
	}
  }]);
