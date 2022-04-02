export type AmmunitionVM = {
  id:number;
  reference: string;
  size: number;
  lifetime: number;
  speed: number;
  hitType: string;
  name: string;
  impactRadius: number;
  damage:DamageModel;
  damageDropMinDistance:DamageModel;
  damageDropPerMeter:DamageModel;
  damageDropMinDamage:DamageModel;
}

type DamageModel = {
  id: number;
  damagePhysical: number;
  damageEnergy: number;
  damageDistortion: number;
  damageThermal: number;
  damageBiochemical: number;
  damageStun: number;
}

export type AmmunitionInfo = {
  id:number;
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
}

export type DamageType = {
  damage: number;
  damageDropMinDistance: number;
  damageDropPerMeter: number;
  damageDropMinDamage: number;
}