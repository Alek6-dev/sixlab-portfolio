const neonAuthVerifierParameter = 'neon_auth_session_verifier'
const adminHostname = 'admin.sixlab.fr'

export function isAdminRootRequest(host: string | null, pathname: string) {
  const hostname = host?.split(':', 1)[0].toLowerCase()

  return hostname === adminHostname && pathname === '/'
}

export function shouldProcessNeonAuthRequest(url: URL) {
  const isAdminRoute =
    url.pathname === '/admin' || url.pathname.startsWith('/admin/')
  const isOAuthReturn = url.searchParams.has(neonAuthVerifierParameter)

  return isAdminRoute || isOAuthReturn
}
