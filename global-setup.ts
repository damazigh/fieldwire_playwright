import getJwt from './utils/auth.helper'

const __init = async (_) => {
  if (!process.env.ACCESS_TOKEN) {
    const accessToken = await getJwt()
    process.env.ACCESS_TOKEN = accessToken
  }
}

export default __init