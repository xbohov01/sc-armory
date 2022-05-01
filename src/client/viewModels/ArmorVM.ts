import type { FPSGear } from "~type/loadout";

export type ArmorVM = FPSGear & {
  inventoryCapacity: number;
  minResistance: number;
  maxResistance: number;
  armorPart: string;
  damageReduction: number;
  weaponPorts: number;
  ammoPorts: number;
  utilityPorts: number;
  medicalPorts: number;
  oxygenPorts: number;
  grenadePorts: number;
  backpackMaxSize: number;
};
