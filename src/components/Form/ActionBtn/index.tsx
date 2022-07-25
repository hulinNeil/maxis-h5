import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './index.less';

interface Option {
  label: string;
  value: any;
}

interface ActionBtnType {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  options: Array<Option>;
  onChange?: (data: Option) => void;
}

const ActionBtn: React.FC<ActionBtnType> = ({ label, options, onChange, className, style }) => {
  const [actionIndex, setIndex] = useState<null | number>(null);

  const handleClick = (item: Option, index: number) => {
    if (index !== actionIndex) {
      setIndex(index);
      onChange && onChange(item);
    }
  };

  return (
    <div className={classNames(styles.actionBtn, className)} style={style}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.options}>
        {options.map((item, index) => (
          <div key={`action-btn-${index}`} className={index === actionIndex ? styles.action : ''} onClick={() => handleClick(item, index)}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionBtn;
