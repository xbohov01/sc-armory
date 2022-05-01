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
