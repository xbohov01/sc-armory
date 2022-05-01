/* eslint-disable class-methods-use-this */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { orderBy, uniq } from "lodash";

import shopServiceClient from "../client/shopServiceClient";
import SaleLocationsFetchException from "../exceptions/SaleLocationsFetchException";
import { ListKey, LocatedItem } from "../types/types";

import type { KeyValue } from '~type/select'

class ShoppingListGenerator {
  async GetShoppingList(
    loadout: string[]
  ): Promise<[number, KeyValue<ListKey, LocatedItem[]>[]]> {
    const list: KeyValue<ListKey, LocatedItem[]>[] = [];
    const locatedItems: LocatedItem[] = [];
    let price = 0;

    const promises = loadout.map((gear) =>
      shopServiceClient.GetSaleLocations(gear)
    );
    const results = await Promise.all(promises);

    results.forEach((result) => {
      if (!result.success && result.message !== "Not sold") {
        throw new SaleLocationsFetchException(result.message);
      }

      price += result.data.length > 0 ? result.data[0].price : 0;

      locatedItems.push(
        ...result.data.map(
          (saleLocation): LocatedItem => ({
            item: saleLocation.itemName,
            storeId: saleLocation.saleLocationId,
            storeName: saleLocation.saleLocationName,
            storeLocation: `${saleLocation.saleLocationName} - ${saleLocation.saleLocationChain}`,
            storeChain: saleLocation.saleLocationChain,
            price: saleLocation.price.toString(),
            isBought: false,
          })
        )
      );
    });

    locatedItems.forEach((entry) => {
      if (!list.some((e) => e.key.id === entry.storeId)) {
        list.push({
          key: {
            id: entry.storeId,
            name: entry.storeName,
            chain: entry.storeChain,
          },
          value: [entry],
        });
      } else {
        list.find((e) => e.key.id === entry.storeId)?.value.push(entry);
      }
    });

    return [price, orderBy(list, (i) => i.value.length).reverse()];
  }

  async GetLocationsPerItem(
    loadout: string[]
  ): Promise<{ locations: string[]; list: KeyValue<string, LocatedItem[]>[] }> {
    const list: KeyValue<string, LocatedItem[]>[] = [];
    let locations: string[] = [];

    for (const gear of loadout) {
      const result = await shopServiceClient.GetSaleLocations(gear);
      const locatedItems: LocatedItem[] = [];

      if (!result.success && result.message !== "Not sold") {
        throw new SaleLocationsFetchException(result.message);
      }

      const saleLocations = result.data;
      locations = saleLocations.map(
        (l) => l.saleLocationChain.split(" - ").reverse()[0]
      );

      locatedItems.push(
        ...saleLocations.map((saleLocation) => ({
          item: saleLocation.itemName,
          storeId: saleLocation.saleLocationId,
          storeName: saleLocation.saleLocationName,
          storeLocation: `${saleLocation.saleLocationName} - ${saleLocation.saleLocationChain}`,
          storeChain: saleLocation.saleLocationChain,
          price: saleLocation.price.toString(),
          isBought: false,
        }))
      );

      list.push({
        key: gear,
        value: locatedItems,
      });
    }

    locations = uniq(locations);

    return { locations, list };
  }
}

export default new ShoppingListGenerator();
