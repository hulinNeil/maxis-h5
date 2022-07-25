const paths = require('./paths');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isEnvDevelopment = process.env.NODE_ENV !== 'production';

const customCss = {
  'primary-color': '#A70091',
  'border-radius-base': '4px',
};

const cssLoader = [
  isEnvDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              autoprefixer: {
                flexbox: 'no-2009',
              },
              stage: 3,
            },
          ],
        ],
      },
    },
  },
  'px2rem-loader',
  {
    loader: 'less-loader',
    options: {
      javascriptEnabled: true,
      modifyVars: customCss,
    },
  },
  {
    loader: 'style-resources-loader',
    options: {
      patterns: paths.resolveApp('src/assets/styles/common.less'),
      injector: 'append',
    },
  },
];

const cssModulesLoader = JSON.parse(JSON.stringify(cssLoader));
cssModulesLoader[1] = {
  loader: 'css-loader',
  options: {
    modules: {
      localIdentName: '[local]_[hash:base64:5]',
    },
  },
};

module.exports = { cssModulesLoader, cssLoader };
