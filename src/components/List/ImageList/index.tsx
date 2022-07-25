import React from 'react';
import styles from './index.less';

export interface DataType {
  code?: string;
  id: number;
  imgUrl?: string;
}

export interface BillersListProps {
  rightNode?: Function;
  data: Array<DataType>;
  listTitle?: string;
  infoName?: string;
  describtion?: string;
}

const BillersList: React.FC<BillersListProps> = (props) => {
  const { rightNode, data, listTitle, infoName, describtion } = props;
  return (
    <div className={styles.list}>
      {listTitle && <div className={styles.title}>{listTitle}</div>}
      {data.map((item) => {
        return (
          <div className={styles.itemWrapper} key={item.id}>
            <div className={styles.item}>
              <div className={styles.itemLeft}>
                <div className={styles.itemLeftImages}>
                  <img src={item.imgUrl} style={{ borderRadius: 4 }} />
                </div>
                <div className={styles.itemLeftDesc}>
                  {infoName && <div className={styles.itemLeftDescTitle}>{infoName}</div>}
                  {item.code && describtion &&<div className={styles.itemLeftDescCode}>{describtion}: {item.code}</div>}
                </div>
              </div>
              {rightNode && <div className={styles.itemRight}>{rightNode(item.id)}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default BillersList;
