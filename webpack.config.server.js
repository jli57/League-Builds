var fs = require('fs');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
	context: __dirname,
	entry: "./src/server/server.js",
	output: {
		path: path.resolve(__dirname),
		filename: "./dist/server.bundle.js"
	},
	target: "node",
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: [/\.jsx?$/, /\.js?$/],
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/react",
							"@babel/env",
							// "react",
							// "es2015",
							// "stage-0"
						],
						plugins: ["@babel/plugin-proposal-class-properties"]
					}
				}
			}
		]
	},
	devtool: "source-map",
	resolve: {
		extensions: [".js", ".jsx", "*"],
		modules: [
			"client",
			"node_modules"
		]
	},
	
};
