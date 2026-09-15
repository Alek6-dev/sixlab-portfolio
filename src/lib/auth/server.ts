import 'server-only'
import { createNeonAuth, type NeonAuth } from '@neondatabase/auth/next/server'
import { readNeonAuthEnvironment } from '@/lib/auth/config'

let neonAuth: NeonAuth | undefined

export function getNeonAuth() {
  if (!neonAuth) {
    const environment = readNeonAuthEnvironment()

    neonAuth = createNeonAuth({
      baseUrl: environment.baseUrl,
      cookies: {
        secret: environment.cookieSecret,
      },
    })
  }

  return neonAuth
}
