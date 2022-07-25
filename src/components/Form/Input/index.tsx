import React from 'react';
import { Input as AntdInput } from 'antd-mobile';
import styles from './index.less';
import classNames from 'classnames';

type NativeInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type InputProps = Pick<
  NativeInputProps,
  | 'maxLength'
  | 'minLength'
  | 'autoComplete'
  | 'pattern'
  | 'inputMode'
  | 'type'
  | 'onFocus'
  | 'onBlur'
  | 'autoCapitalize'
  | 'autoCorrect'
  | 'onKeyDown'
  | 'onKeyUp'
  | 'onCompositionStart'
  | 'onCompositionEnd'
> & {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  clearable?: boolean;
  onClear?: () => void;
  id?: string;
  onEnterPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  min?: number;
  max?: number;
  prefix?: string;
};

const Input: React.FC<InputProps> = (props) => {
  const classnames = classNames({
    [styles.input]: true,
    [styles.disabled]: props.disabled,
  });
  return (
    <div className={styles.inputBody}>
      {props.prefix && <span className={styles.prefix}>{props.prefix}</span>}
      <AntdInput {...props} className={classnames} />
    </div>
  );
};

export default Input;
