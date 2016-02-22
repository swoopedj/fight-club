'use strict';

angular.module('myApp')
  .controller('questionCtrl', ['Auth','$cookies', '$location','$rootScope','$scope','$http', function(Auth, $cookies,$location,$rootScope,$scope,$http) {
    $scope.questions = {};
    $scope.userInfo = {};
  	$rootScope.messages = [
      "The supreme art of war is to subdue the enemy without fighting",
      "70% of statistics don't need sources",
      "Remember: If their opinion is different, it's wrong.",
      "U WOT M8?!",
      "Rule #3: Please refer back to rule 1",
      "Freedom is hammered out on the anvil of discussion, dissent, and debate",
      "Sometimes by losing a battle you find a new way to win the war",
      "The opposite of a correct statement is a false statement. But the opposite of a profound truth may well be another profound truth",
      "For good ideas and true innovation, you need human interaction, conflict, argument, debate",
      "Deliberation and debate is the way you stir the soul of our democracy",
      "Debate and divergence of views can only enrich our history and culture",
      "It is never smart, even in a strong democracy, to declare some debate off limits",
      "You can choose to not let little things upset you",
      "To be offended is a choice we make; it is not a condition inflicted or imposed upon us by someone or something else",
      "There is no such thing as an impartial jury because there are no impartial people. There are people that argue on the web for hours about who their favorite character on 'Friends' is",
      "Fear not those who argue but those who dodge"
  	];
  	$rootScope.randoMessage;
// functions
	$scope.finished = function(){
    // combine questions and userInfo to one Object
  var questionaire = {answers: $scope.questions, userInfo: $scope.userInfo};
    Auth.reQuestionaire(questionaire)
      .then(function(resp){
        console.log("questionaire resp", resp)
        $location.path('/profile');
      })
      .catch(function(err){
        console.log("well shit...", err)
      })
	}
	$rootScope.random = function(){
		var rando = Math.round(Math.random() * $rootScope.messages.length - 1)
		$rootScope.randoMessage = $rootScope.messages[rando];
	}
  $rootScope.checkLogin = function(){
    // console.log("questionaire checkLogin", $cookies.get('myCookie'))
    if($cookies.get('myCookie')){
      $scope.userInfo.username = $cookies.get("myUsername");
      return false;
    }else{
      $location.path('/')
    }
  }
  $rootScope.signout = function(){
    $cookies.remove('myCookie')
    $cookies.remove('myUsername')
    $location.path('/')
  }
	$rootScope.random();
  $rootScope.checkLogin();
  }]);
