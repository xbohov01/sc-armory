import axios, { AxiosInstance } from "axios";
import { sha3_512 } from "js-sha3";
import { ResultObject, SaleLocationVM } from "../types/types";
import { RetailProductVM } from "./viewModels/RetailProductVM";

const RetailProductsEndpoint = "/retailproducts";
const saleLocations = "/salelocations";
const AuthenticationEndpoint = "/serviceaccounts";

export class ApiClient {
  instance!: AxiosInstance;

  url!: string;

  cloudinary: string;

  isPtu!: boolean;

  token: string;

  authenticationPromise: Promise<string>;

  constructor() {
    const wasPtu = localStorage.getItem("wasPtu") === "true";
    this.ChangeAPIs(wasPtu);
    this.cloudinary =
      process.env.REACT_APP_CLOUDINARY_URL ||
      "https://res.cloudinary.com/thespacecoder/image/upload/v1630349759/armory/";
    this.token = "";

    this.authenticationPromise = this.Authorize();
  }

  async Authorize(
    endpoint: string = "",
    password: string = this.isPtu
      ? process.env.REACT_APP_PTU_PASSWORD!
      : process.env.REACT_APP_PASSWORD!
  ): Promise<string> {
    const code = (Math.random() + 1).toString(36).substring(2);
    const username = this.isPtu
      ? process.env.REACT_APP_PTU_LOGIN
      : process.env.REACT_APP_LOGIN;

    try {
      const result = await this.instance.post(
        `${this.url}${
          endpoint !== "" ? endpoint : `${AuthenticationEndpoint}/login`
        }`,
        {
          username: username,
          sequence: sha3_512(password + code),
          code: code,
        }
      );

      this.SetToken(result.data.token);
      return result.data.token;
    } catch (e: any) {
      console.warn(`Authentication failed ${e.message}`);
      return "";
    }
  }

  SetToken(token: string) {
    this.token = token;

    this.instance.interceptors.request.use((config) => ({
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    }));
  }

  ChangeAPIs(isPtu: boolean) {
    this.isPtu = isPtu;
    this.url = isPtu
      ? process.env.REACT_APP_API_PTU_URL!
      : process.env.REACT_APP_API_URL!;
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
      // Remove after shop service is up with itemName in VM
      const hackedData = data.map((d) => ({ ...d, itemName }));
      return {
        success: status === 200,
        message: statusText,
        data: hackedData,
      };
    } catch (err: any) {
      if (err.response.status === 404) {
        return {
          success: false,
          message: "Not sold",
          data: [
            {
              saleLocationId: 0,
              saleLocationName: "Item not sold",
              itemId: 0,
              price: 0,
              saleLocationChain: "Possible sub/exclusive/lootable item",
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

  async GetRetailProduct(id: number): Promise<RetailProductVM> {
    const { data } = await this.instance.get(
      `${this.url + RetailProductsEndpoint}(${id})`
    );
    return data;
  }

  async CheckIfImageExists(imageId: string): Promise<boolean> {
    try {
      const { status } = await axios.head(this.cloudinary + imageId);
      return status === 200;
    } catch (e) {
      return false;
    }
  }
}

export default new ApiClient();
