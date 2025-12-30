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

    // Validate input
    const validatedData = quoteSubmissionSchema.parse(body)

    // Calculate pricing
    const breakdown = calculatePrice(validatedData)

    // Generate email HTML
    const emailHTML = generateQuoteEmailHTML(
      validatedData, // Client info
      validatedData, // Quote inputs
      breakdown,
    )

    // Send email to business
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "no-reply@mdeploy.dev",
      to: process.env.BUSINESS_TO_EMAIL || "hello@mdeploy.dev",
      subject: `New Quote Request from ${validatedData.fullName}`,
      html: emailHTML,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "no-reply@mdeploy.dev",
      to: validatedData.email,
      subject: "Your mDeploy Quote Request",
      html: emailHTML,
    })

    // --- Record in Supabase Admin Panel ---
    try {
      const { supabase } = await import("@/lib/supabase")

      // Determine dominant project type
      let projectType: 'website' | 'web_app' | 'mobile_app' | 'desktop_app' = 'website'
      if (validatedData.mobileScreens > 0) projectType = 'mobile_app'
      else if (validatedData.desktopFunctions > 0) projectType = 'desktop_app'
      else if (validatedData.webAppPages > 0 || validatedData.ecommercePages > 0) projectType = 'web_app'

      // Create description summary
      console.log("[Quotes API] Attempting to record quote in Supabase...")
      const { data: quoteData, error: dbError } = await supabase
        .from("quotes")
        .insert([
          {
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
          },
        ])
        .select("quote_id")
        .single()

      if (dbError) {
        console.error("[Quotes API] Database error:", dbError)
        return NextResponse.json({
          success: true,
          emailSent: true,
          error: "Recorded in email, but failed to save to dashboard."
        })
      }

      console.log("[Quotes API] Success! Created quote:", quoteData?.quote_id)
      return NextResponse.json({
        success: true,
        quoteId: quoteData?.quote_id
      })
    } catch (dbError) {
      console.error("[Quotes API] Unexpected error:", dbError)
      return NextResponse.json({ success: true, emailSent: true })
    }
  } catch (error) {
    console.error("[v0] Quote submission error:", error)
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 })
  }
}
