import React, { useState, forwardRef, useImperativeHandle } from 'react';
// import { useLocation, useHistory } from 'dva';
import classNames from 'classnames';
import { BackIcon } from '@/components/Icons';
import styles from './index.less';
import { LoadingMask } from '../Loading';

const cricleArr = [1, 2, 3, 4, 5, 6];
const telNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const loading = false;
const WalletPIN: React.FC<{ title: string; status: number; ref: any }> = forwardRef((props: any, ref: any) => {
  console.log(props, ref);
  const [Pin, setPin] = useState<Array<any>>([]);
  // const [loading, setLoading] = useState(true);
  //   const { state }: any = useLocation();
  //   const history = useHistory();
  const vlog = () => {
    console.log('1212');
  };

  useImperativeHandle(ref, () => ({
    vlog,
  }));

  const getNumber = async (item: number) => {
    if (Pin.length < 6) {
      await setPin(() => {
        Pin.push(item);
        return [...Pin];
      });
      if (Pin.length === 6) {
        const _pin = {
          pin1: Pin[0],
          pin2: Pin[1],
          pin3: Pin[2],
          pin4: Pin[3],
          pin5: Pin[4],
          pin6: Pin[5],
        };
        const value = Object.values(_pin).join('');
        console.log(value);
        // setLoading(true);
        // const res = await checkPin(state.value, order_ref, value, transaction_no);
        // const data = res.data;
        // console.log(res.data);
        // setLoading(false);
        // if (res.code === 0) {
        //   history.push({
        //     state: { data: data, mobile: state.value },
        //     pathname: '/receipt_success',
        //   });
        // }
      }
    }
    console.log('pin', Pin);
  };

  const reducePin = async () => {
    if (Pin.length > 0) {
      await setPin(() => {
        Pin.pop();
        return [...Pin];
      });
    }
    console.log(Pin);
  };


  return (
    <div className={styles.walletPinWrapper}>
      {loading && <LoadingMask />}
      <div className={styles.container}>
        <div className={styles.headWrapper}>
          <div className={styles.title}>{props.title} Wallet PIN</div>
          <div className={styles.ellipses}>
            {cricleArr.map((item) => {
              return <div key={item} className={classNames(item <= Pin.length ? styles.active : styles.cricleItem)}></div>;
            })}
          </div>
        </div>
        <div className={styles.contentWrapper}>
          {telNum.map((item) => {
            return (
              <div key={item} className={styles.telItem} onClick={() => getNumber(item)}>
                {item}
              </div>
            );
          })}
          <div className={styles.reduceNum}>
            <BackIcon onClick={() => reducePin()}></BackIcon>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WalletPIN;
