/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable class-methods-use-this */
import gearServiceClient from "../client/gearServiceClient";
import { ArmorVM } from "../client/viewModels/ArmorVM";
import { WeaponVM } from "../client/viewModels/WeaponVM";
import GearInfoFetchException from "../exceptions/GearInfoFetchException";
import { NameReference } from "../types/types";

class GearInfoProvider {
  async GetArmorListInfo(names: string[]): Promise<ArmorVM[]> {
    const promises = names.map((name) => this.GetArmorInfo(name));
    return Promise.all(promises);
  }

  async GetArmorInfo(name: string): Promise<ArmorVM> {
    const { data, success, message } = await gearServiceClient.GetArmorInfo(
      name
    );

    if (!success) {
      throw new GearInfoFetchException(message);
    }

    return data;
  }

  async GetWeaponListInfo(names: string[]): Promise<WeaponVM[]> {
    const promises = names.map((name) => this.GetWeaponInfo(name));
    return Promise.all(promises);
  }

  async GetWeaponInfo(name: string): Promise<WeaponVM> {
    const { data, success, message } = await gearServiceClient.GetWeaponInfo(
      name
    );

    if (success) {
      return data;
    }
    throw new GearInfoFetchException(message);
  }

  IsArmor(name: string): boolean {
    return (
      name.includes(" Arms") ||
      name.includes(" Legs") ||
      name.includes(" Core") ||
      name.includes(" Helmet") ||
      name.includes(" Armor") ||
      name.includes(" Backpack") ||
      name.includes(" Undersuit")
    );
  }

  IsWeapon(name: string): boolean {
    return (
      name.includes(" Rifle") ||
      name.includes(" SMG") ||
      name.includes(" LMG") ||
      name.includes(" Launcher") ||
      name.includes(" Pistol") ||
      name.includes(" Railgun")
    );
  }

  async GetGearListReferences(names: string[]): Promise<NameReference[]> {
    const promises = names.map((name) => {
      if (this.IsArmor(name)) {
        return this.GetArmorInfo(name);
      }
      if (this.IsWeapon(name)) {
        return this.GetWeaponInfo(name);
      }
      return null;
    });
    const infos = await Promise.all(promises);

    return infos
      .filter((info) => !!info)
      .map((info) => ({
        name: info!.localizedName,
        reference: info!.reference,
      }));
  }
}

export default new GearInfoProvider();
