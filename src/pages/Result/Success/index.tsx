import React from 'react';
// import styles from './index.less';
import Result from '@/components/Result';

const Success: React.FC<{}> = () => {
  return (
    <Result status="success" title="Yeah!" description="Your Payment PIN has been created successfully.">
      <Result.TransactionItem id="2221997" amount={20.00} datetime={new Date()}/>
    </Result>
  );
};

export default Success;
