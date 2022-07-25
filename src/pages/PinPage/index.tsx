import Page from '@/components/Page';
import WalletPIN from '@/components/WalletPin';
import React, { useRef } from 'react';

const PinPage = () => {
  const logRef = useRef<any>({});

  console.log(logRef);

  return (
    <Page>
      <WalletPIN title="Create" status={0} ref={logRef} />
    </Page>
  );
};
export default PinPage;
