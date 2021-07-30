import client from "../client/client";
import { ArmorVM } from "../client/viewModels/ArmorVM";
import { WeaponVM } from "../client/viewModels/WeaponVM";
import { GearInfoFetchException } from "../exceptions/GearInfoFetchException";

class GearInfoProvider {
  
  async GetArmorListInfo(names:string[]):Promise<ArmorVM[]> {
    let armorInfo:ArmorVM[] = [];

    for (let name of names){
      let info = await this.GetArmorInfo(name);

      armorInfo.push(info);
    }

    return armorInfo;
  }

  async GetArmorInfo(name:string):Promise<ArmorVM> {
    let result = await client.GetArmorInfo(name);
    
    if (!result.success){
      throw new GearInfoFetchException(result.message);
    }

    return result.data;
  }

  async GetWeaponListInfo(names:string[]):Promise<WeaponVM[]> {
    let weapons:WeaponVM[] = [];

    for (let name of names){
      let info = await this.GetWeaponInfo(name);

      weapons.push(info);
    }

    return weapons;
  }

  async GetWeaponInfo(name:string):Promise<WeaponVM> {
    let result = await client.GetWeaponInfo(name);
    
    if (!result.success){
      throw new GearInfoFetchException(result.message);
    }

    return result.data;
  }
}

export default new GearInfoProvider();