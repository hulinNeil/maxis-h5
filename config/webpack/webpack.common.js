const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('../utils/paths');
const { cssModulesLoader, cssLoader } = require('../utils/css-loader');
const webConfig = require('../web');
const { encodeObjectValue } = require('../utils/utils');
const chalk = require('react-dev-utils/chalk');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: [paths.appIndexJs],
  output: {
    filename: 'js/[name].[fullhash].js',
    path: paths.appBuild,
    publicPath: '/',
  },
  resolveLoader: {
    modules: ['node_modules', paths.resolveApp('config/utils')],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': paths.resolveApp('src'),
    },
  },
  stats: 'none',
  infrastructureLogging: {
    level: 'none',
  },
  module: {
    // If exports is missing, an error will be reported instead of a warning.
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|less)$/,
        oneOf: [
          {
            resourceQuery: /css_modules/, // if path include 'css_modules', will use cssModules，
            use: cssModulesLoader.filter(Boolean),
          },
          {
            use: cssLoader.filter(Boolean),
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '1024',
              name: 'static/front/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: { babel: false, icon: true },
          },
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.resolveApp('public/index.html'),
      favicon: paths.resolveApp('public/favicon.ico'),
      title: 'Maxis',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
        minifyJS: true,
        minifyCSS: true,
      },
      chunksSortMode: 'none',
    }),
    new webpack.DefinePlugin(encodeObjectValue(webConfig)),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new ESLintPlugin({
      // Plugin options
      extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
      formatter: eslintFormatter,
      eslintPath: require.resolve('eslint'),
      context: paths.appSrc,
      cache: true,
      // ESLint class options
      cwd: paths.appPath,
      resolvePluginsRelativeTo: __dirname,
    }),
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
  optimization: {
    // split code
    // chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|redux)/, // 如果考虑到依赖太大的话，只引入react相关的依赖和首页的依赖，其他都是用动态加载的方式
          priority: 20,
          // 表示是否使用已有的 chunk,如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          minSize: 0,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
  },
};
