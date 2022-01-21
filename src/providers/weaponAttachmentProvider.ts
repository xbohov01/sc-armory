import gearServiceClient from "../client/gearServiceClient";
import { AttachmentVM } from "../client/viewModels/AttachmentVM";
import { WeaponAttachment, WeaponAttachmentSlot } from "../types/types";

class WeaponAttachmentProvider {
  private _specificSlots: { [id: string]: WeaponAttachmentSlot[] } = {
    "Salvo Frag Pistol": [
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    "Yubarev Pistol": [
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    "Ravager-212 Twin Shotgun": [
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
    ],
    R97Shotgun: [
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
    ],
    "Atzkav Sniper Rifle": [
      { MaxSize: 3, MinSize: 1, Type: "Sight", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
    ],
    "Scalpel Sniper Rifle": [
      { MaxSize: 3, MinSize: 1, Type: "Sight", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
    ],
    "F55 LMG": [
      { MaxSize: 2, MinSize: 1, Type: "Sight", Attachments: [] },
      { MaxSize: 3, MinSize: 1, Type: "Underbarrel", Attachments: [] },
    ],
    "GP-33 MOD Grenade Launcher": [
      { MaxSize: 2, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
  };

  private _generalSlots: { [id: string]: WeaponAttachmentSlot[] } = {
    Pistol: [
      { MaxSize: 1, MinSize: 1, Type: "Barrel", Attachments: [] },
      { MaxSize: 1, MinSize: 1, Type: "Underbarrel", Attachments: [] },
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    Rifle: [
      { MaxSize: 2, MinSize: 1, Type: "Barrel", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    "Sniper Rifle": [
      { MaxSize: 2, MinSize: 1, Type: "Barrel", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
      { MaxSize: 3, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    LMG: [
      { MaxSize: 2, MinSize: 1, Type: "Barrel", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    SMG: [
      { MaxSize: 1, MinSize: 1, Type: "Barrel", Attachments: [] },
      { MaxSize: 1, MinSize: 1, Type: "Underbarrel", Attachments: [] },
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    Shotgun: [
      { MaxSize: 3, MinSize: 1, Type: "Barrel", Attachments: [] },
      { MaxSize: 2, MinSize: 1, Type: "Underbarrel", Attachments: [] },
      { MaxSize: 1, MinSize: 1, Type: "Sight", Attachments: [] },
    ],
    default: [],
  };

  private _attachments: WeaponAttachment[] = [
    {
      Name: "Gamma (1x Holographic)",
      Size: 1,
      Type: "Sight",
    },
    {
      Name: "Gamma Duo (2x Holographic)",
      Size: 1,
      Type: "Sight",
    },
    {
      Name: "Gamma Plus (3x Holographic)",
      Size: 1,
      Type: "Sight",
    },
    {
      Name: "Tau Plus (4x Telescopic)",
      Size: 2,
      Type: "Sight",
    },
    {
      Name: "Theta Pro (8x Telescopic)",
      Size: 3,
      Type: "Sight",
    },
    {
      Name: "FieldLite",
      Size: 1,
      Type: "Underbarrel",
    },
    {
      Name: "250-E Laser Pointer",
      Size: 1,
      Type: "Underbarrel",
    },
    {
      Name: "Delta (1x Reflex)",
      Size: 1,
      Type: "Sight",
    },
    {
      Name: "Veil Flash Hider2",
      Size: 2,
      Type: "Barrel",
    },
    {
      Name: "Veil Flash Hider3",
      Size: 3,
      Type: "Barrel",
    },
    {
      Name: "Emod Stabilizer1",
      Size: 1,
      Type: "Barrel",
    },
    {
      Name: "Emod Stabilizer2",
      Size: 2,
      Type: "Barrel",
    },
    {
      Name: "Emod Stabilizer3",
      Size: 3,
      Type: "Barrel",
    },
    {
      Name: "Sion Compensator3",
      Size: 3,
      Type: "Barrel",
    },
    {
      Name: "Sion Compensator2",
      Size: 2,
      Type: "Barrel",
    },
    {
      Name: "Sion Compensator1  ",
      Size: 1,
      Type: "Barrel",
    },
    {
      Name: "Veil Flash Hider1",
      Size: 1,
      Type: "Barrel",
    },
    {
      Name: "Tacit Suppressor3",
      Size: 3,
      Type: "Barrel",
    },
    {
      Name: "Tacit Suppressor2",
      Size: 2,
      Type: "Barrel",
    },
    {
      Name: "Tacit Suppressor1",
      Size: 1,
      Type: "Barrel",
    },
  ];

  async GetAttachmentSlots(name: string): Promise<WeaponAttachmentSlot[]> {
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
  }

  private attachmentTypes: { [id: string]: string } = {
    Underbarrel: "BottomAttachment",
    Sight: "IronSight",
    Barrel: "Barrel",
  };

  async GetAttachments(
    type: string,
    maxSize: number,
    minSize: number
  ): Promise<AttachmentVM[]> {
    const attachments = await gearServiceClient.GetAttachments("");

    return attachments.filter(
      (a) =>
        a.type === this.attachmentTypes[type] &&
        a.size <= maxSize &&
        a.size >= minSize
    );
  }
}

export default new WeaponAttachmentProvider();
