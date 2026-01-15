import { NextResponse } from "next/server"
import { Resend } from "resend"
import { quoteSubmissionSchema } from "@/lib/validations"
import { calculatePrice } from "@/lib/pricing"
import { generateQuoteEmailHTML } from "@/lib/email-templates"
import { checkRateLimit } from "@/lib/rate-limit"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 })
    }

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    // Verify Turnstile
    const { captchaToken } = body
    if (!captchaToken) {
      return NextResponse.json({ error: "Captcha token is missing" }, { status: 400 })
    }

    const turnstileResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY || "",
        response: captchaToken,
      }),
    })
    const turnstileData = await turnstileResponse.json()

    if (!turnstileData.success) {
      return NextResponse.json({ error: "Captcha verification failed" }, { status: 400 })
    }

    // Validate input
    const validatedData = quoteSubmissionSchema.parse(body)

    // Calculate pricing
    const breakdown = calculatePrice(validatedData)

    // --- Record in Supabase First (to get the official ID for the email) ---
    let finalQuoteId = validatedData.reservedQuoteId || "QT-PENDING"

    try {
      const { supabase, getSupabaseAdmin } = await import("@/lib/supabase")

      // Use Admin client if available, fallback to standard supabase client
      // The admin client bypasses RLS, but standard client relies on the 'Anyone can insert' policy
      const adminClient = getSupabaseAdmin()
      const db = adminClient || supabase

      const insertData: any = {
        full_name: validatedData.fullName,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        notes: validatedData.notes,
        total_price: breakdown.total,
        details: {
          inputs: validatedData,
          breakdown: breakdown,
        },
        status: "pending",
      }

      if (validatedData.reservedQuoteId) {
        insertData.quote_id = validatedData.reservedQuoteId;
      }

      console.log(`[Quotes API] Recording quote in Supabase using ${adminClient ? 'Admin' : 'Anon'} client...`, insertData.quote_id || "new")

      const { data: quoteData, error: dbError } = await db
        .from("quotes")
        .insert([insertData])
        .select("quote_id")
        .single()

      if (dbError) {
        console.error("[Quotes API] Database error:", dbError)
        return NextResponse.json({
          success: false,
          error: `Failed to save to dashboard: ${dbError.message}`
        }, { status: 400 })
      }

      if (quoteData?.quote_id) {
        finalQuoteId = quoteData.quote_id
      }
    } catch (dbError) {
      console.error("[Quotes API] Unexpected DB error:", dbError)
    }

    // Generate email HTML with the FINAL ID
    const emailHTML = generateQuoteEmailHTML(
      {
        ...validatedData,
        quoteId: finalQuoteId,
      },
      validatedData,
      breakdown,
    )

    // Send emails
    console.log("[Quotes API] Sending emails for:", finalQuoteId)

    const [bizEmail, userEmail] = await Promise.all([
      resend.emails.send({
        from: process.env.FROM_EMAIL || "no-reply@mdeploy.dev",
        to: process.env.BUSINESS_TO_EMAIL || "hello@mdeploy.dev",
        subject: `New Quote Request [${finalQuoteId}] from ${validatedData.fullName}`,
        html: emailHTML,
      }),
      resend.emails.send({
        from: process.env.FROM_EMAIL || "no-reply@mdeploy.dev",
        to: validatedData.email,
        subject: `Your mDeploy Quote Request - ${finalQuoteId}`,
        html: emailHTML,
      })
    ])

    return NextResponse.json({
      success: true,
      quoteId: finalQuoteId,
      emailSent: !bizEmail.error && !userEmail.error
    })

  } catch (error) {
    console.error("[v0] Quote submission error:", error)
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 })
  }
}
