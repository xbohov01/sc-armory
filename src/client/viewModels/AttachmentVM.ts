import type { FPSGear } from "~type/loadout";

export type AttachmentVM = FPSGear & {
  grade: number;
  defaultRange: number;
  maxRange: number;
  rangeIncrement: number;
  autoZeroingTime: number;
};
