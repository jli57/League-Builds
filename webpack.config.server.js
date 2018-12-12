const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
	target: 'node',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.bundle.js',
		publicPath: '/'
	},
	externals: [nodeExternals()],
	devtool: 'inline-source-map',
	entry: {
		app: './server.js'
	},
};
