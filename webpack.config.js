var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "dist"),
    publicPath: "/assets/",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader?presets[]=react&presets[]=es2015', include: path.join(__dirname, 'src')
      }
		]
	}
}