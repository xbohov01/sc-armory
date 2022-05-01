import { WeaponAttachmentPortVM } from "./WeaponAttachmentPortVM";

import type { FPSGear } from '~type/loadout'

export type WeaponVM = FPSGear & {
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
  ammoContainerReference: string;
};
