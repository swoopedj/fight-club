 'use strict';
  angular.module('myApp')

	  .controller("chatCtrl", ['$scope', '$rootScope', '$cookies', function($scope, $rootScope, $cookies){
	  	
	  	$scope.chatroom = {};
	  	$scope.chatroom.chats = [];

	  	var name = $cookies.get('myUsername')
	  	var session = $cookies.get('myCookie')

	  	$scope.chatroom.postChat = function(message){
	  		$scope.chatroom.chats.push({
	  			user: $cookies.get('myUsername'),
	  			message: message
	  		});
	  		console.log('message:', message)
	  		$scope.chatroom.message = "";
	  	};
}]);




