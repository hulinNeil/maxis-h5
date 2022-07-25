import { useSpring, animated } from '@react-spring/web';
import React, { FC, ReactNode, useState, useRef } from 'react';
import useLockScroll from '../utils/use-lock-scroll';
import styles from './dialog.less';

export interface DialogProps {
  visible?: boolean;
  showCancel?: boolean;
  content?: ReactNode;
  extend?: ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: (params?: any) => Promise<boolean> | boolean | void; // return true close Modal; false: Loading; other: No operation
  onCancel?: () => void;
  onClose?: () => void;
  afterClose?: () => void;
}

const defaultProps = {
  visible: false,
  showCancel: true,
  okText: 'Ok',
  cancelText: 'Cancel',
};

export const Dialog: FC<DialogProps> = (p) => {
  const props = Object.assign({}, defaultProps, p);
  const [active, setActive] = useState(props.visible);
  const ref = useRef<HTMLDivElement>(null);
  useLockScroll(ref);

  const handleCancel = () => {
    props.onCancel?.();
    props.onClose?.();
  };

  const handleOk = () => {
    props.onOk?.();
    props.onClose?.();
  };

  const style = useSpring({
    scale: props.visible ? 1 : 0.8,
    opacity: props.visible ? 1 : 0,
    z: 0,
    config: {
      mass: 1,
      tension: 200,
      friction: 30,
      clamp: true,
    },
    onStart: () => {
      setActive(true);
    },
    onRest: () => {
      setActive(props.visible);
      if (!props.visible) {
        props.afterClose?.();
      }
    },
  });

  return (
    <div className={styles.dialog} style={{ display: active ? 'unset' : 'none' }}>
      <animated.div className={styles.dialogMask} style={{ opacity: style.opacity }} ref={ref} />
      <div className={styles.dialogWrap} style={{ display: active ? 'unset' : 'none' }}>
        <animated.div style={{ ...style }} onClick={(e) => e.stopPropagation()} className={styles.dialogMain}>
          <div className={styles.body}>
            <div>{props.content}</div>
            {props.extend}
          </div>
          <div className={styles.footer}>
            {props.showCancel && (
              <div className={styles.cancel} onClick={handleCancel}>
                {props.cancelText}
              </div>
            )}
            <div className={styles.ok} onClick={handleOk}>
              {props.okText}
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};
