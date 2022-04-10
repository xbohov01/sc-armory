import { FPSGearBaseVM } from "./FPSGearBaseVM";

export type ArmorVM = FPSGearBaseVM & {
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
