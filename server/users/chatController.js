var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple'),
    db = require('../models/chatlog'),
    Session = require('../models/session'),
    data = require('../lib/db')


    module.exports = {

    	fetchChatLog: function(req, res, next){
    		console.log('made it to chatController, fetch req ======', req.params)
             var roomPath = req._parsedOriginalUrl.query
             var room = roompath.slice(5)
    		return db.fetchChats(room)
    		.then(function(chats){
    			console.log('res in fetchChatlog ======', res.body)
    		})
    		.catch(function(err){
    		  if(err){
    			console.log(err);
    		  }
    		})
    	},

    	postToLog: function(req, res, next){

    		console.log('made it to chatController, post req ======', req.body)
    		var username = req.body.username;
    		var room = req.body.room;
    		var message = req.body.message
    		return db.postChat(username, room, message)
    		.then(function(){
    			console.log('CHAT posted!')
    		})
    		.catch(function(err){
    			if(err){
    				console.log("POST error:", err);
    			}
    		})
    	}

    }