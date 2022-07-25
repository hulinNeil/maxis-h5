import { toThousands } from '@/utils/tools';
import dayjs from 'dayjs';
import React from 'react';
import styles from './index.less';

interface ListItem {
  name: string;
  type: string;
  amount: number;
  time: string;
}

interface ListProps {
  unsigned?: boolean;
  data: Array<ListItem>;
  onClick?: (item: ListItem) => void;
}

const TransactionList: React.FC<ListProps> = ({ data, unsigned, onClick }) => {
  return (
    <div className={styles.list}>
      {data.map((item, index) => (
        <div className={styles.item} key={`transaction-${index}`} onClick={() => onClick && onClick(item)}>
          <div className={styles.main}>
            <span>{item.name}</span>
            {unsigned ? (
              <span>RM {toThousands(Math.abs(item.amount / 100))}</span>
            ) : (
              <span className={item.amount > 0 ? styles.green : ''}>
                {item.amount > 0 ? '+' : '-'}RM {toThousands(Math.abs(item.amount / 100))}
              </span>
            )}
          </div>
          <div className={styles.info}>
            <span>{item.type}</span>
            <span>{dayjs(item.time).format('DD MMM YYYY h:mm A')}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
