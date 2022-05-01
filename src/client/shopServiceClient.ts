import axios from "axios";

import { ResultObject, SaleLocationVM } from "../types/types";

import { ApiClient } from "./client";

import type { RetailProduct } from "~type/loadout";

const RetailProductsEndpoint = "/retailproducts";
const saleLocations = "/salelocations";

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
      password
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
  ): Promise<ResultObject<SaleLocationVM>> {
    try {
      const { status, statusText, data } = await this.instance.get<
        SaleLocationVM[]
      >(`${this.url + saleLocations}?item=${itemName}`);

      return {
        success: status === 200,
        message: statusText,
        data: data.length > 0 ? data : [
          {
            saleLocationId: 0,
            saleLocationName: "N/A",
            itemId: 0,
            price: 0,
            saleLocationChain: "N/A",
            itemName,
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
              saleLocationId: 0,
              saleLocationName: "N/A",
              itemId: 0,
              price: 0,
              saleLocationChain: "N/A",
              itemName,
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
}

export default new ShopServiceClient();
