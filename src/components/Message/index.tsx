import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from '@react-spring/web';
import style from './index.less';
import classNames from 'classnames';

enum InfoType {
  error = 1,
  info = 2,
}

interface MessageType {
  onClose?: () => void;
  title?: string;
  content?: string;
  duration?: number; // second
  icon?: React.ReactNode | string;
  infoType?: InfoType;
}

const Message: React.FC<MessageType> = ({ title, content, icon, duration = 3, onClose, infoType = InfoType.error }) => {
  const [visible, setVisible] = useState(true);
  const styles = useSpring({
    to: { opacity: visible ? 1 : 0 },
    from: { opacity: 0 },
    onRest() {
      if (!visible) {
        onClose?.();
      }
    },
  });
  useEffect(() => {
    const id = setTimeout(() => {
      setVisible(false);
    }, duration * 1000);
    return () => {
      clearTimeout(id);
    };
  }, []);
  const wrapClassNames = classNames({
    [style.wrap]: true,
    [style.info]: infoType === InfoType.info,
  });
  return (
    <animated.div style={styles}>
      <div
        className={wrapClassNames}
        onClick={() => {
          setVisible(false);
        }}
      >
        {icon && <span className={style.icon}>{icon}</span>}
        <div>
          <div className={style.title}>{title}</div>
          <div className={style.message}>{content} </div>
        </div>
      </div>
    </animated.div>
  );
};

const ShowMessage = (params: MessageType) => {
  console.log(params);
  const mountNode = document.createElement('div');
  mountNode.id = 'k-message';
  mountNode.style.position = 'fixed';
  mountNode.style.zIndex = '2022';
  mountNode.style.top = '0';
  mountNode.style.left = '0';
  document.body.appendChild(mountNode);
  const onClose = () => {
    params?.onClose && params?.onClose();
    const result = ReactDOM.unmountComponentAtNode(mountNode);
    if (result && mountNode.parentNode) {
      mountNode.parentNode.removeChild(mountNode);
    }
  };
  ReactDOM.render(<Message {...params} onClose={onClose}></Message>, mountNode);
};
export default {
  info: (params: Omit<MessageType, 'infoType'>) => {
    ShowMessage({ ...params, infoType: InfoType.info });
  },
  error: (params: Omit<MessageType, 'infoType'>) => {
    ShowMessage({ ...params, infoType: InfoType.error });
  },
};
