import axios from 'axios'
import { orderBy } from 'lodash'
import { SingleResultObject } from '../types/types'
import { ApiClient } from './client'
import { AmmunitionVM } from './viewModels/AmmunitionVM'
import { ArmorVM } from './viewModels/ArmorVM'
import { AttachmentVM } from './viewModels/AttachmentVM'
import { FPSGearBaseVM } from './viewModels/FPSGearBaseVM'
import { RetailProductVM } from './viewModels/RetailProductVM'
import { WeaponVM } from './viewModels/WeaponVM'



const ArmorsEndpoint = '/armors'
const WeaponsEndpoint = '/weapons'
const AttachmentsEndpoint = '/attachments'
const ConsumablesEndpoint = '/consumables'
const AmmunitionsEndpoint = '/ammunitions'

class GearServiceClient extends ApiClient {
  constructor() {
    super()

    const value = localStorage.getItem('wasPtu')
    if (
      value === undefined ||
      value === 'false' ||
      import.meta.env.VITE_PTU_ENABLED === 'false'
    ) {
      this.isPtu = false
      this.url = import.meta.env.VITE_GEAR_LIVE_URL || ''
    } else {
      this.url = import.meta.env.VITE_GEAR_PTU_URL || ''
      this.isPtu = true
    }

    this.instance = axios.create({
      baseURL: this.url,
    })

    this.token = ''

    const password = this.isPtu
      ? import.meta.env.VITE_GEAR_PTU_PASS!
      : import.meta.env.VITE_GEAR_LIVE_PASS!

    this.authenticationPromise = super.Authorize(
      '/authentication/applogin',
      password
    )
  }

  /**
   *
   * @param isPtu set to true if PTU is enabled
   */
  override ChangeAPIs(isPtu: boolean) {
    this.isPtu = isPtu
    this.url = isPtu
      ? import.meta.env.VITE_GEAR_PTU_URL!
      : import.meta.env.VITE_GEAR_LIVE_URL!

    this.instance = axios.create({
      baseURL: this.url,
    })
  }

  async GetArmorInfo(name: string): Promise<SingleResultObject<ArmorVM>> {
    const result = await this.instance.get(
      `${this.url + ArmorsEndpoint}?$filter=localizedName eq '${name}'`
    )
    return {
      success: result.status === 200,
      message: result.statusText,
      data: result.data[0],
    }
  }

  async GetArmors(filter = ''): Promise<ArmorVM[]> {
    await this.authenticationPromise

    const result = await this.instance.get(this.url + ArmorsEndpoint + filter)

    return orderBy(result.data, (v: ArmorVM) => v.localizedName)
  }

  async GetArmorPartByLocalizedName(
    part: string,
    localizedName: string
  ): Promise<ArmorVM[]> {
    return this.GetArmors(
      `?$filter=armorPart eq '${part}' and contains(tolower(localizedName),'${localizedName.toLowerCase()}')`
    )
  }

  async GetWeapons(filter = ''): Promise<WeaponVM[]> {
    await this.authenticationPromise

    const result = await this.instance.get(this.url + WeaponsEndpoint + filter)
    return orderBy(result.data, (v: WeaponVM) => v.localizedName)
  }

  async GetWeaponsByType(name: string, type: string): Promise<WeaponVM[]> {
    return this.GetWeapons(
      `?$filter=type eq '${type}' and contains(tolower(localizedName),'${name.toLowerCase()}')`
    )
  }

  async GetPrimaryWeapons(name = ''): Promise<WeaponVM[]> {
    return this.GetWeapons(
      `?$filter=type ne 'Pistol' and type ne 'Utility' and type ne 'Knife' and contains(tolower(localizedName),'${name.toLowerCase()}')`
    )
  }

  async GetWeaponByName(name: string): Promise<WeaponVM> {
    const [first] = await this.GetWeapons(`?$filter=localizedName eq '${name}'`)
    return first
  }

  async GetWeaponInfo(name: string): Promise<SingleResultObject<WeaponVM>> {
    const { status, statusText, data } = await this.instance.get(
      `${this.url + WeaponsEndpoint}?$filter=localizedName eq '${name}'`
    )

    return {
      success: status === 200,
      message: statusText,
      data: data[0],
    }
  }

  async GetConsumable(filter = ''): Promise<FPSGearBaseVM[]> {
    const result = await this.instance.get(
      this.url + ConsumablesEndpoint + filter
    )
    return orderBy(result.data, (v: WeaponVM) => v.localizedName)
  }

  async GetAttachments(filter = ''): Promise<AttachmentVM[]> {
    const result = await this.instance.get(
      `${
        this.url + AttachmentsEndpoint
      }?$filter=contains(tolower(LocalizedName),'${filter.toLowerCase()}')`
    )
    return orderBy(result.data, (v: RetailProductVM) => v.LocalizedName)
  }

  async GetTools(name = ''): Promise<WeaponVM[]> {
    return this.GetWeapons(
      `?$filter=(type eq 'Utility' or type eq 'Medical Device' or type eq 'Knife') and contains(tolower(localizedName),'${name.toLowerCase()}')`
    )
  }

  async GetUsable(filter = ''): Promise<FPSGearBaseVM[]> {
    return [
      ...(await this.GetTools(filter)),
      ...(await this.GetConsumable(filter)),
    ]
  }

  async GetAmmunitionByReference(reference: string): Promise<AmmunitionVM> {
    const result = await this.instance.get<AmmunitionVM[]>(
      `${this.url + AmmunitionsEndpoint}?$filter=reference eq ${reference}`
    )
    return result.data[0]
  }
}

export default new GearServiceClient()
