import React from 'react';
import { RefreshHooks } from './interface';

export const useRefresh = (refresh?: RefreshHooks): [RefreshHooks] => {
  const refreshRef = React.useRef<any>();

  if (!refreshRef.current) {
    if (refresh) {
      refreshRef.current = refresh;
    } else {
      refreshRef.current = {};
    }
  }

  return [refreshRef.current];
};
