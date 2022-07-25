import React, { useState } from 'react';
import { SpinLoading, Button, Space, Form } from 'antd-mobile';
import styles from './index.less';
import { useHistory } from 'dva';
import Icon from '@ant-design/icons';
import Arrow from './test.svg';
import PullRefresh from '@/components/Page/PullRefresh';
import Dialog from '@/components/Dialog';
import { CenterIcon } from '@/components/Icons';
import Message from '@/components/Message';
import Result from '@/components/Result';
import PickerList from '@/components/PickerList';
import FormInputSelect from '@/components/Form/InputSelect';
import TransactionList from '@/components/List/TransactionList';
import ImageList from '@/components/List/ImageList';
import Page from '@/components/Page';
import ActionBtn from '@/components/Form/ActionBtn';
import Modal from '@/components/Modal';
import Input from '@/components/Form/Input';
import Selector from '@/components/Form/Selector';
import TextArea from '@/components/Form/TextArea';
import RadioList from '@/components/RadioList';
import AmountInput from '@/components/Form/AmountInput';
import Description from '@/components/Description';

const Home = () => {
  const history = useHistory();
  const [showPicker, setShowPicker] = useState(false);
  const [refresh] = PullRefresh.useRefresh();

  // 测试form
  const [form] = Form.useForm();

  const onPullDownRefresh = () => {
    setTimeout(() => {
      refresh.stopPullDownRefresh();
    }, 3000);
  };
  const edit = () => {
    return (
      <div>
        <CenterIcon onClick={() => console.log('this is home')}></CenterIcon>
      </div>
    );
  };

  const edit1 = (e: any) => {
    return (
      <div>
        <CenterIcon onClick={() => console.log('id是', e)}></CenterIcon>
      </div>
    );
  };

  const log = () => {
    console.log('this is log');
  };

  return (
    <Page onBack={log} showClose showLogo rightNode={edit()} isShadow>
      <PullRefresh refresh={refresh} onPullDownRefresh={onPullDownRefresh} />
      <SpinLoading color="primary" />
      <div className={styles.title}>Home</div>
      <Space wrap={true}>
        <Button color="primary" onClick={() => history.push('/result/success')}>
          Success Page
        </Button>
        <Button color="success" onClick={() => history.push('/result/fail')}>
          Fail Page
        </Button>
        <Button color="danger" onClick={() => history.push('/result/error')}>
          Error Page
        </Button>
        <Button
          color="primary"
          onClick={() => {
            Message.info({ content: 'Your auto top-up of RM10.00 is successful.', title: 'Auto Top-up Successful' });
          }}
        >
          Message Info
        </Button>
        <Button
          color="danger"
          onClick={() => {
            Message.error({ content: 'Confirmed wallet PIN is not matched with the entered wallet PIN' });
          }}
        >
          Message Error
        </Button>
        <Icon component={Arrow} />
      </Space>
      <Space className={styles.link} wrap>
        <Button color="primary" onClick={() => history.push('/createPin')}>
          Pin Page
        </Button>
        <Button color="success" onClick={() => history.push('/enterOtp')}>
          EnterOtp Page
        </Button>
        <Button color="success" onClick={() => setShowPicker(true)}>
          Show Picker
        </Button>
        <Button
          color="primary"
          onClick={() => {
            const showExtend = Math.random() > 0.5;
            console.log(showExtend);
            Dialog.show({
              content: 'To continue, turn on device location, which uses Google’s location service.',
              extend: showExtend && (
                <Result.FieldsItem
                  className={styles.result}
                  fields={[
                    { name: 'Maxis/Hotlink user', value: 'Dial 123' },
                    { name: 'Other mobile lines user', value: 'Dial 1-800-82-1123' },
                  ]}
                />
              ),
              onOk: () => {
                console.log('click Ok');
              },
              onCancel: () => {
                console.log('click Cancel');
              },
            });
          }}
        >
          Show Dialog
        </Button>
        <Button
          color="primary"
          onClick={() => {
            Modal.show({
              title: 'Test',
              content: 'To continue, turn on device location, which uses Google’s location service.',
              onOk: () => {
                console.log('click Ok');
              },
              onCancel: () => {
                console.log('click Cancel');
              },
            });
          }}
        >
          Show Modal
        </Button>
        <Button color="success" onClick={() => console.log(form.getFieldsValue())}>
          Test Form
        </Button>
      </Space>
      <PickerList
        visible={showPicker}
        option={Array.from({ length: 20 }).map((_, index) => ({ value: `成都${index}`, label: `成都${index}` }))}
        onChange={(data) => {
          console.log(data);
        }}
        onClose={() => setShowPicker(false)}
      ></PickerList>
      <Form form={form}>
        <Form.Header>Form Select</Form.Header>
        <FormInputSelect
          name="aa"
          label="City"
          option={Array.from({ length: 20 }).map((_, index) => ({ value: `成都${index}`, label: `成都${index}` }))}
        ></FormInputSelect>
        <Form.Item name="bb" label="Username (Required)">
          <Input />
        </Form.Item>
        <Form.Item name="cc" label="Gender (Required)">
          <Selector
            options={[
              {
                label: 'Male',
                value: '1',
              },
              {
                label: 'Female',
                value: '2',
              },
            ]}
          />
        </Form.Item>
        <Form.Item name="dd" label="Address Details (Required)">
          <TextArea />
        </Form.Item>
        <Form.Item name="ee" label="Amount">
          <AmountInput />
        </Form.Item>
      </Form>
      <ActionBtn
        label="Top up this amount"
        className={styles.padding}
        options={[
          { label: 'RM 20', value: 200 },
          { label: 'RM 50', value: 500 },
          { label: 'RM 100', value: 1000 },
        ]}
        onChange={(e) => console.log(e)}
      />
      <TransactionList
        data={[
          { name: 'Starbucks', amount: -2000, type: 'Payment', time: '2020-01-03 17:30' },
          { name: 'Darren Loh', amount: 2000, type: 'Top up', time: '2020-01-03 17:30' },
          { name: 'Clair Wood', amount: -2000, type: 'Send', time: '2020-01-03 17:30' },
        ]}
      />
      <ImageList
        rightNode={edit1}
        listTitle="Electricity"
        infoName="TNB"
        describtion="Account No."
        data={[
          {
            id: 1,
            code: '68502',
            imgUrl:
              'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
          },
          {
            id: 2,
            code: '68502',
            imgUrl:
              'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
          },
        ]}
      />
      <ImageList
        // rightNode={edit1}
        infoName="Hello"
        listTitle="Water"
        data={[
          {
            id: 3,
            code: '6850212',
            imgUrl:
              'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
          },
          {
            id: 4,
            code: '6850233',
            imgUrl:
              'https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=60',
          },
        ]}
      />
      <RadioList
        title="Select Document Type"
        list={[
          {
            label: 'Male',
            value: '1',
          },
          {
            label: 'Female',
            value: '2',
          },
        ]}
      />
      <Description title="Summary">
        <Description.FieldsItem name="Merchant" value="Starbucks"></Description.FieldsItem>
        <Description.FieldsItem name="Merchant" value="Starbucks"></Description.FieldsItem>
      </Description>
    </Page>
  );
};

export default Home;
