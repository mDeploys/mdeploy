import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow the login page and static assets
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/_next") || pathname.startsWith("/public")) {
    return NextResponse.next()
  }

  // Gate any /admin path - check for Supabase session
  if (pathname.startsWith("/admin")) {
    // Check for Supabase auth token in cookies
    const authToken = req.cookies.get("sb-auth-token")?.value
    
    if (!authToken) {
      const url = req.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
