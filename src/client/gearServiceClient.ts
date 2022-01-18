import { ApiClient } from "./client";
import axios, { AxiosInstance } from "axios";
import { SingleResultObject } from "../types/types";
import { ArmorVM } from "./viewModels/ArmorVM";

const ArmorsEndpoint = "/armors";
const WeaponsEndpoint = "/weapons";
const AttachmentsEndpoint = "/attachments";
const ConsumablesEndpoint = "/consumables";

class GearServiceClient extends ApiClient {
  constructor() {
    super();

    const value = localStorage.getItem("wasPtu");
    if (value === undefined || value === "false") {
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

    this.authenticationPromise = super.Authorize();
  }

  /**
   *
   * @param isPtu set to true if PTU is enabled
   */
  override async ChangeAPIs(isPtu: boolean) {
    if (isPtu) {
      this.url = process.env.REACT_APP_GEAR_PTU_URL || "";
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_GEAR_PTU_URL,
      });
      this.isPtu = true;
    } else {
      this.url = process.env.REACT_APP_GEAR_LIVE_URL || "";
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_GEAR_LIVE_URL,
      });
      this.isPtu = false;
    }
  }

  async GetArmorInfo(name: string): Promise<SingleResultObject<ArmorVM>> {
    let result = await this.instance.get(
      this.url + ArmorsEndpoint + `?$filter=LocalizedName eq '${name}'`
    );
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data.value[0],
    };
  }
}

export default new GearServiceClient();
