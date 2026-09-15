import 'server-only'
import { readNeonAuthEnvironment } from '@/lib/auth/config'
import { hasExpectedGitHubAccount } from '@/lib/auth/policy'
import { getNeonAuth } from '@/lib/auth/server'

export type AdminAccessFailure = 'unauthenticated' | 'forbidden' | 'unavailable'

export class AdminAccessError extends Error {
  constructor(readonly reason: AdminAccessFailure) {
    super('Administrative access denied.')
    this.name = 'AdminAccessError'
  }
}

export async function requireAdminIdentity() {
  const environment = readNeonAuthEnvironment()
  const auth = getNeonAuth()
  const sessionResult = await auth.getSession()

  if (sessionResult.error) {
    throw new AdminAccessError('unavailable')
  }

  if (!sessionResult.data?.user) {
    throw new AdminAccessError('unauthenticated')
  }

  const accountsResult = await auth.listAccounts()

  if (accountsResult.error || !accountsResult.data) {
    throw new AdminAccessError('unavailable')
  }

  if (
    !hasExpectedGitHubAccount(
      accountsResult.data,
      environment.adminGitHubAccountId
    )
  ) {
    throw new AdminAccessError('forbidden')
  }

  return sessionResult.data.user
}
