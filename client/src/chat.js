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
	  			username: name,
	  			room: room,
	  			message: message
	  		}
	  		Chat.postChat(chat)
	  		$scope.chatroom.chats.push({
	  			username: name,
	  			message: message
	  		});
	  		$scope.chatroom.fetchChats(room);
	  		$scope.chatroom.message = "";
	  	};

	  	$scope.chatroom.fetchChats = function(room){
	  		Chat.fetchChatLog(room)
	  		.then(function(chatobj){
	  			console.log('chatobj retrieved=====', chatobj)
	  		})
	  		.catch(function(err){
	  			console.log('Error in fetch =====', err)
	  		})

	  		//in then => if chatobj with that id and not the username from the cookie 
	  		//does not exist in array , push to array
	  		//post to db instead of array?

	  	};

	  	// setInetrval(function(){
	  	// 	$scope.chatroom.fetchChats(room);
	  	// }, 3000);
}]);




