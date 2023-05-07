// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  /*
  Check if user might be logged in by seeing if he has the session-token cookie
  This doesn't guarantee that the user is logged in, but it will resolve most
  of the times where unauthenticated content would flash before redirecting to /login
  */
  if (
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get("__Secure-next-auth.session-token")
  ) {
    return res;
  } else {
    const url = new URL(`/login`, request.url);
    url.searchParams.set("callbackUrl", encodeURI(request.url));
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - login (unauthenticated page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
