'use strict';

angular.module('myApp')
  .controller('mainCtrl', ['$scope', '$location', 'Test',function($scope, $location, Test) {
  	$scope.user = {};
// functions
	
	$scope.goToSignin = function(){
		$location.path('/signin')
	}
	$scope.goToSignup = function(){
		$location.path('/signup')
	}
	$scope.searchUser = function(){
		console.log(Test.searchUser($scope.user));
	}
  }]);
