var express = require('express');
var Path = require('path');
var routes = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

////
var User = require('./models/user');
var Session = require('./models/session');

var app = express();

var cookieParser = require('cookie-parser')
app.use( cookieParser() );

app.use(function (req, res, next) {

    next();

})

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

////

app.use('/', routes);

app.listen(4000, function(){
  console.log('listening on port 4000')
})

var assetFolder = Path.resolve(__dirname, '../client/');
routes.use(express.static(assetFolder));


// routes.get('/views/chat.html', function(req, res){
// 	var roomPath = req._parsedOriginalUrl.query
// 	var room = roompath.slice(5)
// 	console.log('ROUTED for CHAT =========room', room)
// })

routes.get('/*', function(req,res){
  if ( req._parsedOriginalUrl.pathname === "/api/users/fetchChatLog") {
    
    var roomPath = req._parsedOriginalUrl.query
	var room = roomPath.slice(5)
    console.log('========chat.path recognized======:', room)
    res.sendFile( assetFolder + '/index.html')
  }

 //  	console.log('TEST=================== req:', req._parsedOriginalUrl.pathname);
 //  	console.log('TEST=================== req:', req._parsedOriginalUrl.query);

  res.sendFile( assetFolder + '/index.html')

})


require('./config/middleware.js')(app, express);

module.exports = app;
