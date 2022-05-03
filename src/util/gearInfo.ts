import gearServiceClient from "~/client/gearServiceClient";
import type { NameReference } from "~type/image";
import type { Armor, Weapon } from "~type/loadout";

export const getArmorListInfo = async (names: string[]): Promise<Armor[]> => {
  const promises = names.map((name) => getArmorInfo(name));
  return Promise.all(promises);
};

export const getWeaponListInfo = async (names: string[]): Promise<Weapon[]> => {
  const promises = names.map((name) => getWeaponInfo(name));
  return Promise.all(promises);
};

export const getGearListReferences = async (
  names: string[]
): Promise<NameReference[]> => {
  const infoPromises = names.map(getGearInfo);
  const gearInformation = await Promise.all(infoPromises);
  return gearInformation
    .filter((info) => info !== null)
    .map((info) => {
      const gearInfo = info as Weapon | Armor;
      return { name: gearInfo.localizedName, reference: gearInfo.reference };
    });
};

const getWeaponInfo = async (name: string): Promise<Weapon> => {
  const { data, success, message } = await gearServiceClient.GetWeaponInfo(
    name
  );

  if (!success) {
    throw new Error(`GearInfoFetchException: ${message}`);
  }

  return data;
};

const getArmorInfo = async (name: string): Promise<Armor> => {
  const { data, success, message } = await gearServiceClient.GetArmorInfo(name);

  if (!success) {
    throw new Error(`GearInfoFetchException: ${message}`);
  }

  return data;
};

const isWeapon = (name: string): boolean =>
  name.includes(" Rifle") ||
  name.includes(" SMG") ||
  name.includes(" LMG") ||
  name.includes(" Launcher") ||
  name.includes(" Pistol") ||
  name.includes(" Railgun");

const isArmor = (name: string): boolean =>
  name.includes(" Arms") ||
  name.includes(" Legs") ||
  name.includes(" Core") ||
  name.includes(" Helmet") ||
  name.includes(" Armor") ||
  name.includes(" Backpack") ||
  name.includes(" Undersuit");

const getGearInfo = async (name: string) => {
  if (isArmor(name)) {
    return getArmorInfo(name);
  }
  if (isWeapon(name)) {
    return getWeaponInfo(name);
  }
  return null;
};
