var fs = require('fs');
var path = require('path');
var ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  context: __dirname,
  entry: "./src/server/server.js",
  output: {
    path: path.resolve(__dirname),
    filename: "./dist/server.bundle.js"
  },
  target: "node",
  // node: {
  //   fs: 'empty',
  //   net: 'empty'
  // },
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        options:{
          presets:[
            "react",
            "es2015",
            "stage-0"
          ]
        },
        use: {
          loader: "babel-loader",
          query: {
            presets: ["@babel/react", "@babel/env"],
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
