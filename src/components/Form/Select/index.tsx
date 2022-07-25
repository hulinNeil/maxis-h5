import classNames from 'classnames';
import React from 'react';
import styles from './index.less';

interface SelectType {
  disable?: boolean;
  value?: string;
  placeholder?: string;
  onClick: () => void;
}

const Select: React.FC<SelectType> = ({ disable = false, value, onClick, placeholder }) => {
  const classnames = classNames({
    [styles.wrap]: true,
    [styles.disable]: disable,
  });
  return (
    <div className={classnames} onClick={onClick}>
      <div className={styles.content}>{value || placeholder || 'Please select'}</div>
      <span className={styles.arrow}></span>
    </div>
  );
};

export default Select;
