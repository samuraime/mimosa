const webpack = require('webpack');
const config = require('./webpack');

config.devtool = 'source-map';
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin(
    'vendor', 'vendor.js'
  ),
  new webpack.DefinePlugin({
    ENVIRONMENT: JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    mangle: false,
    comments: false
  })
];

module.exports = config;
