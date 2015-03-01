var webpack = require('webpack');

module.exports = {
  entry: './app/scripts/app.js',

  output: {
    path: 'app/build',
    filename: 'app.min.js'
  },

  module: {
    loaders: [
      { test: /\.html$/, loader: 'underscore-template-loader' }
    ]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      Backbone: 'backbone'
    })
  ]
};