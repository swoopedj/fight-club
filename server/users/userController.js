var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple'),
    db = require('../models/user'),
    Session = require('../models/session'),
    data = require('../lib/db')

module.exports = {
  signin: function (req, res, next) {
    // var attrs = {username: req.body.username,
    //     password: req.body.password};
    //
    // var hash = hashPassword(attrs.password);
    //
    // var correctPassword = db('users').select('password').where({username: attrs.username});
    // db.comparePassword(hash, correctPassword);
    var username = req.body.username;
    var password = req.body.password;
    db.findByUsername(username)
      .then(function (user) {
        // the user argument is the row
        return db.comparePassword(password, user.password)
          .then(function () {
            return Session.create(user.id)
          })
      })
      .then(function (newSessionId) {
        // res.setHeader('Set-Cookie', 'sessionId=' + newSessionId);
        // console.log("signin second promise", res)
        res.json({session:newSessionId});
      })
      .catch(function (err) {
        if ( err.message === 'no_such_user' ) {
          res.status(404).send(err.message);
        }
        else if ( err.message === 'password_does_not_match' ) {
          res.status(401).send(err.message);
        }
        else {
          console.log("reached signin 500 message")
          res.status(500).send(err.message);
        }
      });
  },

  signup: function (req, res, next) {
    var attrs = {username: req.body.username,
        password: req.body.password, firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email};
    db.create(attrs)
      .then(function(arg){
        // return user id
        console.log("signup arg", arg)
        res.json({id: arg.id})
      })
      .catch(function(err){
        res.status(404).send(err.message)
      })
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header is any
    // then decode the token, which we end up being the user object
    // check to see if that user exists in the database

  }

};

var hashPassword = function(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, null, null, function (err, hashResult) {
      if (err) reject(err);
      else     resolve(hashResult);
    });
  });
};
