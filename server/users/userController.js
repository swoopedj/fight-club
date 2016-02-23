var User = require('./userModel.js'),
    Q    = require('q'),
    jwt  = require('jwt-simple'),
    db = require('../models/user'),
    Session = require('../models/session'),
    data = require('../lib/db')


module.exports = {
  signin: function (req, res, next) {
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

  questionaire: function (req, res, next) {
    // store questionaire into DB
    // req.body will be the object: {answers, userInfo}
    db.questionaire(req.body)
      .then(function(arg){
        console.log("questionaire arg", arg)
        res.json(arg)
      })
      .catch(function(err){
        console.log("crap questionaire", err)
        res.status(404).send(err.message)
      })
  },

  getInfo: function(req, res, next) {
    // req.body will be the username
    // get the user's row from user table
    // then with user id get answers/info
    // last, wrap it and res.json dat b
    db.findByUsername(req.body)
      .then(function(arg){
        return db.findProfileByUserId(arg.id)
          .then(function(row){
            return row;
          })
          .then(function(ro){
            console.log(ro)
            res.json({user: arg, profile: ro})
          })
          .catch(function(err){
            console.log("getInfo error", err)
            res.status(404).send(err.message)
          })
      })
      .catch(function(err){
        console.log("getInfo err", err)
      })
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
