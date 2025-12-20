import { NextRequest, NextResponse } from "next/server"

export function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl

//   // ✅ Allow signin page through
//   if (pathname.startsWith("/signin")) {
//     return NextResponse.next()
//   }

  const sessionToken =
    request.cookies.get("authjs.session-token") ??
    request.cookies.get("__Secure-authjs.session-token") ??
    request.cookies.get("next-auth.session-token") ??
    request.cookies.get("__Secure-next-auth.session-token")

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/about/:path*", "/session/:path*"],
}
