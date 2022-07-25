import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { BackIcon, CancelIcon, HomeLogos } from '../../Icons';
import styles from './index.less';

export interface HeaderProps {
  title?: string;
  onBack?: Function;
  className?: string;
  rightNode?: ReactNode;
  showLogo?: boolean;
  isShadow?: boolean;
  showClose?: boolean;
}

const Header: React.FC<HeaderProps> = (props) => {
  const goBack = () => {
    history.back();
  };
  const { title, showLogo, rightNode, onBack, isShadow, showClose, className } = props;
  return (
    <div className={classNames(isShadow ? styles.headerShadow : styles.header, className)}>
      <div className={styles.iconItem}>
        {!showClose && <BackIcon onClick={() => (onBack ? onBack() : goBack())}></BackIcon>}
        {showClose && <CancelIcon onClick={() => (onBack ? onBack() : goBack())}></CancelIcon>}
      </div>
      {!showLogo && <div className={styles.title}>{title}</div>}
      {showLogo && (
        <div className={styles.homeTitle}>
          <HomeLogos></HomeLogos>
        </div>
      )}
      {rightNode && <div className={styles.iconItemRight}>{rightNode}</div>}
    </div>
  );
};
export default Header;
