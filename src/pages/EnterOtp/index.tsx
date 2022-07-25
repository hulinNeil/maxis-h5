import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'dva';
import styles from './index.less';
import { Form, Input, NumberKeyboard } from 'antd-mobile';
import classNames from 'classnames';
import Page from '@/components/Page';

const enterOtp = () => {
  const { state }: any = useLocation();
  const [form] = Form.useForm();
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [otpArr, setOtpArr] = useState<Array<any>>([]);
  const [disabledResend, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerInterval = useRef<{ timer: any; count: number }>({ timer: null, count: 0 });

  const getFocuse = () => {
    setShowKeyboard(true);
  };

  const startCountdown = () => {
    setResendDisabled(true);
    setTimer(6);
    timerInterval.current.count = 6;
    timerInterval.current.timer = setInterval(() => {
      const count = (timerInterval.current.count = timerInterval.current.count - 1);
      setTimer(count);
      if (timerInterval.current.count === 0) {
        clearInterval(timerInterval.current.timer);
        setResendDisabled(false);
      }
    }, 1000);
  };

  useEffect(() => {
    setOtpArr([]);
    getFocuse();
    startCountdown();
    return () => {
      if (timerInterval.current.timer) {
        clearInterval(timerInterval.current.timer);
      }
    };
  }, []);

  const actions = {
    onClose: () => {
      setShowKeyboard(false);
    },
    onInput: (key: string) => {
      const arr = [...otpArr];
      console.log(key);
      if (arr.length < 6) {
        arr.push(key);
      }
      form.setFieldsValue({ pin1: arr[0], pin2: arr[1], pin3: arr[2], pin4: arr[3], pin5: arr[4], pin6: arr[5] });
      setOtpArr(arr);
    },
    onDelete: () => {
      const arr1 = [...otpArr];
      if (arr1.length <= 6) {
        arr1.pop();
      }
      form.setFieldsValue({
        pin1: arr1[0] ? arr1[0] : '',
        pin2: arr1[1] ? arr1[1] : '',
        pin3: arr1[2] ? arr1[2] : '',
        pin4: arr1[3] ? arr1[3] : '',
        pin5: arr1[4] ? arr1[4] : '',
        pin6: arr1[5] ? arr1[5] : '',
      });
      setOtpArr(arr1);
      console.log('delete');
    },
  };

  const _onClickResend = () => {
    startCountdown();
    setResendDisabled(true);
  };

  console.log(otpArr);
  return (
    <Page title="Verify Phone Number" >
      <div className={styles.verifywrap}>
        <div className={styles.title}>Enter the OTP</div>
        <p className={styles.subTitle}>
          An OTP has been sent to &nbsp;
          <span>+ {state?.value}</span>
        </p>

        <Form layout="vertical" className={styles.form} form={form} onClick={getFocuse}>
          {Array.from({ length: 6 }).map((_, key) => (
            <Form.Item noStyle key={`pin${key + 1}`} name={`pin${key + 1}`}>
              <Input maxLength={1} readOnly className={styles.numberInput} onBlur={() => setShowKeyboard(false)} onFocus={getFocuse}></Input>
            </Form.Item>
          ))}
        </Form>
        <div className={classNames(styles.remark, disabledResend ? styles.reSendDisabled : '')} onClick={_onClickResend}>
          Resend code {timer ? `(${timer}s)` : null}
        </div>

        <NumberKeyboard visible={showKeyboard} onClose={actions.onClose} onInput={actions.onInput} onDelete={actions.onDelete} />
      </div>
    </Page>
  );
};
export default enterOtp;
