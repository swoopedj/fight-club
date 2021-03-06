var userController = require('./userController.js');
var chatController = require('./chatController.js');

module.exports = function (app) {
  // app === userRouter injected from middlware.js
  app.get('/info', userController.getInfo);
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);

  app.post('/postToLog', chatController.postToLog);
  app.get('/fetchChatLog', chatController.fetchChatLog);

  app.post('/questionaire', userController.questionaire);

};
