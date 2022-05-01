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

export type FPSGear = {
  id: number;
  reference: string;
  localizedName: string;
  localizedDescription: string;
  manufacturerCode: string;
  manufacturerName: string;
  type: string;
  size: number;
  inventoryOccupancy: number;
  tags: string;
};
