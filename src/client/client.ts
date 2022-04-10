/* eslint-disable camelcase */
import axios, { AxiosInstance } from 'axios'
import { sha3_512 } from 'js-sha3'

const AuthenticationEndpoint = '/serviceaccounts'

export class ApiClient {
  instance!: AxiosInstance

  url!: string

  cloudinary: string

  isPtu!: boolean

  token: string

  authenticationPromise!: Promise<string>

  constructor() {
    const wasPtu = localStorage.getItem('wasPtu') === 'true'
    this.ChangeAPIs(wasPtu)
    this.cloudinary =
      import.meta.env.VITE_CLOUDINARY_URL ||
      'https://res.cloudinary.com/thespacecoder/image/upload/v1630349759/armory/'
    this.token = ''

    // this.authenticationPromise = this.Authorize();
  }

  async Authorize(
    endpoint = '',
    password: string = this.isPtu
      ? import.meta.env.VITE_PTU_PASSWORD
      : import.meta.env.VITE_PASSWORD
  ): Promise<string> {
    const code = (Math.random() + 1).toString(36).substring(2)
    const username = this.isPtu
      ? import.meta.env.VITE_PTU_LOGIN
      : import.meta.env.VITE_LOGIN

    try {
      const result = await this.instance.post(
        `${this.url}${
          endpoint !== '' ? endpoint : `${AuthenticationEndpoint}/login`
        }`,
        {
          username,
          sequence: sha3_512(password + code),
          code,
        }
      )

      this.SetToken(result.data.token)
      return result.data.token
    } catch (error: unknown) {
      console.warn(`Authentication failed ${(error as Error).message}`)
      return ''
    }
  }

  SetToken(token: string) {
    this.token = token

    this.instance.interceptors.request.use((config) => ({
      ...config,
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    }))
  }

  ChangeAPIs(isPtu: boolean) {
    this.isPtu = isPtu
    this.url = isPtu
      ? import.meta.env.VITE_API_PTU_URL
      : import.meta.env.VITE_API_URL
    this.instance = axios.create({
      baseURL: this.url,
    })
  }

  async CheckIfImageExists(imageId: string): Promise<boolean> {
    try {
      const { status } = await axios.head(this.cloudinary + imageId)
      return status === 200
    } catch (e) {
      return false
    }
  }
}

export default new ApiClient()
