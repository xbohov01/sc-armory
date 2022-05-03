import gearServiceClient from "~/client/gearServiceClient";
import type { Attachment, WeaponAttachmentSlot } from "~type/loadout";

export const getAttachmentSlots = async (
  name: string
): Promise<WeaponAttachmentSlot[]> => {
  const weaponModel = await gearServiceClient.GetWeaponByName(name);
  const slots: WeaponAttachmentSlot[] = [
    {
      MaxSize: weaponModel.barrelSlot.maxSize,
      MinSize: weaponModel.barrelSlot.minSize,
      Type: "Barrel",
      Attachments: [],
    },
    {
      MaxSize: weaponModel.underbarrelSlot.maxSize,
      MinSize: weaponModel.underbarrelSlot.minSize,
      Type: "Underbarrel",
      Attachments: [],
    },
    {
      MaxSize: weaponModel.opticSlot.maxSize,
      MinSize: weaponModel.opticSlot.minSize,
      Type: "Sight",
      Attachments: [],
    },
  ];
  return slots;
};

export const getAttachments = async (
  type: string,
  maxSize: number,
  minSize: number
): Promise<Attachment[]> => {
  const attachments = await gearServiceClient.GetAttachments("");

  return attachments.filter(
    (attachment) =>
      attachment.type === attachmentTypes[type] &&
      attachment.size <= maxSize &&
      attachment.size >= minSize
  );
};

const attachmentTypes: Record<string, string> = {
  Underbarrel: "BottomAttachment",
  Sight: "IronSight",
  Barrel: "Barrel",
};
