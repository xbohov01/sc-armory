import { WeaponAttachmentSlot } from "./types/types";

class WeaponAttachmentProvider {
  specifictAttachments:{[id:string]:WeaponAttachmentSlot[]} = {
    "Coda" : [
      {size:1, type: 'barrel'}
    ]
  };

  generalAttachments:{[id:string]:WeaponAttachmentSlot[]} = {
    "Pistol" : [
      {size:1, type: 'barrel'},
      {size:1, type: 'under'},
      {size:1, type: 'sight'},
    ]
  };

  GetAttachmentSlots(name:string) {
    var attachments = this.specifictAttachments[name];

    if (attachments === undefined){
      if (name.includes('Pistol')){
        return this.generalAttachments['Pistol']
      }
    }

    return attachments;
  }
}

export default new WeaponAttachmentProvider();