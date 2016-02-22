var userController = require('./chatController.js');

module.exports = function (app) {
  // app === chatRouter injected from middlware.js
  app.post('/postToLog', chatController.postToLog);
  app.get('/fetchChatLog', chatController.fetchChatLog);
};