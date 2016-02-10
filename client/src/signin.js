'use strict';

angular.module('myApp')
  .controller('signinCtrl', ['$scope', '$location',function($scope, $location) {
  	$scope.welcome = 'Welcome to your App!';
  	$scope.buttonText = 'This is your Button';
// functions
  	$scope.signin = function(){
  		alert("hi")
  		$location.path('/profile')
  	}
  }]);
