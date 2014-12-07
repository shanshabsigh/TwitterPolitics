//SERVER
var express = require('express');
var app = express();
var server = require('http').Server(app);
var twit = require('twit');
var swig = require('swig');


//CONFIGURE
app.configure(function(){
	app.use(express.static(__dirname + '/public'));
	app.use(express.logger('dev'));	
	app.use(express.bodyParser());
	app.set('view engine','html');
	app.engine('html', swig.renderFile);
});


//ROUTES
require('./routes.js')(app, server);


server.listen(3000);

