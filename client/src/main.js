'use strict';

angular.module('myApp')
  .controller('mainCtrl', ['$scope', '$location',function($scope, $location) {

// functions
	
	$scope.signin = function(){
		$location.path('/signin')
	}
	$scope.signup = function(){
		$location.path('/signup')
	}
  }]);
