import client from "./client/client";
import { RetailProductVM } from "./client/RetailProductVM";
import { SelectOption } from "./types/types";

class GearProvider {
  public async GetGearOptions(type: string, filter: string): Promise<SelectOption[]> {
    let result: RetailProductVM[] = [];

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

      case 'Sidearm':
        result = await client.GetPistols(filter);
        break;

      case 'Undersuit':
        result = await client.GetUndersuits(filter);
        break;

      case 'Primary':
      case 'Secondary':
        result = await client.GetWeapons(filter);
        break;

      default:
        result = [];
        break;
    }

    return result.map((g) => {
      return {
        value: g.Id.toString(),
        label: g.LocalizedName
      }
    });
  }

  public async GetCore(name:string):Promise<RetailProductVM>{
    let result = await client.GetCoreByName(name);
    return result.value[0];
  }

}

export default new GearProvider();