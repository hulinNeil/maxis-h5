import React from 'react';
import Icon from '@ant-design/icons';

import Log from '@/assets/svg/loginLog.svg';
import back from '@/assets/svg/back.svg';
import cancel from '@/assets/svg/cancel.svg';
import center from '@/assets/svg/center.svg';
import loginLogo from '@/assets/svg/loginLogo.svg';

export interface IconBaseProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: any;
}

export const LoginLog: React.FC<IconBaseProps> = (params) => {
  return <Icon component={Log} {...params} />;
};
export const BackIcon: React.FC<IconBaseProps> = (params) => {
  return <Icon component={back} {...params} />;
};

export const CancelIcon: React.FC<IconBaseProps> = (params) => {
  return <Icon component={cancel} {...params} />;
};

export const CenterIcon: React.FC<IconBaseProps> = (params) => {
  return <Icon component={center} {...params} />;
};

export const HomeLogos: React.FC<IconBaseProps> = (params) => {
  return <Icon component={loginLogo} {...params} />;
};
