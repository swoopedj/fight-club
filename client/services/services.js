angular.module('myApp.services', [])

.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    // console.log("signed in user: ", user)
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      // console.log('signin token', resp)
      return resp.data.session;
    })
    .catch(function(err){
      // console.log("signin error", err)
      throw new Error(err.data)
    })
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      // console.log("reached signup resp", resp)
      return resp.data;
    })
    .catch(function(err){
      // console.log("servies signup error", err)
      throw new Error(err.data)
    })
  };

// request questionaire info
  var reQuestionaire = function(answers){
    return $http({
      method: 'POST',
      url: '/api/users/questionaire',
      data: answers
    })
    .then(function(resp){
      return resp.data;
    })
    .catch(function(err){
      throw new Error(err.data)
    })
  };

  var getInfoByUsername = function(username){
    return $http({
      method: 'GET',
      url: '/api/users/info',
      data: username
    })
    .then(function(resp){
      console.log("resp", resp)
      return resp.data;
    })
    .catch(function(err){
      throw new Error(err.data)
    })
  };  

  return {
    signin: signin,
    signup: signup,
    reQuestionaire: reQuestionaire,
    getInfoByUsername: getInfoByUsername
  };
});
