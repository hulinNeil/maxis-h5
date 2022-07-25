import classNames from 'classnames';
import React from 'react';
import Header from './Header';
import './index.less';

export interface PageProps {
  title?: string;
  onBack?: Function;
  rightNode?: React.ReactNode;
  className?: string;
  showLogo?: boolean;
  isShadow?: boolean;
  showClose?: boolean;
}

const Page: React.FC<PageProps> = (props) => {
  const { children, className = '', ...prop } = props;
  return (
    <div className={classNames('app-page', className)}>
      <Header className="app-header" {...prop} />
      <div className="app-header-placeholder" />
      <div className="app-body">{React.Children.map(children, (item) => item)}</div>
    </div>
  );
};

export default Page;
