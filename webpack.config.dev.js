const fs = require('fs');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');



const clientConfig = {
	target: 'web', // can be ommitted since web is default, but keeping as reference
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'client.bundle.jsx',
	},
	devtool: 'inline-source-map',
	entry: {
		app: './frontend/src/index.jsx',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'./frontend',
			'node_modules',
		],
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/react',
							'@babel/env'
						],
						plugins: ['@babel/plugin-proposal-class-properties']
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			}
		]
	},

	plugins: [
		// new CleanWebpackPlugin(['dist'], {
		// 	exclude: ['index.html']
		// }),
		new HtmlWebpackPlugin({
			title: 'test',
			template: './dist/index.html',
		}),
  ],

  devServer: {
    port: 3000,
  }
};


const serverConfig = {
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
		app: './backend/src/server.js'
	},
};

module.exports = [clientConfig, serverConfig];