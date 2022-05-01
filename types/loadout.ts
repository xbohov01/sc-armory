import type { SelectOption } from "~type/select";

export type RetailProduct = {
  Id: number;
  Uuid: string;
  LocalizedName: string;
  LocalizedDescription: string;
  BasePrice: number;
  Inventory: number;
  MaxInventory: number;
  SoldAt: number[];
  BoughtAt: number[];
  MaxDiscountPercentage: number;
  MaxPremiumPercentage: number;
  RetailType: number;
};

export type FPSGear = {
  id: number;
  reference: string;
  localizedName: string;
  localizedDescription: string;
  manufacturerCode: string;
  manufacturerName: string;
  type: string;
  size: number;
  inventoryOccupancy: number;
  tags: string;
};

export type WeaponAttachmentPort = {
  grade: number;
  minSize: number;
  maxSize: number;
};

export type Weapon = FPSGear & {
  barrelSlot: WeaponAttachmentPort;
  opticSlot: WeaponAttachmentPort;
  underbarrelSlot: WeaponAttachmentPort;
  rapidFireRate: number;
  burstFireRate: number;
  burstSize: number;
  singleFireRate: number;
  range: string;
  ammoType: string;
  magazineSize: string;
  alphaDamage: number;
  ammoContainerReference: string;
};

export type Attachment = FPSGear & {
  grade: number;
  defaultRange: number;
  maxRange: number;
  rangeIncrement: number;
  autoZeroingTime: number;
};

export type Ammunition = {
  id: number;
  reference: string;
  size: number;
  lifetime: number;
  speed: number;
  hitType: string;
  name: string;
  impactRadius: number;
  damage: DamageModel;
  damageDropMinDistance: DamageModel;
  damageDropPerMeter: DamageModel;
  damageDropMinDamage: DamageModel;
};

type DamageModel = {
  id: number;
  damagePhysical: number;
  damageEnergy: number;
  damageDistortion: number;
  damageThermal: number;
  damageBiochemical: number;
  damageStun: number;
};

export type AmmunitionInfo = {
  id: number;
  reference: string;
  size: number;
  lifetime: number;
  speed: number;
  hitType: string;
  name: string;
  impactRadius: number;
  damagePhysical: DamageType;
  damageEnergy: DamageType;
  damageDistortion: DamageType;
  damageThermal: DamageType;
  damageBiochemical: DamageType;
  damageStun: DamageType;
};

export type DamageType = {
  damage: number;
  damageDropMinDistance: number;
  damageDropPerMeter: number;
  damageDropMinDamage: number;
};

export type Armor = FPSGear & {
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

export type WeaponAttachment = {
  Name: string;
  Size: number;
  Type: string;
};

export type WeaponAttachmentSlot = {
  MaxSize: number;
  MinSize: number;
  Type: string;
  Attachments: SelectOption[];
};
