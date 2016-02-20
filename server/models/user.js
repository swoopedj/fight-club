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

  // Hash password before inserting into database.
  // This also returns a promise that resolves when both tasks are done.
  return User.hashPassword(attrs.password)
    .then(function (passwordHash) {
      console.log("user.create attrs", attrs)
      return db('users').insert({ username: attrs.username, password: passwordHash , firstname: attrs.firstname, lastname: attrs.lastname, email: attrs.email});
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

//User.comparePassword = comparePassword;

//
// These helpers each use a non-promise callback function,
// but then wraps it in a new promise (and returns that promise).
//
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
