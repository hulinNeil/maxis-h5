const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  // devtool: 'none',
  bail: true,
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
      })
    ],
  },
  plugins: [
    // Extract CSS
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      ignoreOrder: true,
    }),
    // Compress CSS
    new CleanWebpackPlugin(),
  ],
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1024 * 1024,
    maxAssetSize: 1024 * 1024,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
});
