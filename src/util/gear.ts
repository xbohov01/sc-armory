// TODO: remove eslint-disable
import gearServiceClient from "~/client/gearServiceClient";
import type { Armor, FPSGear, Weapon } from "~type/loadout";
import type { ArmorType, GearType, WeaponType } from "~type/select";
import { armorTypes, weaponTypes } from "~type/select";

const getArmorWeightFromDescription = (
  description: string
): "Heavy" | "Medium" | "Light" | "" => {
  if (description.includes("Item Type: Heavy Armor")) {
    return "Heavy";
  }
  if (description.includes("Item Type: Medium Armor")) {
    return "Medium";
  }
  if (description.includes("Item Type: Light Armor")) {
    return "Light";
  }
  return "";
};

const gearToSelectOption = (gear: FPSGear | Weapon) => ({
  value: gear.id.toString(),
  label: gear.localizedName,
  type: getArmorWeightFromDescription(gear.localizedDescription),
});

export const getGearOptions = async (type: GearType, filter: string) => {
  const gearOptions = await getGearPromise(type, filter);

  return gearOptions.map((gear: FPSGear | Weapon) => gearToSelectOption(gear));
};

export const getBackpacksWithMinimumSize = async (name: string, size: number) =>
  (await gearServiceClient.GetArmorPartByLocalizedName("Backpack", name))
    .filter((backpack) => backpack.size <= size)
    .map((backpack) => gearToSelectOption(backpack));

export const getAmmunitionByReference = async (
  ammoContainerReference: string
) => {
  const model = await gearServiceClient.GetAmmunitionByReference(
    ammoContainerReference
  );

  return {
    id: model.id,
    reference: model.reference,
    size: model.size,
    lifetime: model.lifetime,
    speed: model.speed,
    hitType: model.hitType,
    name: model.name,
    impactRadius: model.impactRadius,
    damagePhysical: {
      damage: model.damage.damagePhysical,
      damageDropMinDistance: model.damageDropMinDistance.damagePhysical,
      damageDropPerMeter: model.damageDropPerMeter.damagePhysical,
      damageDropMinDamage: model.damageDropMinDamage.damagePhysical,
    },
    damageEnergy: {
      damage: model.damage.damageEnergy,
      damageDropMinDistance: model.damageDropMinDistance.damageEnergy,
      damageDropPerMeter: model.damageDropPerMeter.damageEnergy,
      damageDropMinDamage: model.damageDropMinDamage.damageEnergy,
    },
    damageDistortion: {
      damage: model.damage.damageDistortion,
      damageDropMinDistance: model.damageDropMinDistance.damageDistortion,
      damageDropPerMeter: model.damageDropPerMeter.damageDistortion,
      damageDropMinDamage: model.damageDropMinDamage.damageDistortion,
    },
    damageThermal: {
      damage: model.damage.damageThermal,
      damageDropMinDistance: model.damageDropMinDistance.damageThermal,
      damageDropPerMeter: model.damageDropPerMeter.damageThermal,
      damageDropMinDamage: model.damageDropMinDamage.damageThermal,
    },
    damageBiochemical: {
      damage: model.damage.damageBiochemical,
      damageDropMinDistance: model.damageDropMinDistance.damageBiochemical,
      damageDropPerMeter: model.damageDropPerMeter.damageBiochemical,
      damageDropMinDamage: model.damageDropMinDamage.damageBiochemical,
    },
    damageStun: {
      damage: model.damage.damageStun,
      damageDropMinDistance: model.damageDropMinDistance.damageStun,
      damageDropPerMeter: model.damageDropPerMeter.damageStun,
      damageDropMinDamage: model.damageDropMinDamage.damageStun,
    },
  };
};

const getGearPromise = (
  type: GearType,
  filter: string
): Promise<FPSGear[] | Weapon[]> => {
  if (armorTypes.includes(type as ArmorType)) {
    return gearServiceClient.GetArmorPartByLocalizedName(type, filter);
  }

  if (weaponTypes.includes(type as WeaponType)) {
    return gearServiceClient.GetPrimaryWeapons(filter);
  }

  if (type === "Sidearm") {
    return gearServiceClient.GetWeaponsByType(filter, "Pistol");
  }

  if (type === "Usable") {
    return gearServiceClient.GetUsable(filter);
  }

  if (type === "Tool") {
    return gearServiceClient.GetTools(filter);
  }

  return Promise.resolve([]);
};

export const getCore = async (name: string): Promise<Armor> => {
  const [first] = await gearServiceClient.GetArmorPartByLocalizedName(
    "Core",
    name
  );
  return first;
};
