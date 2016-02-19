var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple'),
    db = require('../models/user'),
    Session = require('../models/session'),
    data = require('../lib/db')

module.exports = {
  signin: function (req, res, next) {
    var attrs = {username: req.body.username,
        password: req.body.password};

        db.findByUsername(attrs.username)
        .then(function(pw){
          if (attrs.password === pw.password){
            res.redirect('/')
          }
          else{
            console.log("wrong password")
          }
        })
        .catch(function(err) {
          console.log(err)
        })

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
