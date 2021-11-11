import axios, { AxiosInstance } from 'axios';
import { orderBy } from 'lodash';
import { ResultObject, SaleLocationVM, SingleResultObject } from '../types/types';
import { ArmorVM } from './viewModels/ArmorVM';
import { AttachmentVM } from './viewModels/AttachmentVM';
import { FPSGearBaseVM } from './viewModels/FPSGearBaseVM';
import { RetailProductVM } from './viewModels/RetailProductVM';
import { WeaponVM } from './viewModels/WeaponVM';

const RetailProductsEndpoint = '/retailproducts'
const saleLocations = '/salelocations'
const ArmorsEndpoint = '/armors'
const WeaponsEndpoint = '/weapons'
const AttachmentsEndpoint = '/attachments'
const ConsumablesEndpoint = '/consumables'

class ApiClient {
  instance: AxiosInstance;
  url: string;
  cloudinary: string;
  isPtu: boolean;

  constructor() {
    var url = '';
    var value = localStorage.getItem('wasPtu');
    if (value === undefined || value === 'false') {
      url = process.env.REACT_APP_API_URL || '';
    } else {
      url = process.env.REACT_APP_API_PTU_URL || '';
    }

    this.url = url;
    this.instance = axios.create({
      baseURL: url,
    })
    this.cloudinary = process.env.REACT_APP_CLOUDINARY_URL || 'https://res.cloudinary.com/thespacecoder/image/upload/v1630349759/armory/';
    this.isPtu = false;
  }

  /**
   * 
   * @param isPtu set to true if PTU is enabled
   */
  ChangeAPIs(isPtu: boolean) {
    if (isPtu) {
      this.url = process.env.REACT_APP_API_PTU_URL || '';
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_API_PTU_URL,
      });
      this.isPtu = true;
    } else {
      this.url = process.env.REACT_APP_API_URL || '';
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      });
      this.isPtu = false;
    }
  }

  async GetArmor(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.instance.get(
      this.url + ArmorsEndpoint + filter
    )
    return orderBy(result.data.value, (v: ArmorVM) => v.LocalizedName);
  }

  async GetWeapon(filter: string = ''): Promise<WeaponVM[]> {
    let result = await this.instance.get(
      this.url + WeaponsEndpoint + filter
    )
    return orderBy(result.data.value, (v: WeaponVM) => v.LocalizedName);
  }

  async GetConsumable(filter: string = ''): Promise<FPSGearBaseVM[]> {
    let result = await this.instance.get(
      this.url + ConsumablesEndpoint + filter
    )
    return orderBy(result.data.value, (v: WeaponVM) => v.LocalizedName);
  }

  /**
   * 
   * @param filter full or partial localized name of the item
   */
  async GetArms(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Arms' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetUndersuits(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Undersuit' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetHelmets(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Helmet' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetCores(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Core' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetBackpacks(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Backpack' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetCoreByName(name: string) {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Core' and LocalizedName eq '${name}'`
    );
    return result;
  }

  async GetLegs(filter: string = ''): Promise<ArmorVM[]> {
    let result = await this.GetArmor(
      `?$filter=ArmorPart eq 'Legs' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetPistols(filter: string = ''): Promise<WeaponVM[]> {
    let result = await this.GetWeapon(
      `?$filter=Type eq 'Pistol' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetUsable(filter: string = ''): Promise<FPSGearBaseVM[]> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `?$filter=RetailType eq 'Usable' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return orderBy(result.data.value, (v: RetailProductVM) => v.LocalizedName);
  }

  async GetWeapons(filter: string = ''): Promise<WeaponVM[]> {
    let result = await this.GetWeapon(
      `?$filter=Type ne 'Pistol' and Type ne 'Utility' and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetWeaponByName(name:string): Promise<WeaponVM>{
    let result = await this.GetWeapon(
      `?$filter=LocalizedName eq '${name}'`
    );
    return result[0];
  }

  async GetTools(filter: string = ''): Promise<WeaponVM[]> {
    let result = await this.GetWeapon(
      `?$filter=(Type eq 'Utility' or Type eq 'Medical Device') and contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return result;
  }

  async GetAttachments(filter: string = ''): Promise<AttachmentVM[]> {
    let result = await this.instance.get(
      this.url + AttachmentsEndpoint + `?$filter=contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return orderBy(result.data.value, (v: RetailProductVM) => v.LocalizedName);
  }

  async GetSaleLocations(itemName: string): Promise<ResultObject<SaleLocationVM>> {
    try {
      let result = await this.instance.get(this.url + saleLocations + `?item=${itemName}`);
      return {
        success: result.status === 200,
        message: result.statusText,
        data: result.data
      }
    } catch (err) {
      if (err.response.status === 404) {
        return {
          success: false,
          message: "Not sold",
          data: [{
            saleLocationId: 0,
            saleLocationName: "Item not sold",
            itemId: 0,
            price: 0,
            saleLocationChain: "Possible sub/exclusive item"
          }]
        }
      }
    }
    return {
      success: false,
      message: "",
      data: []
    }
  }

  async GetRetailProduct(id: number): Promise<RetailProductVM> {
    let result = await this.instance.get(
      this.url + RetailProductsEndpoint + `(${id})`
    );
    return result.data
  }

  async GetArmorInfo(name: string): Promise<SingleResultObject<ArmorVM>> {
    let result = await this.instance.get(
      this.url + ArmorsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data.value[0]
    }
  }

  async GetWeaponInfo(name: string): Promise<SingleResultObject<WeaponVM>> {
    let result = await this.instance.get(
      this.url + WeaponsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data.value[0]
    }
  }

  async CheckIfImageExists(imageId: string): Promise<boolean> {
    try {
      let result = await axios.head(this.cloudinary + imageId);
      return result.status === 200 ? true : false;
    } catch (e) {
      return false;
    }
  }
}

export default new ApiClient();