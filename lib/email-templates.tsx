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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>mDeploy Quote Request</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f2fb; font-family: Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f2fb;">
    <tr>
      <td style="padding: 20px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #e2e8f0; border-collapse: collapse; background-color: #ffffff; border-radius: 14px; overflow: hidden;">
          <tr>
            <td align="center" bgcolor="#1e1b4b" style="padding: 40px 0 30px 0; color: #ffffff; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
              <img src="${logoUrl}" alt="mDeploy logo" width="160" style="display: block; width: 160px; height: auto; margin-bottom: 15px;" />
              <div style="font-size: 24px; text-transform: uppercase; letter-spacing: 1px;">Quote Request</div>
              <div style="font-size: 16px; color: #c084fc; font-family: monospace; margin-top: 10px;">Reference: ${qId}</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px 40px 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="color: #1e1b4b; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px;">
                    Customer Information
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 30px 0; color: #1e293b; font-family: Arial, sans-serif; font-size: 15px; line-height: 24px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="100" style="font-weight: bold; color: #475569;">Name:</td>
                        <td>${data.fullName}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: bold; color: #475569;">Email:</td>
                        <td>${data.email}</td>
                      </tr>
                      ${data.company ? `<tr><td style="font-weight: bold; color: #475569;">Company:</td><td>${data.company}</td></tr>` : ""}
                      ${data.phone ? `<tr><td style="font-weight: bold; color: #475569;">Phone:</td><td>${data.phone}</td></tr>` : ""}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="color: #1e1b4b; font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; border-bottom: 2px solid #f3e8ff; padding-bottom: 10px;">
                    Service Breakdown
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0 0 0;">
                    <table border="0" cellpadding="10" cellspacing="0" width="100%" style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
                      <tr bgcolor="#f8fafc">
                        <th align="left" style="border-bottom: 1px solid #e2e8f0; color: #475569;">Service</th>
                        <th align="center" style="border-bottom: 1px solid #e2e8f0; color: #475569;">Qty</th>
                        <th align="right" style="border-bottom: 1px solid #e2e8f0; color: #475569;">Total (SAR)</th>
                      </tr>

                      ${(inputs.websitePages || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Website Pages</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.websitePages}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.websiteCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.webAppPages || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Web App Pages</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.webAppPages}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.webAppCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.ecommercePages || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">E-commerce Pages</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.ecommercePages}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.ecommerceCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.mobileScreens || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Mobile App Screens</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.mobileScreens}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.mobileCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.desktopFunctions || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Desktop Functions</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.desktopFunctions}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.desktopCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.landingPages || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Landing Pages</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.landingPages}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.landingCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.wordpressTemplates || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">WordPress Templates</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.wordpressTemplates}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.wordpressCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.logoDesigns || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Logo Designs</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.logoDesigns}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.logoCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      ${(inputs.brandingDesigns || 0) > 0 ? `
                      <tr>
                        <td style="border-bottom: 1px solid #f1f5f9; color: #334155;">Branding Designs</td>
                        <td align="center" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${inputs.brandingDesigns}</td>
                        <td align="right" style="border-bottom: 1px solid #f1f5f9; color: #334155;">${(breakdown.brandingCost || 0).toFixed(2)}</td>
                      </tr>` : ""}

                      <tr>
                        <td colspan="2" align="right" style="padding: 20px 10px 10px 0; color: #475569;">Subtotal:</td>
                        <td align="right" style="padding: 20px 0 10px 0; font-weight: bold;">${(breakdown.subtotal || 0).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" align="right" style="padding: 0 10px 10px 0; color: #475569;">Setup Fee:</td>
                        <td align="right" style="padding: 0 0 10px 0; font-weight: bold;">${(breakdown.setupFee || 0).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td colspan="2" align="right" style="padding: 10px 10px 0 0; color: #1e1b4b; font-size: 18px; font-weight: bold;">Grand Total:</td>
                        <td align="right" style="padding: 10px 0 0 0; color: #7c3aed; font-size: 20px; font-weight: 800;">${(breakdown.total || 0).toFixed(2)} SAR</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                ${data.notes ? `
                <tr>
                  <td style="padding: 40px 0 0 0;">
                    <table border="0" cellpadding="15" cellspacing="0" width="100%" style="background-color: #f5f3ff; border-left: 4px solid #7c3aed; border-radius: 4px;">
                      <tr>
                        <td style="font-family: Arial, sans-serif; font-size: 14px;">
                          <div style="font-weight: bold; color: #7c3aed; text-transform: uppercase; margin-bottom: 5px;">Client Note:</div>
                          <div style="font-style: italic; color: #1e1b4b;">${data.notes}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>` : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="#f8fafc" style="padding: 30px 30px 30px 30px; text-align: center; color: #94a3b8; font-family: Arial, sans-serif; font-size: 12px; border-top: 1px solid #e2e8f0;">
              This is an automated request generated from <a href="https://mdeploy.dev" style="color: #7c3aed; text-decoration: none;">mdeploy.dev</a>
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>mDeploy Contact Form</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f2fb;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f2fb;">
    <tr>
      <td style="padding: 20px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border: 1px solid #e2e8f0; border-collapse: collapse; background-color: #ffffff; border-radius: 14px; overflow: hidden;">
          <tr>
            <td align="center" bgcolor="#1e1b4b" style="padding: 30px 0 20px 0;">
              <img src="${logoUrl}" alt="mDeploy logo" width="120" style="display: block; width: 120px; height: auto;" />
              <div style="color: #ffffff; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold; margin-top: 10px;">Contact Form</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1f1b2e;">
              <p><strong>Name:</strong> ${data.fullName}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <h2 style="font-size: 16px; margin: 0 0 10px;">Message</h2>
                <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
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
