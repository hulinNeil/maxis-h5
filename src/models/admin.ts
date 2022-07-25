import { Model } from 'dva';
import { cancelRequest } from '@/utils/send';
import { storage } from '@/utils/tools';

/* 
When the route change, do the following:
1. Cancel the network request.
*/

const model: Model = {
  namespace: 'admin',
  state: {},
  subscriptions: {
    setup({ history }) {
      history.listen(path => {
        const prePath = storage.getItem('prePath');
        if (prePath !== path.pathname) {
          cancelRequest(); // Cancel the network request.
          storage.setItem('prePath', path.pathname);
        }
      });
    },
  },
};

export default model;
