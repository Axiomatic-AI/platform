import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth0 } from 'lib/auth0';

const getApiKey = () => {
  if (!process.env.AXIOMATIC_API_KEY) {
    throw new Error('AXIOMATIC_API_KEY is not set');
  }
  return process.env.AXIOMATIC_API_KEY;
};

export async function middleware(request: NextRequest) {
  // Handle API requests with authorization header
  if (request.nextUrl.pathname.startsWith('/backend-api')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('X-Api-Key', getApiKey());
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    // For auth routes, let Auth0 handle them directly
    return auth0.middleware(request);
  }

  const session = await auth0.getSession();
  if (!session) {
    const { origin } = new URL(request.url);
    return NextResponse.redirect(`${origin}/auth/login`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: 
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - static (public static files)
     */
    '/((?!_next/static|_next/image|favicon.ico|images|static).*)',
};