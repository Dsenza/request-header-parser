var express = require('express');
var timestamp = require('./public/scripts/timestamp.js');
var stylus = require('stylus');
var nib = require('nib');

var app = express();

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', {error: err});
}

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.set('compress', true)
		.use(nib())
		.import(nib)
}

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


app.use(stylus.middleware({
	src: __dirname + '/public',
	complile: compile
}));
app.use(express.static(__dirname + '/public'));


/*app.get('/api/', function (req, res) {
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
})*/
app.get('/', function (req, res) {
	res.render('index')
})

app.get('/api/whereami', function (req, res) {
	if(req.query.geo) {
		var location = {lat: req.query.lat, lon: req.query.lon}
		res.json(location);
		console.log(location)
	} else res.send("No Location")
});

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

app.get('/:LOCATION', function (req, res) {
	var location = req.params.LOCATION
	res.render(location, function(err, html) {
		if(err) {
			res.render('error', {error: err})
			console.log(err)
		}
		res.send(html)
	})
})

/*
app.get('/:FILENAME', function (req, res) {
	var filename = req.params.FILENAME + '.html'
	var options = {
		root: __dirname + '/public/',
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	res.sendFile(filename, options, function (err) {
		if (err) {
			console.error(err);
			res.status(err).end();
		} else {
			console.log('Sent: ' + filename)
		}
	})
})
*/
app.get('/timestamp/:QUERY', function (req, res) {
	var dateQuery = req.params.QUERY;
	var dateResponse = timestamp.createTimeObj(dateQuery);
	res.json(dateResponse);
})

app.use(function(req, res, next) {
	res.status(404).render('error', {error: "404: Can't find that"})
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


