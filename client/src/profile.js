'use strict';

angular.module('myApp')
  .controller('profileCtrl', ['$rootScope','$scope','$http', function($rootScope,$scope,$http) {
    $scope.profile = {name: "O'blama"};
  	$rootScope.messages = [
  		"Get ready to talk some shit",
  		"You got sources for those opinions?",
  		"Your opinion is different so it's wrong!",
  		"U WOT M8?!",
  		"Rule #3: Please refer back to rule 1",
  		"Phil eats poop",
  		"Joel eats pee",
  		"BOOZIN WITH	 BOOZER",
  		"test 3",
  		"test 4",
  		"test 5",
  		"test 6",
  		"test 7",
  		"test 8",
  		"test 9",
  		"test 10"
  	];
  	$rootScope.randoMessage;
	$rootScope.random = function(){
		var rando = Math.round(Math.random() * $rootScope.messages.length - 1)
		$rootScope.randoMessage = $rootScope.messages[rando];
	}
	$rootScope.random();
// functions
  }]);
