const path = require('path');
const webpack = require('webpack');
const config = require('./index').client;
const coverageEnabled = process.env.COVERAGE_ENABLED === 'true';
const babelPlugins = [];

if (coverageEnabled) {
  babelPlugins.push('__coverage__');
}

module.exports = {
  entry: {
    main: './client/main.js',
    vendor: './client/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, '../../', config.destination),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'angular2'],
          plugins: babelPlugins
        }
      },
      {
        test: /\.html$/,
        loader: 'raw?minimize=false'
      },
      {
        test: /\.css$/,
        loader: 'raw?minimize=false'
      },
      {
        test: /\.scss$/,
        loaders: ['raw?minimize=false', 'sass?sourceMap']
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/]
  },

  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.json']
  },

  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor.js', Infinity
    )
  ],

  devtool: 'cheap-source-map'
};
