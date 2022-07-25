import { ErrorType } from './statusConfig/errorType';
import axios, { AxiosResponse } from 'axios';
import { delUserStorage, storage } from './tools';

export const CancelSource: any = {
  source: {
    token: undefined,
    cancel: null,
  },
};

// Handle custom error messages.
export const interceptErrorConfig: { interceptCodes: number[] } = { interceptCodes: [] };

export const cancelRequest = () => {
  CancelSource.source?.cancel && CancelSource.source?.cancel();
  const CancelToken = axios.CancelToken;
  CancelSource.source = CancelToken.source();
};

const checkLogin = (resp: AxiosResponse) => {
  const code = resp.data.code;
  if (code === ErrorType.TokenError || code === ErrorType.MerchantTokenError) {
    delUserStorage();
    setTimeout(function () {
      window.location.href = '/';
    }, 800);
  }
};

axios.interceptors.request.use(function (config: any) {
  config.url = API_BASE_URL + config.url;
  const requestToken = storage.getItem('account') || {};
  if (requestToken.userInfo && requestToken.userInfo.token) {
    config.headers['token'] = requestToken.userInfo.token;
  }
  config.headers.post['Content-Type'] = 'application/json';
  config.timeout === null ? (config.timeout = null) : (config.timeout = 300000);

  // custom error
  config.interceptCodes = interceptErrorConfig.interceptCodes;
  //  add source cancel
  config.cancelToken = config.cancelToken ? config.cancelToken : CancelSource.source.token;
  return config;
});

axios.interceptors.response.use(
  function (response: any) {
    checkLogin(response);
    // Uniformly handles errors returned by the server
    const { data, config } = response;
    if (data && data.code !== 0 && data.msg && !config.interceptCodes.includes(data.code)) {
      console.log('需要显示error message', response.data.msg);
    }
    return response;
  },
  function (error) {
    if (!axios.isCancel(error)) {
      console.log('request error:', error);
      const message = error && error.message ? error.message : 'Unknown error, please check your network ~';
      console.log('需要显示error message', message);
    }
    return error;
  }
);

export const post = (url: string, param: any, headers?: any, timeout?: any, cancel?: any): Promise<any> => {
  return axios
    .post(url, param, {
      headers: headers || {},
      timeout: timeout,
      cancelToken: cancel,
    })
    .then((resp) => {
      return resp?.data ? resp?.data : { data: null, code: -1 };
    });
};

export const put = (url: string, param: any) => {
  return axios.put(url, param).then((resp) => resp.data);
};

export const get = (url: string, params?: any, headers?: any): Promise<any> => {
  return axios.get(url, { params, headers: headers || {} }).then((resp) => {
    return resp?.data ? resp?.data : { data: null, code: -1 };
  });
};

export const del = (url: string, params: any) => {
  return axios.delete(url, { params }).then((resp) => resp.data);
};
