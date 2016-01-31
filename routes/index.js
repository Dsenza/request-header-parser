var path = require('path');

exports.index = function(req, res) {
	res.render('index');
};

exports.ping = function(req, res) {
	res.send("Pong!", 200);
};