import { RetailProductVM } from "../client/viewModels/RetailProductVM";
import { WeaponVM } from "../client/viewModels/WeaponVM";

import type { SelectOption } from "~type/select";

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
  itemName: string;
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

export type RangeInfoProps = {
  namedValues: { name: string; value: number }[];
  unit: string;
  breakdownText: string;
  label: string;
};

export type WeaponInfoDisplayProps = {
  weapon: WeaponVM;
};
