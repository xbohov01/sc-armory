export type ResultObject<T> = {
  data: T[];
  success: boolean;
  message: string;
};

export type SingleResultObject<T> = {
  data: T;
  success: boolean;
  message: string;
};
