export interface ResponseType {
  code: number;
  msg: string;
  data?: any;
}

export interface ResponseDataType<T> extends ResponseType {
  data: T;
}
