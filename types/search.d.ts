export type LocatedItem = {
  item: string;
  storeId: string;
  storeName: string;
  storeLocation: string;
  storeChain: string;
  price: string;
  isBought: boolean;
};

export type ListKey = {
  id: string;
  name: string;
  chain: string;
};

export type SaleLocation = {
  color: string;
  colorInvariantName: string;
  colorTag: string;
  id: number;
  itemName: string;
  itemType: string;
  price: number;
  storeLocationChain: string;
  storeName: string;
  storeNameId: string;
  storeType: string;
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

type LootItem = {
  id: number;
  item: string;
  location: string;
  container: string;
  probability: number;
}