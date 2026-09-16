const neonAuthVerifierParameter = 'neon_auth_session_verifier'
const adminHostname = 'admin.sixlab.fr'
const localHostnames = new Set(['localhost', '127.0.0.1', '[::1]'])

function readHostname(host: string | null) {
  if (!host) return null

  try {
    return new URL(`http://${host}`).hostname.toLowerCase()
  } catch {
    return null
  }
}

function isAdminSurfacePath(pathname: string) {
  return (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    pathname === '/auth/sign-in' ||
    pathname.startsWith('/auth/sign-in/') ||
    pathname === '/api/auth' ||
    pathname.startsWith('/api/auth/')
  )
}

export function getAdminHostRedirect(host: string | null, url: URL) {
  const hostname = readHostname(host)

  if (
    !hostname ||
    hostname === adminHostname ||
    localHostnames.has(hostname)
  ) {
    return null
  }

  const isOAuthReturn = url.searchParams.has(neonAuthVerifierParameter)

  if (!isAdminSurfacePath(url.pathname) && !isOAuthReturn) {
    return null
  }

  const redirectUrl = new URL(url)
  redirectUrl.protocol = 'https:'
  redirectUrl.hostname = adminHostname
  redirectUrl.port = ''

  return redirectUrl
}

export function isAdminRootRequest(host: string | null, pathname: string) {
  const hostname = readHostname(host)

  return hostname === adminHostname && pathname === '/'
}

export function shouldProcessNeonAuthRequest(url: URL) {
  const isAdminRoute =
    url.pathname === '/admin' || url.pathname.startsWith('/admin/')
  const isOAuthReturn = url.searchParams.has(neonAuthVerifierParameter)

  return isAdminRoute || isOAuthReturn
}
