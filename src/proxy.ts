import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getNeonAuth } from '@/lib/auth/server'
import {
  isAdminRootRequest,
  shouldProcessNeonAuthRequest,
} from '@/lib/auth/proxy-routing'

export function proxy(request: NextRequest) {
  if (shouldProcessNeonAuthRequest(request.nextUrl)) {
    return getNeonAuth().middleware({ loginUrl: '/auth/sign-in' })(request)
  }

  if (
    isAdminRootRequest(
      request.headers.get('host'),
      request.nextUrl.pathname
    )
  ) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
