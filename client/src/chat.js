 'use strict';
  angular.module('myApp')

	  .controller("chatCtrl", ['$scope', '$rootScope', function($scope, $rootScope){
	  	
	  	$scope.chatroom = {};
	  	$scope.chatroom.chats = [];

	  	//$scope.chatroom.user = $rootScope.user.username;
	  	//$rootScope.user is undefined

	  	//console.log('USERNAME:', $scope.chatroom.user)

	  	$scope.chatroom.postChat = function(message){
	  		console.log('USERNAME:', $scope.chatroom.user)

	  		$scope.chatroom.chats.push({message: message});
	  		console.log('message:', message)
	  		$scope.chatroom.message = "";
	  	};
}]);




