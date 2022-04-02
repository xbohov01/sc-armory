import axios from "axios";
import { orderBy } from "lodash";
import { ApiClient } from "./client";
import { SingleResultObject } from "../types/types";
import { ArmorVM } from "./viewModels/ArmorVM";
import { WeaponVM } from "./viewModels/WeaponVM";
import { FPSGearBaseVM } from "./viewModels/FPSGearBaseVM";
import { AttachmentVM } from "./viewModels/AttachmentVM";
import { RetailProductVM } from "./viewModels/RetailProductVM";
import { AmmunitionVM } from "./viewModels/AmmunitionVM";

const ArmorsEndpoint = "/armors";
const WeaponsEndpoint = "/weapons";
const AttachmentsEndpoint = "/attachments";
const ConsumablesEndpoint = "/consumables";
const AmmunitionsEndpoint = "/ammunitions";

class GearServiceClient extends ApiClient {
  constructor() {
    super();

    const value = localStorage.getItem("wasPtu");
    if (value === undefined || value === "false" || process.env.REACT_APP_PTU_ENABLED === "false") {
      this.isPtu = false;
      this.url = process.env.REACT_APP_GEAR_LIVE_URL || "";
    } else {
      this.url = process.env.REACT_APP_GEAR_PTU_URL || "";
      this.isPtu = true;
    }

    this.instance = axios.create({
      baseURL: this.url,
    });

    this.token = "";

    const password = this.isPtu
      ? process.env.REACT_APP_GEAR_PTU_PASS!
      : process.env.REACT_APP_GEAR_LIVE_PASS!;

    this.authenticationPromise = super.Authorize(
      "/authentication/applogin",
      password
    );
  }

  /**
   *
   * @param isPtu set to true if PTU is enabled
   */
  override ChangeAPIs(isPtu: boolean) {
    this.isPtu = isPtu;
    this.url = isPtu
      ? process.env.REACT_APP_GEAR_PTU_URL!
      : process.env.REACT_APP_GEAR_LIVE_URL!;

    this.instance = axios.create({
      baseURL: this.url,
    });
  }

  async GetArmorInfo(name: string): Promise<SingleResultObject<ArmorVM>> {
    const result = await this.instance.get(
      `${this.url + ArmorsEndpoint}?$filter=localizedName eq '${name}'`
    );
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data[0],
    };
  }

  async GetArmors(filter: string = ""): Promise<ArmorVM[]> {
    await this.authenticationPromise;

    const result = await this.instance.get(this.url + ArmorsEndpoint + filter);

    return orderBy(result.data, (v: ArmorVM) => v.localizedName);
  }

  async GetArmorPartByLocalizedName(
    part: string,
    localizedName: string
  ): Promise<ArmorVM[]> {
    return this.GetArmors(
      `?$filter=armorPart eq '${part}' and contains(tolower(localizedName),'${localizedName.toLowerCase()}')`
    );
  }

  async GetWeapons(filter: string = ""): Promise<WeaponVM[]> {
    await this.authenticationPromise;

    const result = await this.instance.get(this.url + WeaponsEndpoint + filter);
    return orderBy(result.data, (v: WeaponVM) => v.localizedName);
  }

  async GetWeaponsByType(name: string, type: string): Promise<WeaponVM[]> {
    return this.GetWeapons(
      `?$filter=type eq '${type}' and contains(tolower(localizedName),'${name.toLowerCase()}')`
    );
  }

  async GetPrimaryWeapons(name: string = ""): Promise<WeaponVM[]> {
    return this.GetWeapons(
      `?$filter=type ne 'Pistol' and type ne 'Utility' and type ne 'Knife' and contains(tolower(localizedName),'${name.toLowerCase()}')`
    );
  }

  async GetWeaponByName(name: string): Promise<WeaponVM> {
    const [first] = await this.GetWeapons(
      `?$filter=localizedName eq '${name}'`
    );
    return first;
  }

  async GetWeaponInfo(name: string): Promise<SingleResultObject<WeaponVM>> {
    const { status, statusText, data } = await this.instance.get(
      `${this.url + WeaponsEndpoint}?$filter=localizedName eq '${name}'`
    );

    return {
      success: status === 200,
      message: statusText,
      data: data[0],
    };
  }

  async GetConsumable(filter: string = ""): Promise<FPSGearBaseVM[]> {
    const result = await this.instance.get(
      this.url + ConsumablesEndpoint + filter
    );
    return orderBy(result.data, (v: WeaponVM) => v.localizedName);
  }

  async GetAttachments(filter: string = ""): Promise<AttachmentVM[]> {
    const result = await this.instance.get(
      `${
        this.url + AttachmentsEndpoint
      }?$filter=contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    );
    return orderBy(result.data, (v: RetailProductVM) => v.LocalizedName);
  }

  async GetTools(name: string = ""): Promise<WeaponVM[]> {
    return this.GetWeapons(
      `?$filter=(type eq 'Utility' or type eq 'Medical Device' or type eq 'Knife') and contains(tolower(localizedName),'${name.toLowerCase()}')`
    );
  }

  async GetUsable(filter: string = ""): Promise<FPSGearBaseVM[]> {
    return [
      ...(await this.GetTools(filter)),
      ...(await this.GetConsumable(filter)),
    ];
  }

  async GetAmmunitionByReference(reference: string): Promise<AmmunitionVM> {
    const result = await this.instance.get<AmmunitionVM[]>(`${this.url + AmmunitionsEndpoint}?$filter=reference eq ${reference}`);
    return result.data[0];
  }
}

export default new GearServiceClient();
