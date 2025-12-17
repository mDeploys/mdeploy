import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { ADMIN_AUTH_COOKIE } from "@/lib/admin-auth-cookie"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow the login page and static assets
  if (pathname.startsWith("/admin/login") || pathname.startsWith("/_next") || pathname.startsWith("/public")) {
    return NextResponse.next()
  }

  // Gate any /admin path - check for Supabase session
  if (pathname.startsWith("/admin")) {
    const hasAdminCookie = req.cookies.get(ADMIN_AUTH_COOKIE)

    if (!hasAdminCookie) {
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
