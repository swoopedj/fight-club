 'use strict';
  angular.module('myApp')

	  .controller("chatCtrl", ['$scope', '$rootScope', '$cookies', 'Chat', function($scope, $rootScope, $cookies, Chat){
	  	
	  	$scope.chatroom = {};
	  	$scope.chatroom.chats = [];


	  	var name = $cookies.get('myUsername')
	  	var session = $cookies.get('myCookie')
	  	var room = 'thisroom';

	  	$scope.chatroom.postChat = function(message){
	  		var chat = {
	  			username: $cookies.get('myUsername'),
	  			room: room,
	  			message: message
	  		}
	  		Chat.postChat(chat)
	  		$scope.chatroom.chats.push({
	  			username: $cookies.get('myUsername'),
	  			message: message
	  		});
	  		console.log('message:', message)
	  		$scope.chatroom.message = "";
	  	};

	  	$scope.chatroom.fetchChats = function(room){
	  		Chat.fetchChatLog(room)
	  		//query database for chats posts (maybe with timestamp
	  		// later than last post in chats array?)
	  		// push new chat posts into chat array

	  		//needs connection to fetchChats() in chatlog.js
	  	};

	  	// setInetrval(function(){
	  	// 	$scope.chatroom.fetchChats(room);
	  	// }, 3000);
}]);




