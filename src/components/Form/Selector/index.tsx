import React, { ReactNode, useState } from 'react';
import styles from './index.less';
import classNames from 'classnames';

type SelectorValue = string | number;

export interface SelectorOption<V> {
  label: ReactNode;
  value: V;
  disabled?: boolean;
}

export type SelectorProps<V> = {
  options: SelectorOption<V>[];
  multiple?: boolean;
  disabled?: boolean;
  defaultValue?: V[];
  value?: V[];
  onChange?: (v: V[], extend: { items: SelectorOption<V>[] }) => void;
};

const defaultProps = {
  multiple: false,
  defaultValue: [],
};

const Selector = <V extends SelectorValue>(p: SelectorProps<V>) => {
  const props = Object.assign({}, defaultProps, p);
  const [value, setValue] = useState(props.value || props.defaultValue);

  const onChange = (val: V[]) => {
    const extend = {
      get items() {
        return props.options.filter((option) => val.includes(option.value));
      },
    };
    props.onChange?.(val, extend);
  };

  const items = props.options.map((option) => {
    const active = (value || []).includes(option.value);
    const disabled = option.disabled || props.disabled;
    const classnames = classNames(styles.selectItem, {
      [styles.active]: active,
    });

    return (
      <div
        className={classnames}
        key={option.value}
        onClick={() => {
          if (disabled) {
            return;
          }
          if (props.multiple) {
            const val = active ? value.filter((v) => v !== option.value) : [...value, option.value];
            setValue(val);
            onChange(val);
          } else {
            const val = active ? [] : [option.value];
            setValue(val);
            onChange(val);
          }
        }}
      >
        {option.label}
      </div>
    );
  });

  return <div className={styles.selector}>{items}</div>;
};

export default Selector;
