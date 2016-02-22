angular.module('myApp.services', [])

.factory('Chat', function ($http) {
  // Your code here
  var postChat = function (chat){
   console.log('posted chat to log')
   return $http({
     method: 'POST',
     url: 'api/users/postToLog',
     data: chat
   })
   .then(function(res){
      return res;
   })
   .catch(function(err){
     console.log('post error:', err)
   })
 };

 var fetchChatLog = function(){
  console.log('chat log fetched')
  return $http({
    method: 'GET',
    url: 'api/users/fetchChatLog',
  })
  .then(function(res){
    return res;
  })
  .catch(function(err){
    console.log('fetch chat error:', err)
  })
 };

  return {
    postChat: postChat,
    fetchChatLog: fetchChatLog
  };

})

.factory('Test', function ($http) {
	var searchUser = function(x){
		return x.username;
	}
	return {
		searchUser: searchUser
	}
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    console.log("signed in user: ", user)
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
      console.log("signin error", err)
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
      console.log("reached signup resp", resp)
      return resp.data;
    })
    .catch(function(err){
      console.log("servies signup error", err)
      throw new Error(err.data)
    })
  };

  var isAuth = function () {
    // this is where I will check for session token
    return true;
  };

  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
  };
});
