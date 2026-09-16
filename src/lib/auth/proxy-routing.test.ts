import { describe, expect, it } from 'vitest'
import {
  isAdminRootRequest,
  shouldProcessNeonAuthRequest,
} from '@/lib/auth/proxy-routing'

describe('isAdminRootRequest', () => {
  it('redirige uniquement la racine du sous-domaine administrateur', () => {
    expect(isAdminRootRequest('admin.sixlab.fr', '/')).toBe(true)
    expect(isAdminRootRequest('admin.sixlab.fr', '/admin')).toBe(false)
    expect(isAdminRootRequest('www.sixlab.fr', '/')).toBe(false)
    expect(isAdminRootRequest('localhost:3100', '/')).toBe(false)
    expect(isAdminRootRequest(null, '/')).toBe(false)
  })
})

describe('shouldProcessNeonAuthRequest', () => {
  it('laisse les pages publiques accessibles', () => {
    expect(shouldProcessNeonAuthRequest(new URL('https://sixlab.fr/'))).toBe(
      false
    )
    expect(
      shouldProcessNeonAuthRequest(new URL('https://sixlab.fr/projects/myqassist'))
    ).toBe(false)
  })

  it('traite les pages administrateur', () => {
    expect(
      shouldProcessNeonAuthRequest(new URL('https://admin.sixlab.fr/admin'))
    ).toBe(true)
    expect(
      shouldProcessNeonAuthRequest(
        new URL('https://admin.sixlab.fr/admin/submissions')
      )
    ).toBe(true)
  })

  it('traite le retour OAuth de Neon Auth', () => {
    expect(
      shouldProcessNeonAuthRequest(
        new URL('https://sixlab.fr/?neon_auth_session_verifier=temporary-value')
      )
    ).toBe(true)
  })
})
