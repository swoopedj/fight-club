var db = require('../lib/db');
var Promise = require('bluebird');

var Chatlog = module.exports;

//
Chatlog.fetchChats = function(room){
	console.log('room========================', room)
	return db('chatlog').select('*').where({chatroom: room})
	  .then(function(posts){
	  	console.log('========New Posts:', posts)
	  	return posts
	  })
	  .catch(function(err){
	  	if(err){
	  	  console.log("ERROR in fetchChats: ", err);
	  	}
	  })

};

Chatlog.postChat = function(username, room, message){
	return db('chatlog').insert({username: username, room: room, message: message})
	.then(function(){
		console.log('chatPost in table chatlog');
	})
	.catch(function(err){
		if(err){
			console.log("ERROR in postChat: ", err);
		}
	})
};