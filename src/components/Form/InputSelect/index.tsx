import React, { useState } from 'react';
import { Form } from 'antd-mobile';
import PickerList, { PickerListType } from '@/components/PickerList';
import Select from '../Select';
interface InputSelectType {
  onChange?: () => void;
  value?: string;
  label: string;
}
const InputSelect: React.FC<InputSelectType & Pick<PickerListType, 'option'>> = ({ label, option, onChange, value }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Select value={value} onClick={() => setShow(true)}></Select>
      <PickerList onChange={onChange} visible={show} title={label} option={option} onClose={() => setShow(false)}></PickerList>
    </>
  );
};

interface FormInputSelectType {
  label: string;
  name: string;
}
const FormInputSelect: React.FC<FormInputSelectType & Pick<PickerListType, 'option'>> = ({ label, name, option }) => {
  return (
    <Form.Item label={label} name={name}>
      <InputSelect option={option} label={label}></InputSelect>
    </Form.Item>
  );
};

export default FormInputSelect;
