export type RetailProduct = {
  Id: number;
  Uuid: string;
  LocalizedName: string;
  LocalizedDescription: string;
  BasePrice: number;
  Inventory: number;
  MaxInventory: number;
  SoldAt: number[];
  BoughtAt: number[];
  MaxDiscountPercentage: number;
  MaxPremiumPercentage: number;
  RetailType: number;
};

export type Loadout = {
  name: string;
  helmet: RetailProduct;
  arms: RetailProduct;
  core: RetailProduct;
  legs: RetailProduct;
  sidearm: RetailProduct;
  primary: RetailProduct;
  secondary: RetailProduct;
};
