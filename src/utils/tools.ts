import axios from 'axios';
import { CancelSource } from '@/utils/send';
import dayjs from 'dayjs';
import CryptoJS from 'crypto-js';

// package localStorage
const KEY = 'kiple_value';
export const storage = {
  setItem: (key: string, value: any) => {
    const _key = CryptoJS.MD5(key).toString();
    const _value = CryptoJS.AES.encrypt(JSON.stringify(value), KEY).toString();
    localStorage.setItem(_key, _value);
  },
  getItem: (key: string) => {
    const _key = CryptoJS.MD5(key).toString();
    const localString = localStorage.getItem(_key);
    if (!localString) {
      return '';
    }
    const bytes = CryptoJS.AES.decrypt(localString, KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText ? JSON.parse(originalText) : '';
  },
  removeItem: (key: string) => {
    const _key = CryptoJS.MD5(key).toString();
    localStorage.removeItem(_key);
  },
};

export function delUserStorage() {
  storage.removeItem('account');
}

export const getQuery = (name: string) => {
  let result = location.search.split(`${name}=`)[1];
  result = result ? result.split('&')[0] : '';
  return result;
};

export const randomString = () => Math.ceil(1e6 * Math.random()).toString(36);

// cancel request
export const handleCancelRequest = () => {
  if (CancelSource.source?.cancel) {
    CancelSource.source?.cancel && CancelSource.source?.cancel();
    const CancelToken = axios.CancelToken;
    CancelSource.source = CancelToken.source();
  }
};

export const toThousands = (num: number | string, showDecimal = true) => {
  if (isNaN(Number(num))) {
    return '0.00';
  }
  const splitNum = Number(num).toFixed(2).split('.');
  const decimal = splitNum[1];
  const integer = splitNum[0].toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
  if (!showDecimal && decimal === '00') {
    return integer;
  }
  return `${integer}.${decimal}`;
};

export const getSixDecimals = (num: number) => Math.floor(num * 1000000) / 1000000;

// Calculate the amount, save two decimal places
export const getAmountTwoDecimals = (num: number, showComma = false) => {
  const realNum = Number(num.toFixed(12)).toFixed(2);
  if (showComma) {
    return toThousands(realNum, false);
  }
  return Number(realNum);
};

export const getTime = (text?: string) => dayjs(text).format('YYYY-MM-DD hh:mm A');
export const getCurTime = () => dayjs().format('YYYY-MM-DD HH:mm');

export const getTimeString = (text?: string) => (text ? dayjs(text).format('YYYY-MM-DD, hh:mm A') : dayjs().format('YYYY-MM-DD, hh:mm A'));

export const getDate = (text: string) => dayjs(text).format('YYYY-MM-DD');

export const specialTime = (times: string) => {
  const n = dayjs();
  const b = dayjs(times);
  const time =
    n.diff(b, 'second') > 60
      ? n.diff(b, 'minute') > 60
        ? n.diff(b, 'hour') > 24
          ? `${n.diff(b, 'day')} day`
          : `${n.diff(b, 'hour')} hour`
        : `${n.diff(b, 'minute')} minute`
      : `${n.diff(b, 'second') <= 0 ? 1 : n.diff(b, 'second')} second`;
  return time;
};

// used for get redux data.
export const getTrue = () => true;

export const getFiles = (files: { fileList: any[] }) => {
  if (!files) {
    return [];
  } else {
    return files.fileList?.map((item: any) => (item.originFileObj ? item.originFileObj : item)).filter((item) => item && item.uid);
  }
};

export const getPercent = (current: number, target: number) => {
  const total = current + target;
  let percentNumber = (current / total) * 100;
  if (percentNumber > 99 && percentNumber < 100) {
    percentNumber = 99;
  }
  if (percentNumber < 1 && percentNumber > 0) {
    percentNumber = 1;
  }
  return percentNumber.toFixed(0) + '%';
};

export const getScrollWidth = () => {
  const oDiv = document.createElement('div');
  oDiv.style.cssText = 'position:absolute; top:-9999px; width:100px; height:100px; overflow:hidden;';
  const noScroll = document.body.appendChild(oDiv).clientWidth;
  oDiv.style.overflowY = 'scroll';
  const scroll = oDiv.clientWidth;
  document.body.removeChild(oDiv);
  return noScroll - scroll;
};

export const isHasPhone = (mobile: string, area_code: string) => {
  if (area_code && mobile) {
    return `+${area_code} ${mobile} `;
  } else if (!area_code && mobile) {
    return `${mobile} `;
  } else {
    return 'N/A';
  }
};

export const debounce = (fn: Function, delay: number) => {
  let timer: any = null;
  return (...values: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn.bind(null, ...values), delay);
  };
};
