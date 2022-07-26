import axios from "axios";

import { ApiClient } from "./client";

import type { ResultObject } from "~type/fetch";
import type { RetailProduct } from "~type/loadout";
import type { LootItem, SaleLocation } from "~type/search";

const RetailProductsEndpoint = "/retailproducts";
const saleLocations = "/salelocations";
const lootItems = "/lootitems";

export class ShopServiceClient extends ApiClient {
  constructor() {
    super();

    const value = localStorage.getItem("wasPtu");
    if (
      value === undefined ||
      value === "false" ||
      import.meta.env.VITE_PTU_ENABLED === "false"
    ) {
      this.isPtu = false;
      this.url = import.meta.env.VITE_SHOP_LIVE_URL || "";
    } else {
      this.url = import.meta.env.VITE_SHOP_PTU_URL || "";
      this.isPtu = true;
    }

    this.instance = axios.create({
      baseURL: this.url,
    });

    this.token = "";

    const password = this.isPtu
      ? import.meta.env.VITE_SHOP_PTU_PASS
      : import.meta.env.VITE_SHOP_LIVE_PASS;

    this.authenticationPromise = super.Authorize(
      "/authentication/applogin",
      password,
      "ShopService"
    );
  }

  override ChangeAPIs(isPtu: boolean) {
    this.isPtu = isPtu;
    this.url = isPtu
      ? import.meta.env.VITE_SHOP_PTU_URL
      : import.meta.env.VITE_SHOP_LIVE_URL;

    this.instance = axios.create({
      baseURL: this.url,
    });
  }

  async GetSaleLocations(
    itemName: string
  ): Promise<ResultObject<SaleLocation>> {
    try {
      const { status, statusText, data } = await this.instance.get<
        SaleLocation[]
      >(`${this.url + saleLocations}?item=${itemName}`);

      return {
        success: status === 200,
        message: statusText,
        data:
          data.length > 0
            ? data
            : [
                {
                  color: "",
                  colorInvariantName: "",
                  colorTag: "",
                  storeName: "N/A",
                  id: 0,
                  price: 0,
                  storeLocationChain: "N/A",
                  itemName,
                  itemType: "",
                  storeNameId: "",
                  storeType: ""
                },
              ],
      };
    } catch (err) {
      if ((err as { response: { status: number } }).response.status === 404) {
        return {
          success: false,
          message: "Not sold",
          data: [
            {
              color: "",
              colorInvariantName: "",
              colorTag: "",
              storeName: "N/A",
              id: 0,
              price: 0,
              storeLocationChain: "N/A",
              itemName,
              itemType: "",
              storeNameId: "",
              storeType: ""
            },
          ],
        };
      }
    }
    return {
      success: false,
      message: "",
      data: [],
    };
  }

  async GetRetailProduct(id: number): Promise<RetailProduct> {
    const { data } = await this.instance.get(
      `${this.url + RetailProductsEndpoint}/${id}`
    );
    return data;
  }

  async GetLootLocationProbabilities(itemName:string): Promise<LootItem[]>{

    try {
      const { data } = await this.instance.get<LootItem[]>
        (`${this.url + lootItems}?item=${itemName}`);

        return data
    } catch (err){
      return [];
    }
    
  }
}

export default new ShopServiceClient();
