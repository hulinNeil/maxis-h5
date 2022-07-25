import React from 'react';
import { Button, Result as AntdResult, Space } from 'antd-mobile';
import Icon from '@ant-design/icons';
import styles from './index.less';

import SuccessSvg from '@/assets/svg/success.svg';
import InProgressSvg from '@/assets/svg/inProgress.svg';
import FailedSvg from '@/assets/svg/failed.svg';
import CloseSvg from '@/assets/svg/close.svg';

export interface IconBaseProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: any;
}

export interface ResultProps {
  status: 'success' | 'error' | 'waiting';
  title: string;
  description: string;
  okText?: string;
  okType?: 'success' | 'warning' | 'default' | 'primary' | 'danger' | undefined;
  cancelText?: string;
  cancelType?: 'success' | 'warning' | 'default' | 'primary' | 'danger' | undefined;
  onCancel?: (e: any) => void;
  onOk?: (e: any) => void;
  onClose?: (e: any) => void;
}

const SuccessIcon: React.FC<IconBaseProps> = (props) => <Icon component={SuccessSvg} {...props} />;
const InProgressIcon: React.FC<IconBaseProps> = (props) => <Icon component={InProgressSvg} {...props} />;
const FailedIcon: React.FC<IconBaseProps> = (props) => <Icon component={FailedSvg} {...props} />;
const CloseIcon: React.FC<IconBaseProps> = (props) => <Icon component={CloseSvg} {...props} />;

const statusMap = {
  success: <SuccessIcon className={styles.icon} />,
  waiting: <InProgressIcon className={styles.icon} />,
  error: <FailedIcon className={styles.icon} />,
};

const Result: React.FC<ResultProps> = (props) => {
  const { children, status, title, description, okText, okType, cancelText, cancelType, onCancel, onOk, onClose } = props;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContent}>
        <AntdResult icon={statusMap[status]} status={status} title={title} description={description} />
        <div className={styles.pageExtra}>{children}</div>
      </div>
      <Space className={styles.action}>
        {onCancel && <Button block color={cancelType || 'primary'} fill="outline" onClick={onCancel}>
          {cancelText || 'Cancel'}
        </Button>}
        <Button block color={okType || 'primary'} onClick={onOk}>
          {okText || 'OK'}
        </Button>
      </Space>

      {onClose && <CloseIcon className={styles.close} onClick={onClose}/>}
    </div>
  );
};

export default Result;
