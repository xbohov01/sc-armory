import { FPSGearBaseVM } from "./FPSGearBaseVM";

export class AttachmentVM extends FPSGearBaseVM {
  Grade!: number;
  DefaultRange!: number;
  MaxRange!: number;
  RangeIncrement!: number;
  AutoZeroingTime!: number;
}
