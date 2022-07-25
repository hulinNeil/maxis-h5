import React from 'react';
import styles from './index.less';
import Icon from '@ant-design/icons';
import { IconBaseProps } from './result';
import { Toast } from 'antd-mobile';
import classNames from 'classnames';
import copyTextToClipboard from '../utils/copyTextToClipboard';

import CopySvg from '@/assets/svg/copy.svg';

const CopyIcon: React.FC<IconBaseProps> = (props) => <Icon component={CopySvg} {...props} />;

export interface ItemProps {
  className?: string;
  fields: Array<{
    name: string;
    value: string;
  }>;
}

const copy = async (content: string) => {
  await copyTextToClipboard(content);
  Toast.show('copy successed');
};

export const Item: React.FC<ItemProps> = (props) => {
  const { fields, className } = props;
  return (
    <div className={classNames(styles.fields, className)}>
      {fields.map((item, index) => {
        return (
          <div key={index}>
            {`${item.name} : ${item.value}`}
            <CopyIcon className={styles.icon} onClick={() => copy(item.value)} />
          </div>
        );
      })}
    </div>
  );
};

export default Item;
