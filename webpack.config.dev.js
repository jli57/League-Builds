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
		path: path.resolve(__dirname, './dist/client'),
		filename: 'client.bundle.js',		
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, './dist/client'),
		port: 3000,
	},
	entry: {
		app: './src/frontend/index.js',
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: [
			'./src/frontend',
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
		new HtmlWebpackPlugin({
				title: 'test',
				template: './dist/index.html',
			}),		
		new CleanWebpackPlugin(['dist']),
	]
};


const serverConfig = {
	target: 'node',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist/server'),
		filename: 'server.bundle.js',
		publicPath: './server'
	},
	externals: [nodeExternals()],
	devtool: 'inline-source-map',
	devServer: {
		contentBase: path.resolve(__dirname, 'dist/server'),
		port: 8000
	},
	entry: {
		app: './src/server/server.js'
	},
};

module.exports = [clientConfig]//, serverConfig];