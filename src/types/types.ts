import { RetailProductVM } from "../client/viewModels/RetailProductVM";

export type SelectOption = {
  value: string;
  label: string;
  type: string;
};

export type Loadout = {
  name: string;
  helmet: RetailProductVM;
  arms: RetailProductVM;
  core: RetailProductVM;
  legs: RetailProductVM;
  sidearm: RetailProductVM;
  primary: RetailProductVM;
  secondary: RetailProductVM;
};

export type KeyValue<K, V> = {
  key: K;
  value: V;
};

export type ListKey = {
  id: number;
  name: string;
  chain: string;
};

export type LocatedItem = {
  item: string;
  storeId: number;
  storeName: string;
  storeLocation: string;
  storeChain: string;
  price: string;
  isBought: boolean;
};

export type SaleLocationVM = {
  itemId: number;
  price: number;
  saleLocationChain: string;
  saleLocationId: number;
  saleLocationName: string;
};

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

export type WeaponAttachmentSlot = {
  MaxSize: number;
  MinSize: number;
  Type: string;
  Attachments: SelectOption[];
};

export type WeaponAttachment = {
  Name: string;
  Size: number;
  Type: string;
};

export type NameReference = {
  name: string;
  reference: string;
};

export type FormatProps = {
  value: string;
  label: string;
  type: string;
};
