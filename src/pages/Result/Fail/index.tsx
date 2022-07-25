import React from 'react';
import Result from '@/components/Result';

const Fail = () => {
  return (
    <Result
      status="error"
      title="Oh No!"
      description="Unfortunately we have an issue with your payment, please try again."
    >
      <Result.FieldsItem
        fields={[
          { name: 'Maxis/Hotlink user', value: 'Dial 123' },
          { name: 'Other mobile lines user', value: 'Dial 1-800-82-1123' },
        ]}
      />
    </Result>
  ); 
};

export default Fail;
