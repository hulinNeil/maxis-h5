import dva from 'dva';
import createLoading from 'dva-loading';
import { createBrowserHistory } from 'history';
import models from './models';
import App from './App';

export const app = dva({
  history: createBrowserHistory(),
  onError(e: any) {
    console.log('get app error:', e);
  },
});

// Use loading plugins
app.use(createLoading());

// Use models
models.forEach(key => app.model(key.default));

// require router
app.router(App);

// run app
app.start('#root');
