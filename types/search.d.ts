export type LocatedItem = {
  item: string;
  storeId: number;
  storeName: string;
  storeLocation: string;
  storeChain: string;
  price: string;
  isBought: boolean;
};

export type ListKey = {
  id: number;
  name: string;
  chain: string;
};

export type SaleLocation = {
  itemId: number;
  itemName: string;
  price: number;
  saleLocationChain: string;
  saleLocationId: number;
  saleLocationName: string;
};

type GroupedSaleLocation = {
  chain: string;
  items: LocatedItem[];
};

type ItemPrices = {
  item: string;
  prices: number[];
  low: number;
  high: number;
};
