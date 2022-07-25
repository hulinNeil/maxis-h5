import { useSpring, animated } from '@react-spring/web';
import React, { FC, ReactNode, useState, useRef } from 'react';
import { Button, Image } from 'antd-mobile';
import useLockScroll from '../utils/use-lock-scroll';
import styles from './modal.less';

export interface ModalProps {
  image?: string;
  visible?: boolean;
  showCancel?: boolean;
  title?: ReactNode;
  content?: ReactNode;
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

export const Modal: FC<ModalProps> = (p) => {

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
    <div className={styles.modal} style={{ display: active ? 'unset' : 'none' }}>
      <animated.div className={styles.modalMask} style={{ opacity: style.opacity }} ref={ref}/>
      <div className={styles.modalWrap} style={{ display: active ? 'unset' : 'none' }}>
        <animated.div style={{ ...style }} onClick={(e) => e.stopPropagation()} className={styles.modalMain}>
          {props.title && (
            <div className={styles.title}>
              <div>{props.title}</div>
            </div>
          )}
          <div className={styles.body}>
            {props.image && <Image className={styles.img} src={props.image} fit="contain" />}
            <div>{props.content}</div>
          </div>
          <div className={styles.footer}>
            <Button block color="primary" onClick={handleOk}>
              {props.okText}
            </Button>
            {props.showCancel && (
              <div className={styles.cancel} onClick={handleCancel}>
                {props.cancelText}
              </div>
            )}
          </div>
        </animated.div>
      </div>
    </div>
  );
};
