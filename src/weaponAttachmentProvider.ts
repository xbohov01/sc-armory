import { WeaponAttachment, WeaponAttachmentSlot } from "./types/types";

class WeaponAttachmentProvider {
  specificSlots: { [id: string]: WeaponAttachmentSlot[] } = {
    "Salvo Frag Pistol": [
      { size: 1, type: 'Sight', attachments: [] }
    ],
    "Yubarev Pistol": [
      { size: 1, type: 'Sight', attachments: [] }
    ],
    "Ravager-212 Twin Shotgun": [
      { size: 1, type: 'Sight', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] }
    ],
    "R97Shotgun": [
      { size: 1, type: 'Sight', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] }
    ],
    "Atzkav Sniper Rifle": [
      { size: 3, type: 'Sight', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] }
    ],
    "Scalpel Sniper Rifle": [
      { size: 3, type: 'Sight', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] }
    ],
    "F55 LMG": [
      { size: 2, type: 'Sight', attachments: [] },
      { size: 3, type: 'Underbarrel', attachments: [] }
    ],
    "GP-33 MOD Grenade Launcher": [
      { size: 2, type: 'Sight', attachments: [] }
    ],
  };

  generalSlots: { [id: string]: WeaponAttachmentSlot[] } = {
    "Pistol": [
      { size: 1, type: 'Barrel', attachments: [] },
      { size: 1, type: 'Underbarrel', attachments: [] },
      { size: 1, type: 'Sight', attachments: [] },
    ],
    "Rifle": [
      { size: 2, type: 'Barrel', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] },
      { size: 2, type: 'Sight', attachments: [] },
    ],
    "Sniper Rifle": [
      { size: 2, type: 'Barrel', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] },
      { size: 3, type: 'Sight', attachments: [] },
    ],
    "LMG": [
      { size: 2, type: 'Barrel', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] },
      { size: 2, type: 'Sight', attachments: [] },
    ],
    "SMG": [
      { size: 1, type: 'Barrel', attachments: [] },
      { size: 1, type: 'Underbarrel', attachments: [] },
      { size: 1, type: 'Sight', attachments: [] },
    ],
    "Shotgun": [
      { size: 3, type: 'Barrel', attachments: [] },
      { size: 2, type: 'Underbarrel', attachments: [] },
      { size: 1, type: 'Sight', attachments: [] },
    ],
    "default": [],
  };

  attachments: WeaponAttachment[] = [
    {
      name: "Gamma (1x Holographic)",
      size: 1,
      type: "Sight"
    },
    {
      name: "Gamma Duo (2x Holographic)",
      size: 1,
      type: "Sight"
    },
    {
      name: "Gamma Plus (3x Holographic)",
      size: 1,
      type: "Sight"
    },
    {
      name: "Tau Plus (4x Telescopic)",
      size: 2,
      type: "Sight"
    },
    {
      name: "Theta Pro (8x Telescopic)",
      size: 3,
      type: "Sight"
    },
    {
      name: "FieldLite",
      size: 1,
      type: "Underbarrel"
    },
    {
      name: "250-E Laser Pointer",
      size: 1,
      type: "Underbarrel"
    },
    {
      name: "Delta (1x Reflex)",
      size: 1,
      type: "Sight"
    },
    {
      name: "Veil Flash Hider2",
      size: 2,
      type: "Barrel"
    },
    {
      name: "Veil Flash Hider3",
      size: 3,
      type: "Barrel"
    },
    {
      name: "Emod Stabilizer1",
      size: 1,
      type: "Barrel"
    },
    {
      name: "Emod Stabilizer2",
      size: 2,
      type: "Barrel"
    },
    {
      name: "Emod Stabilizer3",
      size: 3,
      type: "Barrel"
    },
    {
      name: "Sion Compensator3",
      size: 3,
      type: "Barrel"
    },
    {
      name: "Sion Compensator2",
      size: 2,
      type: "Barrel"
    },
    {
      name: "Sion Compensator1  ",
      size: 1,
      type: "Barrel"
    },
    {
      name: "Veil Flash Hider1",
      size: 1,
      type: "Barrel"
    },
    {
      name: "Tacit Suppressor3",
      size: 3,
      type: "Barrel"
    },
    {
      name: "Tacit Suppressor2",
      size: 2,
      type: "Barrel"
    },
    {
      name: "Tacit Suppressor1",
      size: 1,
      type: "Barrel"
    },
  ]

  GetAttachmentSlots(name: string): WeaponAttachmentSlot[] {
    var slots = this.specificSlots[name];

    if (slots === undefined) {
      if (name.includes('Pistol')) {
        slots = this.generalSlots['Pistol']
      } else if (name.includes('Sniper Rifle')) {
        slots = this.generalSlots['Sniper Rifle']
      } else if (name.includes('Rifle')) {
        slots = this.generalSlots['Rifle']
      } else if (name.includes('LMG')) {
        slots = this.generalSlots['LMG']
      } else if (name.includes('SMG')) {
        slots = this.generalSlots['SMG']
      } else if (name.includes('Shotgun')) {
        slots = this.generalSlots['Shotgun']
      } else {
        slots = this.generalSlots['default']
      }

    }

    return slots;
  }

  GetAttachments(type: string, size: number): WeaponAttachment[] {

    return type === 'Barrel' ? this.attachments.filter(a => a.type === type && a.size === size) : this.attachments.filter(a => a.type === type && a.size <= size);
  }
}

export default new WeaponAttachmentProvider();