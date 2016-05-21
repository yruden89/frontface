/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/',
    path: './dist/assets'
  },

  cache: true,
  debug: true,
  devtool: "source-map",
  entry: [
      './src/components/main.jsx'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {
      'styles': __dirname + '/src/styles/css',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/',
      'stores': __dirname + '/src/stores/',
      'actions': __dirname + '/src/actions/',
      'helpers': __dirname + '/src/helpers'
    }
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }],
    loaders: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel'
    },{
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.html/,
      loader: "html"
    }]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CircularDependencyPlugin()
  ]

};
