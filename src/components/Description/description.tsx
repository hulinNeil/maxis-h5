import React from 'react';
import styles from './index.less';

export type DescriptionProps = {
  title?: string;
};

const Description: React.FC<DescriptionProps> = (p) => {
  const { title, children } = p;
  return (
    <div className={styles.description}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Description;
