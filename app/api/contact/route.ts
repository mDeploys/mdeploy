import { NextResponse } from "next/server"
import { Resend } from "resend"
import { contactFormSchema } from "@/lib/validations"
import { generateContactEmailHTML } from "@/lib/email-templates"
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
    if (!checkRateLimit(ip, 3, 60000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    // Verify hCaptcha
    const { captchaToken } = body
    if (!captchaToken) {
      return NextResponse.json({ error: "hCaptcha token is missing" }, { status: 400 })
    }

    const hcaptchaResponse = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY || "",
        response: captchaToken,
      }),
    })
    const hcaptchaData = await hcaptchaResponse.json()

    if (!hcaptchaData.success) {
      return NextResponse.json({ error: "hCaptcha verification failed" }, { status: 400 })
    }

    // Validate input
    const validatedData = contactFormSchema.parse(body)

    // Generate email HTML
    const emailHTML = generateContactEmailHTML({
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      message: validatedData.message,
    })

    // Send email to business
    await resend.emails.send({
      from: process.env.FROM_EMAIL || "no-reply@mdeploy.dev",
      to: process.env.BUSINESS_TO_EMAIL || "hello@mdeploy.dev",
      subject: `Contact Form: ${validatedData.fullName}`,
      html: emailHTML,
      replyTo: validatedData.email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
