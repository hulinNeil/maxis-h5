const paths = require('../utils/paths');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

// const sockHost = process.env.WDS_SOCKET_HOST;
// const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
// const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    static: paths.appBuild,
    client: {
      logging: 'none',
    },
    compress: true,
    proxy: {
      '/web': {
        target: 'http://localhost:3200',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/web': '/web',
        },
      },
    },
    onBeforeSetupMiddleware: function (devServer){
      devServer.app.use(errorOverlayMiddleware());
    }
  }
};
