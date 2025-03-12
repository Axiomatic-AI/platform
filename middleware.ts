import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth0 } from 'lib/auth0';

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request)

  // authentication routes — let the middleware handle it
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes
  }

  const { origin } = new URL(request.url)
  const session = await auth0.getSession()

  // user does not have a session — redirect to login
  if (!session) {
    return NextResponse.redirect(`${origin}/auth/login`)
  }

  return authRes
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - static (public static files)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|images|static).*)',
  ],
};