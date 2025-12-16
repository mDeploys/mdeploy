import { NextResponse } from "next/server"

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function parseRateCookie(val?: string) {
  if (!val) return { c: 0, t: Date.now() }
  try {
    const parsed = JSON.parse(val)
    if (typeof parsed.c !== "number" || typeof parsed.t !== "number") {
      return { c: 0, t: Date.now() }
    }
    return parsed as { c: number; t: number }
  } catch {
    return { c: 0, t: Date.now() }
  }
}

export async function POST(req: Request) {
  try {
    // Simple cookie-based rate limiting per browser
    const url = new URL(req.url)
    const cookieHeader = req.headers.get("cookie") || ""
    const match = /admin_rl=([^;]+)/.exec(cookieHeader)
    const rl = parseRateCookie(match?.[1])
    const now = Date.now()
    if (now - rl.t > WINDOW_MS) {
      rl.c = 0
      rl.t = now
    }
    if (rl.c >= MAX_ATTEMPTS) {
      const res429 = NextResponse.json({ error: "Too many attempts. Try later." }, { status: 429 })
      res429.cookies.set("admin_rl", JSON.stringify(rl), {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: WINDOW_MS / 1000,
      })
      return res429
    }

    const body = await req.json().catch(() => ({})) as { password?: string }
    const ok = body?.password && process.env.ADMIN_PASSWORD && body.password === process.env.ADMIN_PASSWORD
    if (!ok) {
      rl.c += 1
      const res401 = NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      res401.cookies.set("admin_rl", JSON.stringify(rl), {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
        maxAge: WINDOW_MS / 1000,
      })
      return res401
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set("admin_session", "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 8,
    })
    // Reset rate limit on successful login
    res.cookies.set("admin_rl", JSON.stringify({ c: 0, t: Date.now() }), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: WINDOW_MS / 1000,
    })
    return res
  } catch (e) {
    return NextResponse.json({ error: "Bad Request" }, { status: 400 })
  }
}
