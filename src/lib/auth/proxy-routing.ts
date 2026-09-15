const neonAuthVerifierParameter = 'neon_auth_session_verifier'

export function shouldProcessNeonAuthRequest(url: URL) {
  const isAdminRoute =
    url.pathname === '/admin' || url.pathname.startsWith('/admin/')
  const isOAuthReturn = url.searchParams.has(neonAuthVerifierParameter)

  return isAdminRoute || isOAuthReturn
}
