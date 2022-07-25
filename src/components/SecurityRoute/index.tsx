import { router } from 'dva';
import React from 'react';
import { storage } from '@/utils/tools';
import { RouteProps } from 'dva/router';
import { AccountModel } from '@/models/account';

const { Redirect, Route } = router;

/**
 * Verify route permissions, access to the current destination route needs to meet
 * 1. Have login; 2. Have token;
 * if not, will redirect login page.
 * if user is first login, should redirect update password page.
 * if the user has no permissions, you need to jump to error page.
 */
const SecurityRoute: React.FC<RouteProps> = (params) => {
  const account: AccountModel['state'] = storage.getItem('account') || {};
  const { loggedIn, userInfo } = account;

  if (!loggedIn || !userInfo || !userInfo.token) {
    return <Redirect to="/result/error" />;
  }

  return <Route {...params}></Route>;
};

export default SecurityRoute;
