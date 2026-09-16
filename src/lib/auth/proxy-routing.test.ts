import { describe, expect, it } from 'vitest'
import {
  getAdminHostRedirect,
  isAdminRootRequest,
  shouldProcessNeonAuthRequest,
} from '@/lib/auth/proxy-routing'

describe('getAdminHostRedirect', () => {
  it('redirige les pages administrateur vers le sous-domaine dédié', () => {
    expect(
      getAdminHostRedirect(
        'www.sixlab.fr',
        new URL('https://www.sixlab.fr/admin/submissions?period=current')
      )?.toString()
    ).toBe(
      'https://admin.sixlab.fr/admin/submissions?period=current'
    )

    expect(
      getAdminHostRedirect(
        'sixlab.fr',
        new URL('https://sixlab.fr/auth/sign-in')
      )?.toString()
    ).toBe('https://admin.sixlab.fr/auth/sign-in')

    expect(
      getAdminHostRedirect(
        'sixlab-portfolio.vercel.app',
        new URL('https://sixlab-portfolio.vercel.app/api/auth/session')
      )?.toString()
    ).toBe('https://admin.sixlab.fr/api/auth/session')
  })

  it('redirige le retour OAuth avant de créer les cookies de session', () => {
    expect(
      getAdminHostRedirect(
        'www.sixlab.fr',
        new URL(
          'https://www.sixlab.fr/?neon_auth_session_verifier=temporary-value'
        )
      )?.toString()
    ).toBe(
      'https://admin.sixlab.fr/?neon_auth_session_verifier=temporary-value'
    )
  })

  it('laisse le sous-domaine administrateur et le développement local inchangés', () => {
    expect(
      getAdminHostRedirect(
        'admin.sixlab.fr',
        new URL('https://admin.sixlab.fr/admin')
      )
    ).toBeNull()
    expect(
      getAdminHostRedirect(
        'localhost:3100',
        new URL('http://localhost:3100/admin')
      )
    ).toBeNull()
    expect(
      getAdminHostRedirect(
        '127.0.0.1:3100',
        new URL('http://127.0.0.1:3100/admin')
      )
    ).toBeNull()
  })

  it('ne redirige pas les pages publiques', () => {
    expect(
      getAdminHostRedirect(
        'www.sixlab.fr',
        new URL('https://www.sixlab.fr/projects/myqassist')
      )
    ).toBeNull()
    expect(
      getAdminHostRedirect(null, new URL('https://www.sixlab.fr/admin'))
    ).toBeNull()
  })
})

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
