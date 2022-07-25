import React, { useState } from 'react';
import { NumberKeyboard } from 'antd-mobile';
import styles from './index.less';
import classNames from 'classnames';

export type AmountInputProps = {
  disabled?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
};

const defaultProps = {
  defaultValue: '',
};

const AmountInput: React.FC<AmountInputProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const [value, setValue] = useState(props.value || props.defaultValue);
  const [visible, setVisible] = useState(false);

  const classnames = classNames(styles.input, {
    [styles.disabled]: props.disabled,
  });

  const openKeyboard = () => {
    if (props.disabled) {
      return;
    }
    setVisible(true);
  };

  const closeKeyboard = () => {
    setVisible(false);
  };

  const actions = {
    onClose: () => {
      setVisible(false);
    },
    onInput: (key: string) => {
      if (key === '.' && value.includes('.')) {
        return;
      }
      const val = value + key;
      setValue(val);
      props.onChange?.(val);
    },
    onDelete: () => {
      const val = value.slice(0, value.length - 1);
      setValue(val);
      props.onChange?.(val);
    },
  };

  return (
    <div className={styles.amountInput}>
      <span tabIndex={0} onClick={openKeyboard} onBlur={closeKeyboard} className={classnames}>
        {value || '0.00'}
      </span>
      <NumberKeyboard visible={visible} customKey="." onClose={actions.onClose} onInput={actions.onInput} onDelete={actions.onDelete} />
    </div>
  );
};

export default AmountInput;
