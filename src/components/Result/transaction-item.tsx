import React from 'react';
import dayjs from 'dayjs';
import styles from './index.less';

export interface ItemProps {
  id: string;
  datetime: Date;
  amount: number;
  description?: string;
}

export const Item: React.FC<ItemProps> = (props) => {
  const { id, amount, datetime, description } = props;
  return (
    <div className={styles.transaction}>
      <div className={styles.id}>{`Transaction ID ${id}`}</div>
      <div>{dayjs(datetime).format('DD MMM YYYY, h:mm A')}</div>
      <div className={styles.amount}>
        <span className={styles.field}>Amount</span>
        <span>{`RM ${amount}`}</span>
      </div>
      {description && <div className={styles.description}>{description}</div>}
    </div>
  );
};

export default Item;
