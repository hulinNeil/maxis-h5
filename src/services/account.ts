import { post } from '@/utils/send';
import { ResponseType } from './common';

export interface LoginParamsType {
  account: string;
  password: string;
}

export interface UserInfoType extends ResponseType {
  data: {
    id: number;
    token: string;
    name: string;
    email: string;
    status: number; // 1 active 2 inactive
    mobile: string;
    type: number;
    designation: number;
    avatar: string;
    area_code: string;
    registration_date?: string;
    registration_number?: string;
    business_contact?: string;
    city?: string;
    country?: string;
    industry?: string;
    phone_number?: string;
    postcode?: string;
    state?: string;
    website?: string;
  };
}

export const userLogout = (): Promise<any> => {
  return post('/web/logout', {});
};
