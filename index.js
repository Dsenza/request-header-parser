var express = require('express');
var timestamp = require('./public/scripts/timestamp.js')

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/api/', function (req, res) {
	var options = {
		root: __dirname + '/public/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	res.sendFile('api.html', options, function (err) {
		if (err) {
			console.error(err);
			res.status(err).end();
		} else {
			console.log('Sent file')
		}
	})
})

app.get('/api/timestamp', function (req, res) {
	var options = {
		root: __dirname + '/public/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	res.sendFile('timestamp.html', options, function (err) {
		if (err) {
			console.error(err);
			res.status(err).end();
		} else {
			console.log('Sent file')
		}
	})
})

app.get('/api/timestamp/:QUERY', function (req, res) {
	var dateQuery = req.params.QUERY;
	var dateResponse = timestamp.createTimeObj(dateQuery);
	res.json(dateResponse);
})

app.get('/api/whoami', function (req, res) {
	var userAgent = req.headers["user-agent"]
	var os = /\(.*?\)/.exec(userAgent)[0]

	var whoami = {
		ip: req.ip.substring(7),
		language: req.headers['accept-language'].split(',')[0],
		OS: os.slice(1, -1)
	};
	res.json(whoami);
});

app.get('/api/whereami', function (req, res) {
	if(req.query.geo) {
		var location = {lat: req.query.lat, lon: req.query.lon}
		res.json(location);
		console.log(location)
	} else res.send("No Location")
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


