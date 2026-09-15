import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getNeonAuth } from '@/lib/auth/server'
import { shouldProcessNeonAuthRequest } from '@/lib/auth/proxy-routing'

export function proxy(request: NextRequest) {
  if (!shouldProcessNeonAuthRequest(request.nextUrl)) {
    return NextResponse.next()
  }

  return getNeonAuth().middleware({ loginUrl: '/auth/sign-in' })(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
