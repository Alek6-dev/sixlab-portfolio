const minimumCookieSecretLength = 32

export type NeonAuthEnvironment = {
  baseUrl: string
  cookieSecret: string
  adminGitHubAccountId: string
}

export function readNeonAuthEnvironment(
  environment: Record<string, string | undefined> = process.env
): NeonAuthEnvironment {
  const baseUrl = environment.NEON_AUTH_BASE_URL?.trim()
  const cookieSecret = environment.NEON_AUTH_COOKIE_SECRET?.trim()
  const adminGitHubAccountId = environment.ADMIN_GITHUB_ACCOUNT_ID?.trim()

  if (!baseUrl || !cookieSecret || !adminGitHubAccountId) {
    throw new Error('Neon Auth is not configured.')
  }

  if (cookieSecret.length < minimumCookieSecretLength) {
    throw new Error('Neon Auth cookie secret is invalid.')
  }

  if (!/^https:\/\//.test(baseUrl)) {
    throw new Error('Neon Auth base URL is invalid.')
  }

  if (!/^\d+$/.test(adminGitHubAccountId)) {
    throw new Error('GitHub administrator account ID is invalid.')
  }

  return {
    baseUrl,
    cookieSecret,
    adminGitHubAccountId,
  }
}
