// TODO: remove eslint-disable
/* eslint-disable class-methods-use-this */
import gearServiceClient from "../client/gearServiceClient";
import { AmmunitionInfo } from "../client/viewModels/AmmunitionVM";
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

  public async GetAmmunitionByReference(
    ammoContainerReference: string
  ): Promise<AmmunitionInfo> {
    const model = await gearServiceClient.GetAmmunitionByReference(
      ammoContainerReference
    );

    return {
      id: model.id,
      reference: model.reference,
      size: model.size,
      lifetime: model.lifetime,
      speed: model.speed,
      hitType: model.hitType,
      name: model.name,
      impactRadius: model.impactRadius,
      damagePhysical: {
        damage: model.damage.damagePhysical,
        damageDropMinDistance: model.damageDropMinDistance.damagePhysical,
        damageDropPerMeter: model.damageDropPerMeter.damagePhysical,
        damageDropMinDamage: model.damageDropMinDamage.damagePhysical,
      },
      damageEnergy: {
        damage: model.damage.damageEnergy,
        damageDropMinDistance: model.damageDropMinDistance.damageEnergy,
        damageDropPerMeter: model.damageDropPerMeter.damageEnergy,
        damageDropMinDamage: model.damageDropMinDamage.damageEnergy,
      },
      damageDistortion: {
        damage: model.damage.damageDistortion,
        damageDropMinDistance: model.damageDropMinDistance.damageDistortion,
        damageDropPerMeter: model.damageDropPerMeter.damageDistortion,
        damageDropMinDamage: model.damageDropMinDamage.damageDistortion,
      },
      damageThermal: {
        damage: model.damage.damageThermal,
        damageDropMinDistance: model.damageDropMinDistance.damageThermal,
        damageDropPerMeter: model.damageDropPerMeter.damageThermal,
        damageDropMinDamage: model.damageDropMinDamage.damageThermal,
      },
      damageBiochemical: {
        damage: model.damage.damageBiochemical,
        damageDropMinDistance: model.damageDropMinDistance.damageBiochemical,
        damageDropPerMeter: model.damageDropPerMeter.damageBiochemical,
        damageDropMinDamage: model.damageDropMinDamage.damageBiochemical,
      },
      damageStun: {
        damage: model.damage.damageStun,
        damageDropMinDistance: model.damageDropMinDistance.damageStun,
        damageDropPerMeter: model.damageDropPerMeter.damageStun,
        damageDropMinDamage: model.damageDropMinDamage.damageStun,
      },
    };
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
