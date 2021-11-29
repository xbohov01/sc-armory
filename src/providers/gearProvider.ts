import client from "../client/client";
import { ArmorVM } from "../client/viewModels/ArmorVM";
import { FPSGearBaseVM } from "../client/viewModels/FPSGearBaseVM";
import { SelectOption } from "../types/types";

class GearProvider {
  public async GetGearOptions(type: string, filter: string): Promise<SelectOption[]> {
    let result: FPSGearBaseVM[] = [];

    switch (type) {
      case 'Helmet':
        result = await client.GetHelmets(filter);
        break;

      case 'Arms':
        result = await client.GetArms(filter);
        break;

      case 'Core':
        result = await client.GetCores(filter);
        break;

      case 'Legs':
        result = await client.GetLegs(filter);
        break;

      case 'Backpack':
        result = await client.GetBackpacks(filter);
        break;

      case 'Sidearm':
        result = await client.GetPistols(filter);
        break;

      case 'Undersuit':
        result = await client.GetUndersuits(filter);
        break;

      case 'Usable':
        result = await client.GetUsable(filter);
        break;

      case 'Primary':
      case 'Secondary':
        result = await client.GetWeapons(filter);
        break;

      case 'Tool':
        result = await client.GetTools(filter);
        break;

      default:
        result = [];
        break;
    }

    return result.map((g) => {
      return {
        value: g.Id.toString(),
        label: g.LocalizedName,
        type: this.GetArmorTypeFromDesc(g.LocalizedDescription)
      }
    });
  }

  public async GetBackpacksWithMaxSize(filter: string, size: number): Promise<SelectOption[]> {
    let result = await client.GetBackpacks(filter);

    return result.filter(b => b.Size <= size)
      .map((g) => {
        return {
          value: g.Id.toString(),
          label: g.LocalizedName,
          type: this.GetArmorTypeFromDesc(g.LocalizedDescription)
        }
      });
  }

  public async GetCore(name: string): Promise<ArmorVM> {
    let result = await client.GetCoreByName(name);
    return result[0];
  }


  // Change this to retrieve from API
  private GetArmorTypeFromDesc(description: string): string {
    if (description.includes('Item Type: Heavy Armor')){
      return 'Heavy'
    }
    if (description.includes('Item Type: Medium Armor')){
      return 'Medium'
    }
    if (description.includes('Item Type: Light Armor')){
      return 'Light'
    }
    return '';
  }

}

export default new GearProvider();