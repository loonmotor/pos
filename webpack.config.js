const
	LiveReloadPlugin = require('webpack-livereload-plugin')
	, webpack = require('webpack');

module.exports = {
	entry: [
		'./browser.js'
	],
	output: {
		path: './public/js',
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude : /node_modules/,
			loader: 'babel'
		}]
	},
	plugins : [
		new webpack.DefinePlugin({
		  "process.env": { 
		     NODE_ENV: JSON.stringify("production") 
		   }
		}),
		new LiveReloadPlugin()
	]
};