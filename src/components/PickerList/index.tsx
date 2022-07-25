import { CheckList, Popup } from 'antd-mobile';
import React from 'react';
import { CancelIcon } from '../Icons';
import styles from './index.less';

export interface PickerListType {
  visible?: boolean;
  value?: string[];
  option: Array<{ value: string; label: string }>;
  onChange?: (val: string[]) => void;
  onClose: () => void;
  title?: string;
}

const PickerList: React.FC<PickerListType> = ({ visible, option, value, onChange, onClose, title }) => {
  const close = () => {
    onClose();
  };
  const handleChange = (value: string[]) => {
    onChange?.(value);
    close();
  };
  return (
    <Popup visible={visible} onMaskClick={close}>
      <div className={styles.header}>
        <span>{title}</span>
        <CancelIcon style={{ color: '#000', fontSize: '20px' }} onClick={close}></CancelIcon>
      </div>
      <div className={styles.list}>
        <CheckList defaultValue={value} onChange={handleChange}>
          {option.map((item) => (
            <CheckList.Item value={item.value} key={item.value}>
              {item.label}
            </CheckList.Item>
          ))}
        </CheckList>
      </div>
    </Popup>
  );
};

export default PickerList;
