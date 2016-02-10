'use strict';

angular.module('myApp')
  .controller('signupCtrl', ['$scope','$http', '$location',function($scope,$http,$location) {
    $scope.header = 'I am ready to be built!';	
// functions
  	$scope.signup = function(){
  		alert("nice")
  		$location.path('/questionaire')
  	}
  }]);
