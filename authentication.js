var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var GithubStrategy = require('passport-github2').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy
var config = require('./oauth.js');
var User = require('./user.js');

module.exports = passport.use(new FacebookStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL
	},
	function (accessToken, refreshToken, profile, done) {
		User.findOne({ oauthID: profile.id }, function (err, user) {
			if(err) {
				console.log(err);
			}
			if (!err && user !== null) {
				done(null, user);
			} else {
				user = new User({
					oauthID: profile.id,
					name: profile.dispayName,
					created: Date.now()
				});
				user.save(function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log('saving user...');
						done(null, user);
					}
				});
			}
		});
	}
));

passport.use(new GithubStrategy({
	clientID: config.github.clientID,
	clientSecret: config.github.clientSecret,
	callbackURL: config.github.callbackURL
	},
	function (accessToken, refreshToken, profile, done) {
		User.findOne({ oauthID: profile.id }, function (err, user) {
			if(err) {
				console.log(err);
			}
			if (!err && user !== null) {
				done(null, user);
			} else {
				user = new User({
					oauthID: profile.id,
					name: profile.dispayName,
					created: Date.now()
				});
				user.save(function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log('saving user...');
						done(null, user);
					}
				});
			}
		});
	}
));

passport.use(new GoogleStrategy({
	clientID: config.google.clientID,
	clientSecret: config.google.clientSecret,
	callbackURL: config.google.callbackURL
	},
	function (request, accessToken, refreshToken, profile, done) {
		User.findOne({ oauthID: profile.id }, function (err, user) {
			if(err) {
				console.log(err);
			}
			if (!err && user !== null) {
				done(null, user);
			} else {
				user = new User({
					oauthID: profile.id,
					name: profile.dispayName,
					created: Date.now()
				});
				user.save(function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log('saving user...');
						done(null, user);
					}
				});
			}
		});
	}
));