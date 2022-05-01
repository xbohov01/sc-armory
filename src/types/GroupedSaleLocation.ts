import type { LocatedItem } from "~type/search";

type GroupedSaleLocation = {
  chain: string;
  items: LocatedItem[];
};

export default GroupedSaleLocation;
