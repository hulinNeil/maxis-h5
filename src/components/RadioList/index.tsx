import React, { ReactNode } from 'react';
import { Radio, List, Image } from 'antd-mobile';
import styles from './index.less';

type RadioValue = string | number;

export interface RadioOption {
  label: ReactNode;
  value: RadioValue;
  disabled?: boolean;
  image?: string;
  desc?: ReactNode;
  extra?: ReactNode;
}

export interface RadioListProps {
  list: Array<RadioOption>;
  title?: string;
  defaultValue?: RadioValue;
  disabled?: boolean;
  value?: RadioValue;
  onChange?: (value: RadioValue) => void;
}

const RadioList: React.FC<RadioListProps> = (props: RadioListProps) => {
  return (
    <Radio.Group {...props}>
      <div className={styles.title}>{props.title}</div>
      <List mode="card" className={styles.radioList}>
        {props.list.map((item) => (
          <List.Item key={item.value} className={styles.item}>
            <Radio
              icon={(checked) =>
                checked ? (
                  <span className={styles.radioButton}>
                    <span className={styles.checked}></span>
                  </span>
                ) : (
                  <span className={styles.radioButton} />
                )
              }
              disabled={item.disabled}
              value={item.value}
            >
              <div className={styles.radioContent}>
                <div className={styles.main}>
                  <div>
                    {item.image && <Image className={styles.img} src={item.image} fit="cover" />}
                    {item.label}
                  </div>
                  {item.desc && <div className={styles.desc}>{item.desc}</div>}
                </div>
                {item.extra && <div className={styles.extra}>{item.extra}</div>}
              </div>
            </Radio>
          </List.Item>
        ))}
      </List>
    </Radio.Group>
  );
};

export default RadioList;
