import axios, { AxiosInstance } from 'axios';
import { SaleLocationVM } from '../types/types';
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
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'arms') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result.data.value
  }

  async GetUndersuits(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'undersuit') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result.data.value
  }

  async GetHelmets(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'helmet') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result.data.value
  }

  async GetCores(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'core') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result.data.value
  }

  async GetCoreByName(name:string){
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return result.data
  }

  async GetLegs(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'legs') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result.data.value
  }

  async GetPistols(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=RetailType eq 'Sidearm' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result.data.value
  }

  async GetWeapons(filter: string = ''): Promise<RetailProductVM[]> {
    let rifles = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'rifle') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );

    let smg = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'smg') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );

    let lmg = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'lmg') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );

    let shotgun = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=contains(tolower(LocalizedName),'shotgun') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );

    let weapons = [...rifles.data.value,
    ...smg.data.value,
    ...lmg.data.value,
    ...shotgun.data.value]
      .filter((w: RetailProductVM) => !w.LocalizedName.includes('Magazine') && !w.LocalizedName.includes('Battery'));

    return weapons;
  }

  async GetSaleLocations(itemName: string):Promise<SaleLocationVM[]> {
    let result = await this.instance.get(this.url + saleLocations + `?item=${itemName}`);
    return result.data
  }

  async GetRetailProduct(id:number):Promise<RetailProductVM> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `(${id})`
    );
    return result.data
  }
}

export default new ApiClient();