export const validateMail = (_: any, value: string) => {
  let msg = '';
  const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  if (!value || !value.trim()) {
    msg = 'The email address is empty. Please enter your email address.';
  } else if (!reg.test(value)) {
    msg = 'Email is not valid.';
  }
  return msg ? Promise.reject(msg) : Promise.resolve();
};

export const validateEmpty = (field: string) => (_: any, value: string | number) => {
  let msg = '';
  if (value !== 0 && (!value || !String(value).trim())) {
    msg = `${field} should not be empty.`;
  }
  return msg ? Promise.reject(msg) : Promise.resolve();
};

export const validateMinLength = (field: string, length: number) => (_: any, value: string) => {
  let msg = '';
  if (value && length && value.length < length) {
    msg = `${field} at least ${length} characters.`;
  }
  return msg ? Promise.reject(msg) : Promise.resolve();
};

export const validatePhoneNumber = (_: any, value: string) => {
  let msg = '';
  const reg = /^\d*$/;
  if (!reg.test(value)) {
    msg = 'Phone number is invalid';
  }
  return msg ? Promise.reject(msg) : Promise.resolve();
};

export const validateMailNotEmpty = (_: any, value: string) => {
  let msg = '';
  const reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
  if (value && !reg.test(value)) {
    msg = 'Email is not valid.';
  }
  return msg ? Promise.reject(msg) : Promise.resolve();
};

export const validatePin = (_: any, value: string) => {
  let msg = '';
  if (!value || value.length !== 6) {
    msg = 'Pin number should be six digits.';
  }
  return msg ? Promise.reject(msg) : Promise.resolve();
};

export const validEnterPointAmount = (_: any, value: number) => {
  return !value || value < 1 ? Promise.reject('Invalid more than 0.') : Promise.resolve();
};
