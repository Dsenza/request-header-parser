// Dependencies
var fs = require('fs');
var express = require('express');
var routes = require('./routes');
var path = require('path');
var mongoose = require('mongoose');
var timestamp = require('./public/scripts/timestamp.js');
var User = require('./user.js')

// Express middleware dependencies
var stylus = require('stylus');
var nib = require('nib');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

// Passport and associated strategy dependencies
var passport = require('passport');
var config = require('./oauth.js');
var fbAuth = require('./authentication.js');
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy

// connect to database
var dbuser = config.mongodb.user, dbpass = config.mongodb.pass;
var dburl = 'mongodb://' + dbuser + ':' + dbpass + '@ds055485.mongolab.com:55485/heroku_1hmcqmj0'
mongoose.connect(dburl);

// serialize and deserialize
passport.serializeUser(function (user, done) {
	done(null, user._id);
});
passport.deserializeUser(function (id, done) {
	User.findById(id, function (err, user) {
		if(!err) {
			done(null, user);
		} else {
			done(err, null);
		};
	});
});

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
app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser());
app.use(methodOverride());
app.use(session({secret: 'yosemite'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.use(stylus.middleware({
	src: __dirname + '/public',
	complile: compile
}));


// Routes

app.get('/', function (req, res) {
	res.render('index')
})

app.get('/acount', ensureAuthenticated, function (req, res) {
	User.findById(req.session.passport.user, function (err, user) {
		if (err) {
			console.log(err);
		} else {
			res.render('account', {user: user});
		}
	});
});

app.get('/auth/facebook', passport.authenticate('facebook'), function (req, res) {});
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/'}),
	function (req, res) {
		res.redirect('/account');
	});

app.get('/auth/github', passport.authenticate('github'), function (req, res) {});
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/'}),
	function (req, res) {
		res.redirect('/account');
	});

app.get('/auth/google', passport.authenticate('google'), function (req, res) {});
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/'}),
	function (req, res) {
		res.redirect('/account');
	});

app.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

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
	res.render(location, function (err, html) {
		if(err) {
			res.render('error', {error: err})
			console.log(err)
		}
		res.send(html)
	})
})


app.get('/api/timestamp', function (req, res) {
	res.render('timestamp', function (err, html) {
		if(err) {
			res.render('error', {error: err})
			console.log(err)
		}
		res.send(html)
	})
})

app.get('/api/timestamp/:QUERY', function (req, res) {
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

// test authentication
function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

module.exports = app;