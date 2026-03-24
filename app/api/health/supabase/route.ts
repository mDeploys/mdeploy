import { lookup } from "node:dns/promises"
import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function getSupabaseHostname(url: string) {
  try {
    return new URL(url).hostname
  } catch {
    return null
  }
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json(
      {
        configured: false,
        reachable: false,
        reason: "missing_env",
      },
      { status: 503 }
    )
  }

  const hostname = getSupabaseHostname(supabaseUrl)

  if (!hostname) {
    return NextResponse.json(
      {
        configured: false,
        reachable: false,
        reason: "invalid_url",
      },
      { status: 503 }
    )
  }

  try {
    await lookup(hostname)
  } catch {
    return NextResponse.json(
      {
        configured: true,
        reachable: false,
        reason: "dns_lookup_failed",
      },
      { status: 503 }
    )
  }

  try {
    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: {
        apikey: supabaseAnonKey,
      },
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json(
        {
          configured: true,
          reachable: false,
          reason: "auth_health_failed",
          status: response.status,
        },
        { status: 503 }
      )
    }
  } catch {
    return NextResponse.json(
      {
        configured: true,
        reachable: false,
        reason: "fetch_failed",
      },
      { status: 503 }
    )
  }

  return NextResponse.json({
    configured: true,
    reachable: true,
  })
}
