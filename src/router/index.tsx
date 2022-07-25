import React from 'react';
import { router } from 'dva';
import Home from '@/pages/Home';
// use this component check user status.
// import SecurityRoute from '@/components/SecurityRoute';

const { Route, Switch } = router;

const routeConfigs = [{ path: '/home', component: Home }];
const results = [
  { path: '/result/success', component: React.lazy(() => import(/* webpackChunkName:"Result" */ '@/pages/Result/Success')) },
  { path: '/result/fail', component: React.lazy(() => import(/* webpackChunkName:"Result" */ '@/pages/Result/Fail')) },
  { path: '/result/error', component: React.lazy(() => import(/* webpackChunkName:"Result" */ '@/pages/Result/Error')) },
  { path: '/createPin', component: React.lazy(() => import(/* webpackChunkName:"Result" */ '@/pages/PinPage')) },
  { path: '/enterOtp', component: React.lazy(() => import(/* webpackChunkName:"Result" */ '@/pages/EnterOtp')) },
];

const RouterConfig = () => (
  <Switch>
    {routeConfigs.map((item) => (
      <Route path={item.path} key={item.path} component={item.component} />
    ))}
    {results.map((item) => (
      <Route path={item.path} key={item.path} component={item.component} />
    ))}
    <Route component={Home} />
  </Switch>
);

export default RouterConfig;
