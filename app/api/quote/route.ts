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
    const breakdown = calculatePrice({
      websitePages: validatedData.websitePages,
      webAppPages: validatedData.webAppPages,
      mobileScreens: validatedData.mobileScreens,
      desktopFunctions: validatedData.desktopFunctions,
    })

    // Generate email HTML
    const emailHTML = generateQuoteEmailHTML(
      {
        fullName: validatedData.fullName,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        notes: validatedData.notes,
      },
      {
        websitePages: validatedData.websitePages,
        webAppPages: validatedData.webAppPages,
        mobileScreens: validatedData.mobileScreens,
        desktopFunctions: validatedData.desktopFunctions,
      },
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
      subject: "Your MDeploy Quote Request",
      html: emailHTML,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Quote submission error:", error)
    return NextResponse.json({ error: "Failed to process quote request" }, { status: 500 })
  }
}
