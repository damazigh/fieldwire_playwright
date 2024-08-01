import { request } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

const getJwt = async (): Promise<string> => {
  const api_key = process.env.FW_API_KEY
  console.log(process.env.FW_API_KEY)
  if (!api_key) {
    throw new Error('Cannot instantiate tests without api key')
  }
  const super_service_url = process.env.SUPER_SERVICE_URL

  const context = await request.newContext({
    baseURL: super_service_url,
    extraHTTPHeaders: {
      'Fieldwire-Version' : process.env.FIELDWIRE_VERSION!
    },
  })

  const response = await context.post('/api_keys/jwt', {
    data: {
      api_token: api_key
    }
  })

  if (response.status() >= 400) {
    throw new Error(`Cannot exchange the api key to get a jwt ${await response.body()}`)
  }


  const result: { access_token: string } = (await response.json())

  return result.access_token
}

export default getJwt