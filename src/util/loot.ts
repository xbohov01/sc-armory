import { groupBy } from "lodash";

import shopServiceClient from "~/client/shopServiceClient"
import { LootItem } from "~type/search";
import { KeyValue } from "~type/select";

export const getLootList = async (items:string[]) => {
  const promises = items.map(i => shopServiceClient.GetLootLocationProbabilities(i));

  const itemLocations = await Promise.all(promises);

  const grouped = groupBy(itemLocations.flat(), i => i.location);

  const itemsByLocation:KeyValue<string, LootItem[]>[] = [];
  
  for (const key of Object.keys(grouped)){
    itemsByLocation.push({key:key, value:grouped[key]});
  }

  return itemsByLocation;
}