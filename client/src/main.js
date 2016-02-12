'use strict';

angular.module('myApp')
  .controller('mainCtrl', ['$scope', '$location', 'Test',function($scope, $location, Test) {
  	$scope.user = {};
  	$scope.messages = [
  		"Get ready to talk some shit",
  		"You got sources for those opinions?",
  		"Your opinion is different so it's wrong!",
  		"U WOT M8?!",
  		"Rule #3: Please refer back to rule 1",
  		"Phil eats poop",
  		"Joel eats pee",
  		"BOOZIN WITH BOOZER",
  		"test 3",
  		"test 4",
  		"test 5",
  		"test 6",
  		"test 7",
  		"test 8",
  		"test 9",
  		"test 10"
  	];
  	$scope.randoMessage;

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
	$scope.random = function(){
			var rando = Math.round(Math.random() * $scope.messages.length - 1)
			$scope.randoMessage = $scope.messages[rando];
	}

	$scope.random();
  }]);
