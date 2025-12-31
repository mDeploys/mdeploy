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

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body style="margin:0; padding:0; background:#f4f2fb; font-family: Arial, sans-serif; line-height:1.6; color:#1f1b2e;">
  <div style="max-width:600px; margin:0 auto; padding:20px;">
    <div style="background-color:#2e1065; background-image: linear-gradient(90deg, #020617 0%, #2e1065 50%, #020617 100%); color:#ffffff; padding:26px 20px; text-align:center; border-radius:14px 14px 0 0;">
      <img src="${logoUrl}" alt="mDeploy logo" width="150" height="60" style="display:block; margin:0 auto 12px; width:150px; height:auto;" />
      <h1 style="font-size:22px; font-weight:700; margin:0;">mDeploy Quote Request</h1>
      ${data.quoteId ? `<p style="margin:5px 0 0; opacity:0.8; font-family:monospace; font-weight:bold; font-size:14px;">Reference: ${data.quoteId}</p>` : ""}
    </div>
    <div style="padding:22px; background:#ffffff; border:1px solid #e6e1f2; border-top:0; border-radius:0 0 14px 14px;">
      <div style="margin:20px 0;">
        <h2 style="font-size:16px; font-weight:600; margin:0 0 10px;">Customer Information</h2>
        <p style="margin:0 0 6px;"><strong>Name:</strong> ${data.fullName}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p style="margin:0 0 6px;"><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.phone ? `<p style="margin:0 0 6px;"><strong>Phone:</strong> ${data.phone}</p>` : ""}
      </div>

      <div style="margin:20px 0;">
        <h2 style="font-size:16px; font-weight:600; margin:0 0 10px;">Service Requirements</h2>
        <table style="width:100%; border-collapse:collapse; margin:20px 0;">
          <thead>
            <tr>
              <th style="padding:12px; text-align:left; border-bottom:1px solid #ddd; background:#efe8ff; font-weight:600; color:#2b0a3d;">Service</th>
              <th style="padding:12px; text-align:left; border-bottom:1px solid #ddd; background:#efe8ff; font-weight:600; color:#2b0a3d;">Quantity</th>
              <th style="padding:12px; text-align:left; border-bottom:1px solid #ddd; background:#efe8ff; font-weight:600; color:#2b0a3d;">Rate (SAR)</th>
              <th style="padding:12px; text-align:left; border-bottom:1px solid #ddd; background:#efe8ff; font-weight:600; color:#2b0a3d;">Total (SAR)</th>
            </tr>
          </thead>
          <tbody>
            ${(inputs.websitePages || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Website Pages</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.websitePages}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">250</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.websiteCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.webAppPages || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Web App Pages</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.webAppPages}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">300</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.webAppCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.ecommercePages || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">E-commerce Pages</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.ecommercePages}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">450</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.ecommerceCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.mobileScreens || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Mobile App Screens</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.mobileScreens}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">300</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.mobileCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.desktopFunctions || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Desktop Functions</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.desktopFunctions}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">180</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.desktopCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.landingPages || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Landing Pages</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.landingPages}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">500</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.landingCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.wordpressTemplates || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">WordPress Templates</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.wordpressTemplates}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">1500</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.wordpressCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.logoDesigns || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Logo Designs</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.logoDesigns}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">300</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.logoCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            ${(inputs.brandingDesigns || 0) > 0
      ? `
            <tr>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">Branding Designs</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${inputs.brandingDesigns}</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">1500</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd;">${(breakdown.brandingCost || 0).toFixed(2)}</td>
            </tr>`
      : ""
    }
            <tr>
              <td colspan="3" style="padding:12px; text-align:left; border-bottom:1px solid #ddd; font-weight:600;">Subtotal</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd; font-weight:600;">${(breakdown.subtotal || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" style="padding:12px; text-align:left; border-bottom:1px solid #ddd; font-weight:600;">Setup & Handling Fee</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd; font-weight:600;">${(breakdown.setupFee || 0).toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="3" style="padding:12px; text-align:left; border-bottom:1px solid #ddd; font-weight:700; font-size:1.1em; color:#2b0a3d;">Total</td>
              <td style="padding:12px; text-align:left; border-bottom:1px solid #ddd; font-weight:700; font-size:1.1em; color:#2b0a3d;">${(breakdown.total || 0).toFixed(2)} SAR</td>
            </tr>
          </tbody>
        </table>
      </div>

      ${data.notes
      ? `
      <div style="margin:20px 0;">
        <h2 style="font-size:16px; font-weight:600; margin:0 0 10px;">Additional Notes</h2>
        <p style="margin:0;">${data.notes}</p>
      </div>`
      : ""
    }
    </div>
  </div>
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
</head>
<body style="margin:0; padding:0; background:#f4f2fb; font-family: Arial, sans-serif; line-height:1.6; color:#1f1b2e;">
  <div style="max-width:600px; margin:0 auto; padding:20px;">
    <div style="background-color:#2e1065; background-image: linear-gradient(90deg, #020617 0%, #2e1065 50%, #020617 100%); color:#ffffff; padding:26px 20px; text-align:center; border-radius:14px 14px 0 0;">
      <img src="${logoUrl}" alt="mDeploy logo" width="150" height="60" style="display:block; margin:0 auto 12px; width:150px; height:auto;" />
      <h1 style="font-size:22px; font-weight:700; margin:0;">mDeploy Contact Form</h1>
    </div>
    <div style="padding:22px; background:#ffffff; border:1px solid #e6e1f2; border-top:0; border-radius:0 0 14px 14px;">
      <div style="margin:20px 0;">
        <h2 style="font-size:16px; font-weight:600; margin:0 0 10px;">Contact Information</h2>
        <p style="margin:0 0 6px;"><strong>Name:</strong> ${data.fullName}</p>
        <p style="margin:0 0 6px;"><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p style="margin:0 0 6px;"><strong>Company:</strong> ${data.company}</p>` : ""}
      </div>

      <div style="margin:20px 0;">
        <h2 style="font-size:16px; font-weight:600; margin:0 0 10px;">Message</h2>
        <p style="margin:0;">${data.message}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}
