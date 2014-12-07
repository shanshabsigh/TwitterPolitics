module.exports = function(app,server){

	var io = require('socket.io').listen(server);
	var T = require('./twit.js');

//APPLICATION
	app.get('/',function(req,res){
		res.sendfile('views/home.html');
	})

//ROUTES
	app.get('/Obama',function(req,res){
		T.get('search/tweets', { q: '#Obama', count: 1 }, function(err, data, response) {
  			console.log(data.statuses);
  			res.render('Obama.html',{data:data.statuses});
		})
	});

	app.get('/Ferguson', function(req,res){
		T.get('search/tweets', {q:'#Ferguson', count:1}, function(err, data, response){
			console.log(data.statuses);
			res.render('Ferguson.html',{data:data.statuses});
		})
	});

//SOCKET
	io.sockets.on('connection', function(socket){
		console.log("Connected to socket")

		socket.on('Obama',function(){
			console.log('obama connected');
			var Ostream=T.stream('statuses/filter',{track: ['#Obama']})
			Ostream.on('tweet',function(tweet){
				console.log(tweet);
				socket.emit('Otweet', tweet);
			})
		})

		socket.on('Ferguson', function(){
			console.log('ferguson connected');
			var Fstream=T.stream('statuses/filter', {track:['#Ferguson']})
			Fstream.on('tweet', function(tweet){
				console.log(tweet);
				socket.emit('Ftweet', tweet);
			})
		})

	});


};