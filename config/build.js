'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

process.on('unhandledRejection', (err) => {
  throw err;
});

const fs = require('fs');
const paths = require('./utils/paths');
const webpack = require('webpack');

const webpackConfig = require('./webpack/webpack.prod');
const chalk = require('react-dev-utils/chalk');
const startTime = new Date().getTime();
const useYarn = fs.existsSync(paths.yarnLockFile);

console.log('Creating an optimized production build...\n');

const compiler = webpack(webpackConfig);

compiler.run((err, stats) => {
  if (err) {
    console.log(chalk.red(err));
    process.exit(1);
  }
  const status = stats.toJson({ all: false, warnings: true, errors: true });
  if (status.errors.length || status.warnings.length) {
    if (status.warnings.length) {
      console.log(chalk.yellow('\nYou have some warnings should been fixed.\n'));
      status.warnings.forEach((item) => console.log(chalk.yellow('WARNING: ' + item.message + '\n')));
    }
    if (status.errors.length) {
      console.log(chalk.red('\nFailed to compile.'));
      console.log(chalk.red('You have some error should been fixed.\n'));
      status.errors.forEach((item) => console.log(chalk.red('ERROR: ' + item.message + '\n')));
      process.exit(1);
    }
  }
  const endTime = new Date().getTime();
  console.log(chalk.green(`Compiled successfully! Consume ${Math.floor((endTime - startTime) / 1000)}s. Please check ${paths.appBuild}`));
  const command = useYarn ? 'yarn service' : 'npm run service';
  console.log(chalk.green('You can run ') + chalk.underline.bgBlue(` ${command} `) + chalk.green(' to show this app.\n'));
});
