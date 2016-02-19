var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple'),
    db = require('../models/user'),
    Session = require('../models/session'),
    bcrypt = require('bcrypt-nodejs'),
    data = require('../lib/db');

module.exports = {
  signin: function (req, res, next) {
    var attrs = {username: req.body.username,
        password: req.body.password};

    var hash = hashPassword(attrs.password).then(function(data){
      return data;
    })
    .catch(function(err){
      if(err){
        console.log('ERRORRRRR:', err);
      }
    });

    console.log('HASHHHHH:', hash);


    var correctPassword = data('users').select('password').where({username: attrs.username});
    db.comparePassword(hash, correctPassword);

  var username = req.body.username;
  var password = req.body.password;

  db.findByUsername(username)
    .then(function (user) {
      return db.comparePassword(password, user.password)
        .then(function () {
          return Session.create(user.id)
        })
    })
    .then(function (newSessionId) {
      res.setHeader('Set-Cookie', 'sessionId=' + newSessionId);
      res.redirect('/');
    })
    .catch(function (err) {
      if ( err.message === 'no_such_user' ) {
        console.log("No such username:", username)
        res.redirect('/sign-in')
      }
      else if ( err.message === 'password_does_not_match' ) {
        console.log("Incorrect password.")
        res.redirect('/sign-in');
      }
      else {
        res.status(500).send(err.message);
      }
    });


  },

  signup: function (req, res, next) {
    var attrs = {username: req.body.username,
        password: req.body.password};

    db.create(attrs);



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
