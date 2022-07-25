'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const paths = require('./utils/paths');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const { createCompiler, prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');

const config = require('./webpack/webpack.dev');
const webpackDevServerConfig = require('./webpack/webpackDevServer.config');

const useYarn = fs.existsSync(paths.yarnLockFile);

const port = parseInt(process.env.PORT, 10) || 3200;
const HOST = process.env.HOST || '0.0.0.0';
const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const urls = prepareUrls(protocol, HOST, port);

const appName = require(paths.appPackageJson).name;
const compiler = createCompiler({
  appName,
  config,
  urls,
  useYarn,
  webpack,
});
// const compiler = webpack(config);
const devOptions = { host: HOST, port: port, ...webpackDevServerConfig.devServer };
const devServer = new WebpackDevServer(devOptions, compiler);

const runServer = async () => {
  await devServer.start();
  openBrowser(urls.localUrlForBrowser);
};

runServer();