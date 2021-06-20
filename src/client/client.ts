import axios, { AxiosInstance } from 'axios';
import { orderBy } from 'lodash';
import { ResultObject, SaleLocationVM } from '../types/types';
import { RetailProductVM } from './RetailProductVM';

const RetailProductsEndpoint = '/retailproducts'
const saleLocations = '/salelocations'

class ApiClient {
  instance: AxiosInstance;
  url: string;

  constructor() {
    this.url = process.env.REACT_APP_API_URL || '';
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    })
  }

  /**
   * 
   * @param filter filter in format '&$filter=[filter]
   */
  async GetArms(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'arms') and contains(tolower(LocalizedName),'${filter.toLowerCase()}') and RetailType eq 'Armor'`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetUndersuits(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'undersuit') and contains(tolower(LocalizedName),'${filter.toLowerCase()}') and RetailType eq 'Armor'`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetHelmets(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'helmet') and contains(tolower(LocalizedName),'${filter.toLowerCase()}') and RetailType eq 'Armor'`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetCores(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'core') and contains(tolower(LocalizedName),'${filter.toLowerCase()}') and RetailType eq 'Armor'`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetCoreByName(name:string){
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return result.data
  }

  async GetLegs(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'legs') and contains(tolower(LocalizedName),'${filter.toLowerCase()}') and RetailType eq 'Armor'`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetPistols(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=RetailType eq 'Sidearm' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetUsable(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=RetailType eq 'Usable' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetWeapons(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=RetailType eq 'Primary' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName);
  }

  async GetSaleLocations(itemName: string):Promise<ResultObject<SaleLocationVM>> {
    let result = await this.instance.get(this.url + saleLocations + `?item=${itemName}`);
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data
    }
  }

  async GetRetailProduct(id:number):Promise<RetailProductVM> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `(${id})`
    );
    return result.data
  }
}

export default new ApiClient();