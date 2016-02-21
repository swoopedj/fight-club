var userController = require('./chatController.js');

module.exports = function (app) {
  // app === chatRouter injected from middlware.js
  app.post('/signin', chatController.signin);
  app.post('/signup', chatController.signup);
  app.get('/signedin', chatController.checkAuth);
};