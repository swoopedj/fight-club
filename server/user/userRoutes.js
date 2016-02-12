var userController = require('./userController.js');


module.exports = function (app) {
  // app === userRouter injected from middlware.js
  console.log("test")
  app.post('/signin', userController.signin);
  app.post('/signup', userController.signup);
  app.get('/signedin', userController.checkAuth);
};
