const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.common.js');
const paths = require('../utils/paths');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackHotDevClient = require.resolve('react-dev-utils/webpackHotDevClient');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: [
    // This is an alternative client for WebpackDevServer that shows a syntax error overlay.
    webpackHotDevClient,
  ],
  plugins: [
  ],
});
