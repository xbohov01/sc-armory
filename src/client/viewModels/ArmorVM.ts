import { FPSGearBaseVM } from "./FPSGearBaseVM";

export class ArmorVM extends FPSGearBaseVM {
  InventoryCapacity!: number;
  MinResistance!: number;
  MaxResistance!: number;
  ArmorPart!: string;
  DamageReduction!: number;
  WeaponPorts!: number;
  AmmoPorts!: number;
  UtilityPorts!: number;
  MedicalPorts!: number;
  OxygenPorts!: number;
  GrenadePorts!: number;
}