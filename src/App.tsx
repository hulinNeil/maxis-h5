import React, { useEffect } from 'react';
import { router, useDispatch } from 'dva';
import Routers from './router';
import DynamicRoot from '@/components/Loading';
import { UserInfoType } from './services/account';
import { storage } from './utils/tools';
import 'antd-mobile/es/global';
import '@/assets/styles/index.less';

const { Router } = router;

// in root node, don't use modal state, otherwise all nodes are rendered completely.
const APP = () => {
  const dispatch = useDispatch();

  // first load portal: should auto-login, set userInfo from storage
  useEffect(() => {
    const userInfoLocal: UserInfoType['data'] = storage.getItem('account');
    if (userInfoLocal) {
      dispatch({ type: 'account/change', payload: userInfoLocal });
    }
  }, []);

  return (
    <DynamicRoot>
      <Routers />
    </DynamicRoot>
  );
};

// modal use routerRedux, so there should use history.
export default ({ history }: any) => (
  <Router history={history}>
    <APP />
  </Router>
);
