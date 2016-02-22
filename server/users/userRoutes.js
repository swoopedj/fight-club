var userController = require('./userController.js');
var chatController = require('./chatController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);

  app.post('/postToLog', chatController.postToLog);
  app.get('/fetchChatLog', chatController.fetchChatLog);
};
