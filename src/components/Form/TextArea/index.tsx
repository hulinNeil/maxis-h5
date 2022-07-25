import React, { ReactNode } from 'react';
import { TextArea as AntdTextArea } from 'antd-mobile';
import styles from './index.less';
import classNames from 'classnames';

export type TextAreaProps = Pick<
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
  'autoComplete' | 'disabled' | 'readOnly' | 'onFocus' | 'onBlur' | 'onCompositionStart' | 'onCompositionEnd'
> & {
  onChange?: (val: string) => void;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean | ((length: number, maxLength?: number) => ReactNode);
  autoSize?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
  id?: string;
};

const TextArea: React.FC<TextAreaProps> = (props) => {
  const classnames = classNames({
    [styles.textArea]: true,
    [styles.disabled]: props.disabled,
  });
  return <AntdTextArea {...props} className={classnames} />;
};

export default TextArea;
