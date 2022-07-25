export interface Options {
  label: string;
  value: string | number | boolean;
}

export const genderOptions: Options[] = [
  { label: 'Male', value: 1 },
  { label: 'Female', value: 2 },
];

export const idCardOptions: Options[] = [
  { label: 'IC', value: 1 },
  { label: 'Passport', value: 2 },
];

export const statusOptions: Options[] = [
  { label: 'Pending', value: 'pending' },
  { label: 'Rejected', value: 'rejected' },
  { label: 'Approved', value: 'approved' },
];
