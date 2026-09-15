import { describe, expect, it } from 'vitest'
import { readNeonAuthEnvironment } from '@/lib/auth/config'

describe('readNeonAuthEnvironment', () => {
  const validEnvironment = {
    NEON_AUTH_BASE_URL: 'https://example.neonauth.eu-central-1.aws.neon.tech/neondb/auth',
    NEON_AUTH_COOKIE_SECRET: 'a-secure-cookie-secret-with-32-characters',
    ADMIN_GITHUB_ACCOUNT_ID: '12345678',
  }

  it('returns a complete validated configuration', () => {
    expect(readNeonAuthEnvironment(validEnvironment)).toEqual({
      baseUrl: validEnvironment.NEON_AUTH_BASE_URL,
      cookieSecret: validEnvironment.NEON_AUTH_COOKIE_SECRET,
      adminGitHubAccountId: validEnvironment.ADMIN_GITHUB_ACCOUNT_ID,
    })
  })

  it('rejects missing values', () => {
    expect(() => readNeonAuthEnvironment({})).toThrow('Neon Auth is not configured.')
  })

  it('rejects a GitHub username in place of the stable account ID', () => {
    expect(() =>
      readNeonAuthEnvironment({
        ...validEnvironment,
        ADMIN_GITHUB_ACCOUNT_ID: 'Alek6-dev',
      })
    ).toThrow('GitHub administrator account ID is invalid.')
  })
})
