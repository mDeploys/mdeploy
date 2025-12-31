import type { PriceBreakdown, QuoteInputs } from "./pricing"

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

export function generateQuoteEmailHTML(
  data: {
    fullName: string
    email: string
    company?: string
    phone?: string
    notes?: string
    quoteId?: string
  },
  inputs: QuoteInputs,
  breakdown: PriceBreakdown,
): string {
  const logoUrl = "https://mdeploy.dev/logo.png"
  const qId = data.quoteId || "QT-PENDING"

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quote Request</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f2fb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height:1.6; color:#1f1b2e;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f2fb;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="width:600px; max-width:600px; border-collapse: separate; border-radius: 14px; overflow: hidden; background-color: #ffffff; border: 1px solid #e2e8f0;">
          <!-- Header (Flat color for Hotmail/Outlook) -->
          <tr>
            <td align="center" style="background-color: #1e1b4b; padding: 40px 20px;">
              <img src="${logoUrl}" alt="mDeploy logo" width="150" style="display:block; width:150px; height:auto; margin-bottom: 15px;" />
              <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Quote Request</h1>
              <p style="color: #c084fc; font-family: monospace; font-size: 16px; font-weight: bold; margin: 10px 0 0;">Reference: ${qId}</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Client Info -->
              <h2 style="font-size: 18px; font-weight: 700; color: #1e1b4b; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px; margin-bottom: 20px;">Customer Information</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="padding: 5px 0; color: #475569; width: 100px;"><strong>Name</strong></td>
                  <td style="padding: 5px 0; color: #1e293b;">${data.fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; color: #475569;"><strong>Email</strong></td>
                  <td style="padding: 5px 0; color: #1e293b;">${data.email}</td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 5px 0; color: #475569;"><strong>Company</strong></td>
                  <td style="padding: 5px 0; color: #1e293b;">${data.company}</td>
                </tr>` : ""}
                ${data.phone ? `
                <tr>
                  <td style="padding: 5px 0; color: #475569;"><strong>Phone</strong></td>
                  <td style="padding: 5px 0; color: #1e293b;">${data.phone}</td>
                </tr>` : ""}
              </table>

              <!-- Pricing Table -->
              <h2 style="font-size: 18px; font-weight: 700; color: #1e1b4b; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px; margin: 30px 0 20px;">Service Breakdown</h2>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse;">
                <tr style="background-color: #f8fafc;">
                  <th align="left" style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px;">Service</th>
                  <th align="center" style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px;">Qty</th>
                  <th align="right" style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #475569; font-size: 14px;">Total (SAR)</th>
                </tr>
                
                ${(inputs.websitePages || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Website Pages</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.websitePages}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.websiteCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.webAppPages || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Web App Pages</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.webAppPages}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.webAppCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.ecommercePages || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">E-commerce Pages</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.ecommercePages}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.ecommerceCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.mobileScreens || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Mobile App Screens</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.mobileScreens}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.mobileCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.desktopFunctions || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Desktop Functions</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.desktopFunctions}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.desktopCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.landingPages || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Landing Pages</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.landingPages}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.landingCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.wordpressTemplates || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">WordPress Templates</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.wordpressTemplates}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.wordpressCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.logoDesigns || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Logo Designs</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.logoDesigns}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.logoCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                ${(inputs.brandingDesigns || 0) > 0 ? `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">Branding Designs</td>
                  <td align="center" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.brandingDesigns}</td>
                  <td align="right" style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.brandingCost || 0).toFixed(2)}</td>
                </tr>` : ""}

                <!-- Totals -->
                <tr>
                  <td colspan="2" style="padding: 12px; border-top: 2px solid #e2e8f0; text-align: right; color: #475569;">Subtotal</td>
                  <td align="right" style="padding: 12px; border-top: 2px solid #e2e8f0; font-weight: bold; color: #1e293b;">${(breakdown.subtotal || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; color: #475569;">Setup Fee</td>
                  <td align="right" style="padding: 12px; font-weight: bold; color: #1e293b;">${(breakdown.setupFee || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 20px 12px; text-align: right; color: #1e1b4b; font-size: 18px; font-weight: 700;">Grand Total</td>
                  <td align="right" style="padding: 20px 12px; color: #7c3aed; font-size: 20px; font-weight: 800;">${(breakdown.total || 0).toFixed(2)} SAR</td>
                </tr>
              </table>

              ${data.notes ? `
              <div style="margin-top: 40px; padding: 20px; background-color: #f5f3ff; border-left: 4px solid #7c3aed; border-radius: 4px;">
                <h3 style="margin: 0 0 10px; font-size: 14px; color: #7c3aed; text-transform: uppercase;">Note</h3>
                <p style="margin: 0; font-size: 14px; font-style: italic; color: #1e1b4b;">${data.notes}</p>
              </div>` : ""}

              <div style="margin-top: 40px; text-align: center;">
                <p style="font-size: 13px; color: #94a3b8; margin: 0;">This is an automated request generated from mdeploy.dev</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

export function generateContactEmailHTML(data: {
  fullName: string
  email: string
  company?: string
  message: string
}): string {
  const logoUrl = "https://mdeploy.dev/logo.png"

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background-color:#f4f2fb; font-family: sans-serif; line-height:1.6; color:#1f1b2e;">
  <div style="max-width:600px; margin:20px auto; padding:0; background:#ffffff; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
    <div style="background-color:#1e1b4b; padding:30px; text-align:center;">
      <img src="${logoUrl}" alt="mDeploy logo" width="120" style="width:120px; height:auto;" />
      <h1 style="color:#ffffff; font-size:20px; margin:10px 0 0;">Contact Form</h1>
    </div>
    <div style="padding:30px;">
      <p style="margin:0 0 10px;"><strong>Name:</strong> ${data.fullName}</p>
      <p style="margin:0 0 10px;"><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p style="margin:0 0 10px;"><strong>Company:</strong> ${data.company}</p>` : ""}
      <div style="margin-top:20px; padding-top:20px; border-top:1px solid #f1f5f9;">
        <h2 style="font-size:16px; margin:0 0 10px;">Message</h2>
        <p style="margin:0; white-space:pre-wrap;">${data.message}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}
