import { FPSGearBaseVM } from "./FPSGearBaseVM";
import { WeaponAttachmentPortVM } from "./WeaponAttachmentPortVM";

export class WeaponVM extends FPSGearBaseVM {
  BarrelSlot!: WeaponAttachmentPortVM;
  OpticSlot!: WeaponAttachmentPortVM;
  UnderbarrelSlot!: WeaponAttachmentPortVM;
  RapidFireRate!: number;
  BurstFireRate!: number;
  BurstSize!: number;
  SingleFireRate!: number;
  Range!: string;
  AmmoType!: string;
  MagazineSize!: string;
  AlphaDamage!: number;
}