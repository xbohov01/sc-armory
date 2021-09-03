import client from "../client/client";
import { ArmorVM } from "../client/viewModels/ArmorVM";
import { WeaponVM } from "../client/viewModels/WeaponVM";
import { GearInfoFetchException } from "../exceptions/GearInfoFetchException";
import { NameReference } from "../types/types";

class GearInfoProvider {

  async GetArmorListInfo(names: string[]): Promise<ArmorVM[]> {
    let armorInfo: ArmorVM[] = [];

    for (let name of names) {
      let info = await this.GetArmorInfo(name);

      armorInfo.push(info);
    }

    return armorInfo;
  }

  async GetArmorInfo(name: string): Promise<ArmorVM> {
    let result = await client.GetArmorInfo(name);

    if (!result.success) {
      throw new GearInfoFetchException(result.message);
    }

    return result.data;
  }

  async GetWeaponListInfo(names: string[]): Promise<WeaponVM[]> {
    let weapons: WeaponVM[] = [];

    for (let name of names) {
      let info = await this.GetWeaponInfo(name);

      weapons.push(info);
    }

    return weapons;
  }

  async GetWeaponInfo(name: string): Promise<WeaponVM> {
    let result = await client.GetWeaponInfo(name);

    if (!result.success) {
      throw new GearInfoFetchException(result.message);
    }

    return result.data;
  }

  IsArmor(name: string): boolean {
    if (name.includes(' Arms') ||
      name.includes(' Legs') ||
      name.includes(' Core') ||
      name.includes(' Helmet') ||
      name.includes(' Armor') ||
      name.includes(' Undersuit')
    ) {
      return true;
    }
    return false;
  }

  IsWeapon(name: string): boolean {
    if (name.includes(' Rifle') ||
      name.includes(' SMG') ||
      name.includes(' LMG') ||
      name.includes(' Launcher') ||
      name.includes(' Pistol') ||
      name.includes(' Railgun')
    ) {
      return true;
    }
    return false;
  }

  async GetGearListReferences(names: string[]): Promise<NameReference[]> {
    let references: NameReference[] = [];

    for (let name of names){
      if(this.IsArmor(name)){
        let info = await this.GetArmorInfo(name);
        references.push({name:info.LocalizedName, reference:info.Reference})
      }
      if(this.IsWeapon(name)){
        let info = await this.GetWeaponInfo(name);
        references.push({name:info.LocalizedName, reference:info.Reference})
      }
    }

    return references;
  }
}

export default new GearInfoProvider();