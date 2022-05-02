/* eslint-disable @typescript-eslint/no-non-null-assertion */
import gearServiceClient from "../client/gearServiceClient";

import type { NameReference } from "~type/image";
import type { Armor, Weapon } from "~type/loadout";

class GearInfoProvider {
  async GetArmorListInfo(names: string[]): Promise<Armor[]> {
    const promises = names.map((name) => this.GetArmorInfo(name));
    return Promise.all(promises);
  }

  async GetArmorInfo(name: string): Promise<Armor> {
    const { data, success, message } = await gearServiceClient.GetArmorInfo(
      name
    );

    if (!success) {
      throw new Error(`GearInfoFetchException: ${message}`);
    }

    return data;
  }

  async GetWeaponListInfo(names: string[]): Promise<Weapon[]> {
    const promises = names.map((name) => this.GetWeaponInfo(name));
    return Promise.all(promises);
  }

  async GetWeaponInfo(name: string): Promise<Weapon> {
    const { data, success, message } = await gearServiceClient.GetWeaponInfo(
      name
    );

    if (success) {
      return data;
    }
    throw new Error(`GearInfoFetchException: ${message}`);
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
