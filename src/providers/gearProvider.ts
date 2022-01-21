import gearServiceClient from "../client/gearServiceClient";
import { ArmorVM } from "../client/viewModels/ArmorVM";
import { FPSGearBaseVM } from "../client/viewModels/FPSGearBaseVM";
import { SelectOption } from "../types/types";

class GearProvider {
  public async GetGearOptions(
    type: string,
    filter: string
  ): Promise<SelectOption[]> {
    let result: FPSGearBaseVM[] = [];

    switch (type) {
      case "Helmet":
      case "Arms":
      case "Core":
      case "Legs":
      case "Undersuit":
        result = await gearServiceClient.GetArmorPartByLocalizedName(
          type,
          filter
        );
        break;

      case "Sidearm":
        result = await gearServiceClient.GetWeaponsByType(filter, "Pistol");
        break;

      case "Usable":
        result = await gearServiceClient.GetUsable(filter);
        break;

      case "Primary":
      case "Secondary":
        result = await gearServiceClient.GetPrimaryWeapons(filter);
        break;

      case "Tool":
        result = await gearServiceClient.GetTools(filter);
        break;

      default:
        result = [];
        break;
    }

    return result.map((gear) => this.GearToSelectOption(gear));
  }

  public async GetBackpacksWithMaxSize(
    name: string,
    size: number
  ): Promise<SelectOption[]> {
    return (
      await gearServiceClient.GetArmorPartByLocalizedName("Backpack", name)
    )
      .filter((backpack) => backpack.size <= size)
      .map((backpack) => this.GearToSelectOption(backpack));
  }

  public async GetCore(name: string): Promise<ArmorVM> {
    const [first] = await gearServiceClient.GetArmorPartByLocalizedName(
      "Core",
      name
    );
    return first;
  }

  // Change this to retrieve from API
  private GetArmorTypeFromDesc(description: string): string {
    if (description.includes("Item Type: Heavy Armor")) {
      return "Heavy";
    }
    if (description.includes("Item Type: Medium Armor")) {
      return "Medium";
    }
    if (description.includes("Item Type: Light Armor")) {
      return "Light";
    }
    return "";
  }

  private GearToSelectOption(gear: FPSGearBaseVM): SelectOption {
    return {
      value: gear.id.toString(),
      label: gear.localizedName,
      type: this.GetArmorTypeFromDesc(gear.localizedDescription),
    };
  }
}

export default new GearProvider();
