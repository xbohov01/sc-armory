import { orderBy } from "lodash";
import { KeyValue, ListKey, LocatedItem } from "../types/types";
import client from "./client";


class ShoppingListGenerator {
  async GetShoppingList(loadout:string[]): Promise<[number, KeyValue<ListKey, LocatedItem[]>[]]>{
    let list:KeyValue<ListKey, LocatedItem[]>[] = [];
    let locatedItems:LocatedItem[] = [];
    let price = 0;

    for (let gear of loadout){
      let saleLocations = await client.GetSaleLocations(gear);

      price += saleLocations[0].price;

      for (let saleLocation of saleLocations){
        let lItem:LocatedItem = {
          item: gear,
          storeId: saleLocation.saleLocationId,
          storeName: saleLocation.saleLocationName,
          storeLocation: `${saleLocation.saleLocationName} - ${saleLocation.saleLocationChain}`,
          storeChain: saleLocation.saleLocationChain,
          price: saleLocation.price.toString(),
          isBought: false
        }
        locatedItems.push(lItem);
      }
    }

    for (let entry of locatedItems){
      
      if(!list.some(e => e.key.id === entry.storeId)){
        list.push({
          key:{
            id:entry.storeId,
            name: entry.storeName,
            chain: entry.storeChain
          }, 
          value: [entry]
        });
      } else {
        list.find(e => e.key.id === entry.storeId)?.value.push(entry);
      }
    } 

    return [price, orderBy(list, i => i.value.length).reverse()];
  }
}

export default new ShoppingListGenerator();