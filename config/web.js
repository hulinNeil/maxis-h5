const REACT_APP_ENV = process.env.REACT_APP_ENV || 'dev';

const API_BASE_URL = {
  dev: 'http://47.254.247.241:10950' /* 'http://localhost:8080'*/,
  staging: 'http://47.254.247.241:10950',
  production: 'http://47.254.247.241:10950',
}[REACT_APP_ENV];

module.exports = {
  REACT_APP_ENV,
  API_BASE_URL,
  VERSION: '0.0.1',
};
