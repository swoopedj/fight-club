 'use strict';
  angular.module('myApp',['luegg.directives'])

	  .controller("chatCtrl", ['$scope', function($scope){
	  	
	  	$scope.chatroom = {};
	  	$scope.chatroom.chats = [];

	  	// $scope.setUsername = function(){
	  	// 	var sessionId = $cookies.get('myCookie')
	  	// 	console.log('sessionId!!!! : ', sessionId)
	  	// 	var username = //need to create route to Session.find(sessionId)
	  	// 	$scope.chat.user = username;

	  	// };

	  	$scope.chatroom.postChat = function(message){
	  		$scope.chatroom.chats.push({message: message});
	  		console.log('message:', message)
	  		var head = $scope.chatroom.chats[$scope.chats.length-1]
	  		chatroom.message = "";
	  	};
}]);




// angular.module('slandr-chat',['luegg.directives'])

// 	  .controller("ChatController",["$rootScope",
// 	  						        "$scope",
// 	  						         "$http",
// 	  						         "$location"],
// 	  function($rootScope, $scope, $http, $location){
// 	  	$scope.chatroom = {};
// 	  	$scope.chatroom.chats = chatLog;
// 	  	$scope.chat = {};

// 	  	$scope.setUsername = function(){
// 	  		var sessionId = $cookies.get('myCookie')
// 	  		console.log('sessionId!!!! : ', sessionId)
// 	  		var username = //need to create route to Session.find(sessionId)
// 	  		$scope.chat.user = username;

// 	  	};

// 	  	$scope.postChat = function(message){
// 	  		$scope.chat.message = message;
// 	  		chatLog.push({message: message});
// 	  		console.log('message:', message)
// 	  		var head = chatLog[$rootScope.chatLog.length-1]
// 	  		$scope.chat.message = "";
// 	  	};

// 	  });


// var chatLog =[];