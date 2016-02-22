var db = require('../lib/db');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = module.exports;

User.findByUsername = function (username) {
  return db('users').select('*').where({ username: username }).limit(1)
    .then(function(rows) {
      console.log("findByUsername rows", rows)
      // returning row object of id, username, hashedpass, etc
      return rows[0] || Promise.reject( new Error('no_such_user') )
    });
};

User.signIn = function (attrs) {
  User.findByUsername(attrs.username)
  .then(function(pw){
    return (attrs.password === pw.password);
  })
  .catch(function(err) {
    console.log(err)
  });
}

User.create = function (attrs) {
  console.log('test=====================')
  // Hash password before inserting into database.
  // This also returns a promise that resolves when both tasks are done.

  return User.hashPassword(attrs.password)
    .then(function (passwordHash) {
      console.log("user.create attrs", attrs)
      return db('users').insert({ email: attrs.email ,  firstname: attrs.firstname, lastname: attrs.lastname, password: passwordHash , username: attrs.username});
    })
    .then(function (result) {
      var newId = result[0];
      console.log("reached user create", result)
      // Return full user object (without password)
      return { id: newId, username: attrs.username }
    })
    .catch(function (err) {
      if ( err.message.match('UNIQUE constraint failed: users.username') ) {
        // Throw a more semantic error
        throw new Error('username_is_taken');
      }
      else {
        // We don't know what this error is; propogate.
        throw err;
      }
    });

};
User.questionaire = function(attrs){
  // questionaire table has: user_id, answers, user_bio
  // attrs is the object: {answers, userInfo}
  var stringAnswers = JSON.stringify(attrs.answers);
  return User.findByUsername(attrs.userInfo.username)
    .then(function(user){
      return db('questionaire').insert({user_id: user.id, answers: stringAnswers, user_bio: attrs.userInfo.bio});
    })
    .catch(function(err){
      console.log("user.questionaire err", err)
      throw err;
    })
};

User.findProfileByUserId = function(userId){
  console.log("user find profile", userId)
  return db('questionaire').select('*').where({user_id: userId}).limit(1)
    .then(function(row){
      console.log('user.find profile', row)
      return row[0] || Promise.reject( new Error('no_such_user') )
    })
};

User.hashPassword = function(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, null, null, function (err, hashResult) {
      if (err) reject(err);
      else     resolve(hashResult);
    });
  });
};

User.comparePassword = function(attemptedPassword, actualPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(attemptedPassword, actualPassword, function(err, isMatch) {
      console.log("reached comparePassword ", isMatch, err)
      if (err)                     reject(err);
      else if (isMatch === false)  reject(new Error('password_does_not_match'))
      else                         resolve();
    });
  });
};
