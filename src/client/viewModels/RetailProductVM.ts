export class RetailProductVM {
  Id!: number;
  Uuid!: string;
  LocalizedName!: string;
  LocalizedDescription!: string;
  BasePrice!: number;
  Inventory!: number;
  MaxInventory!: number;
  SoldAt!: number[];
  BoughtAt!: number[];
  MaxDiscountPercentage!: number;
  MaxPremiumPercentage!: number;
  RetailType!: number;
}
