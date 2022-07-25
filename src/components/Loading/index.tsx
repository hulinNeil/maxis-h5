import React from 'react';
import { SpinLoading } from 'antd-mobile';
import styles from './index.less';

export const LoadingPage = (
  <div className={styles.loading}>
    <SpinLoading color="primary" />
  </div>
);

const DynamicRoot: React.FC<{}> = ({ children }) => {
  return <React.Suspense fallback={LoadingPage}>{React.Children.map(children, (item) => item)}</React.Suspense>;
};

export default DynamicRoot;

export const LoadingMask = () => {
  return (
    <div className={styles.loadingMask}>
      <SpinLoading color="primary" />
    </div>
  );
};
