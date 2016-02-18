angular.module('myApp.services', [])

.factory('Links', function ($http) {
  // Your code here
  var getLinks = function(){
    return $http({
      method: 'GET',
      url: '/api/links'
    })
    .then(function(resp){
      return resp.data;
    })
  }

  var addLink = function(link) {
    return $http({
      method: 'POST',
      url: '/api/links',
      data: link
    })
    .then(function(resp) {
      console.log("reached addLink", resp)
      return resp.data;
    })
    .catch(function(err){
      return err;
    })
  }

  var visits = function(code){
    return $http({
      method: 'GET',
      url: code
    })
    .then(function(result){
      console.log("visits result", result)
      return result.data;
    })
    .catch(function(err){
      console.log(err)
    })
  }

  return {
    getLinks: getLinks,
    addLink: addLink
  }
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
      console.log('signin token', resp.data.token)
      return resp.data.token;
    });
  };

  var signup = function (user) {
  	console.log("signed up user: ", user)
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    console.log("isAuth in Auth")
    return false;
    // this is where I will check for session token
  };

  var signout = function () {
    $location.path('/');
    
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
