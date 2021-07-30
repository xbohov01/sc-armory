import axios, { AxiosInstance } from 'axios';
import { orderBy } from 'lodash';
import { ResultObject, SaleLocationVM, SingleResultObject } from '../types/types';
import { ArmorVM } from './viewModels/ArmorVM';
import { RetailProductVM } from './viewModels/RetailProductVM';
import { WeaponVM } from './viewModels/WeaponVM';

const RetailProductsEndpoint = '/retailproducts'
const saleLocations = '/salelocations'
const ArmorsEndpoint = '/armors'
const WeaponsEndpoint = '/weapons'

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
      this.url + RetailProductsEndpoint + `?$filter=(contains(tolower(LocalizedName),'undersuit') or contains(tolower(LocalizedName),'novikov') or contains(tolower(LocalizedName),'pembroke')) and contains(tolower(LocalizedName),'${filter.toLowerCase()}') and RetailType eq 'Armor'`
    );
    return orderBy(result.data.value, (v:RetailProductVM) => v.LocalizedName).filter(u => !u.LocalizedName.includes('Helmet'));
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

  async GetAttachments(filter: string = ''): Promise<RetailProductVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=RetailType eq 'Attachment' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
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

  async GetArmorInfo(name:string):Promise<SingleResultObject<ArmorVM>>{
    let result = await this.instance.get(
      this.url + ArmorsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data.value[0]
    }
  }

  async GetWeaponInfo(name:string):Promise<SingleResultObject<WeaponVM>>{
    let result = await this.instance.get(
      this.url + WeaponsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data.value[0]
    }
  }
}

export default new ApiClient();