import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  /*
   * Check if user might be logged in by seeing if he has the session-token cookie
   * This doesn't guarantee that the user is logged in, but it will resolve most
   * of the times where unauthenticated content would flash before redirecting to /login
   */
  if (isLikelyAuthenticated(request)) return res;

  const currentUrl = new URL(request.url);
  const callbackPath = currentUrl.pathname + currentUrl.search;

  const loginUrl = new URL(`/login`, request.url);

  if (currentUrl.pathname != "/") loginUrl.searchParams.set("callbackUrl", encodeURI(callbackPath));

  return NextResponse.redirect(loginUrl);
}

function isLikelyAuthenticated(request: NextRequest): boolean {
  const cookieNames = ["next-auth.session-token", "__Secure-next-auth.session-token"];

  return cookieNames.some((cookieName) => request.cookies.get(cookieName) != null);
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
