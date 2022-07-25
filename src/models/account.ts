import { Model } from 'dva';
import { storage } from '@/utils/tools';

export interface AccountState {
  loggedIn: boolean;
  userInfo: any;
}

export interface AccountModel extends Model {
  state: AccountState;
}

const model: AccountModel = {
  namespace: 'account',
  state: {
    loggedIn: false,
    userInfo: {},
  },
  reducers: {
    change(state, { payload }: any) {
      return { ...state, ...payload };
    },
    updateInfo(state, { payload }: any) {
      const data = { loggedIn: true, userInfo: { ...state.userInfo, ...payload } };
      storage.setItem('account', data);
      return data;
    },
  },
  effects: {
    check({ payload }, { call, put }) {
      console.log('check user status', payload, call, put);
    },
  },
};

export default model;
