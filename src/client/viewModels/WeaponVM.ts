import { FPSGearBaseVM } from "./FPSGearBaseVM";
import { WeaponAttachmentPortVM } from "./WeaponAttachmentPortVM";

export type WeaponVM = FPSGearBaseVM & {
  barrelSlot: WeaponAttachmentPortVM;
  opticSlot: WeaponAttachmentPortVM;
  underbarrelSlot: WeaponAttachmentPortVM;
  rapidFireRate: number;
  burstFireRate: number;
  burstSize: number;
  singleFireRate: number;
  range: string;
  ammoType: string;
  magazineSize: string;
  alphaDamage: number;
}
