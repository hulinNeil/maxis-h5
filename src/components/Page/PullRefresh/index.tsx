import React, { useEffect } from 'react';
import { RefreshProps } from './interface';
import { useRefresh } from './useRefresh';
import Refresh from './refresh';
import './index.less';

const defaultProps = {
  color: '#40c706',
  offset: 0,
};

const CustomPullRefresh: React.FC<RefreshProps> = (props) => {
  const { color, refresh, offset, onPullDownRefresh } = Object.assign({}, defaultProps, props);
  const [tableHooks] = useRefresh(refresh);
  let marginTop = offset;
  const header = document.querySelector('#root .app-header');
  if (header) {
    marginTop = header.clientHeight - 1;
  }

  useEffect(() => {
    const refreshInstance = new Refresh(onPullDownRefresh);
    tableHooks.startPullDownRefresh = refreshInstance.startPullDownRefresh.bind(refreshInstance);
    tableHooks.stopPullDownRefresh = refreshInstance.stopPullDownRefresh.bind(refreshInstance);
  }, []);

  return (
    <div className="page-refresh">
      <div className="page-refresh-content" style={{ marginTop }}>
        <div className="page-refresh-inner">
          <svg fill={color} className="page-refresh__icon" width="24" height="24" viewBox="0 0 24 24">
            {/* eslint-disable-next-line */}
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
          <svg className="page-refresh__spinner" width="24" height="24" viewBox="25 25 50 50">
            <circle stroke={color} className="page-refresh__path" cx="50" cy="50" r="20" fill="none" strokeWidth="4" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
    </div>
  );
};

type InternalCustomPullRefresh = typeof CustomPullRefresh;

interface PullRefreshProps extends InternalCustomPullRefresh {
  useRefresh: typeof useRefresh;
}

const PullRefresh = CustomPullRefresh as PullRefreshProps;

PullRefresh.useRefresh = useRefresh;

export default PullRefresh;
