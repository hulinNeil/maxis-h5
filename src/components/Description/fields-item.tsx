import React, { ReactNode } from 'react';
import styles from './index.less';

export type ItemProps = {
  name: string;
  value: string | ReactNode;
};

const FieldsItem: React.FC<ItemProps> = (p) => {
  return (
    <div className={styles.fields}>
      <div className={styles.name}>{p.name}</div>
      <div className={styles.value}>{p.value}</div>
    </div>
  );
};

export default FieldsItem;
