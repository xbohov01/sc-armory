import { FPSGearBaseVM } from "./FPSGearBaseVM";

export type AttachmentVM = FPSGearBaseVM & {
  grade: number;
  defaultRange: number;
  maxRange: number;
  rangeIncrement: number;
  autoZeroingTime: number;
};
