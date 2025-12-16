import type { PriceBreakdown, QuoteInputs } from "./pricing"

export function generateQuoteEmailHTML(
  data: {
    fullName: string
    email: string
    company?: string
    phone?: string
    notes?: string
  },
  inputs: QuoteInputs,
  breakdown: PriceBreakdown,
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    .table th { background: #f0f0f0; font-weight: 600; }
    .total { font-size: 1.2em; font-weight: bold; color: #000; }
    .section { margin: 20px 0; }
    .section-title { font-weight: 600; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>mDeploy Quote Request</h1>
    </div>
    <div class="content">
      <div class="section">
        <h2 class="section-title">Customer Information</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      </div>

      <div class="section">
        <h2 class="section-title">Service Requirements</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Quantity</th>
              <th>Rate (SAR)</th>
              <th>Total (SAR)</th>
            </tr>
          </thead>
          <tbody>
            ${
              inputs.websitePages > 0
                ? `
            <tr>
              <td>Website Pages</td>
              <td>${inputs.websitePages}</td>
              <td>250</td>
              <td>${breakdown.websiteCost.toFixed(2)}</td>
            </tr>`
                : ""
            }
            ${
              inputs.webAppPages > 0
                ? `
            <tr>
              <td>Web App Pages</td>
              <td>${inputs.webAppPages}</td>
              <td>300</td>
              <td>${breakdown.webAppCost.toFixed(2)}</td>
            </tr>`
                : ""
            }
            ${
              inputs.ecommercePages > 0
                ? `
            <tr>
              <td>E-commerce Pages</td>
              <td>${inputs.ecommercePages}</td>
              <td>450</td>
              <td>${breakdown.ecommerceCost.toFixed(2)}</td>
            </tr>`
                : ""
            }
            ${
              inputs.mobileScreens > 0
                ? `
            <tr>
              <td>Mobile App Screens</td>
              <td>${inputs.mobileScreens}</td>
              <td>400</td>
              <td>${breakdown.mobileCost.toFixed(2)}</td>
            </tr>`
                : ""
            }
            ${
              inputs.desktopFunctions > 0
                ? `
            <tr>
              <td>Desktop Functions</td>
              <td>${inputs.desktopFunctions}</td>
              <td>180</td>
              <td>${breakdown.desktopCost.toFixed(2)}</td>
            </tr>`
                : ""
            }
            <tr>
              <td colspan="3"><strong>Subtotal</strong></td>
              <td><strong>${breakdown.subtotal.toFixed(2)}</strong></td>
            </tr>
            <tr>
              <td colspan="3"><strong>Setup & Handling Fee</strong></td>
              <td><strong>${breakdown.setupFee.toFixed(2)}</strong></td>
            </tr>
            <tr class="total">
              <td colspan="3"><strong>Total</strong></td>
              <td><strong>${breakdown.total.toFixed(2)} SAR</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      ${
        data.notes
          ? `
      <div class="section">
        <h2 class="section-title">Additional Notes</h2>
        <p>${data.notes}</p>
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
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #000; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; background: #f9f9f9; }
    .section { margin: 20px 0; }
    .section-title { font-weight: 600; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>mDeploy Contact Form</h1>
    </div>
    <div class="content">
      <div class="section">
        <h2 class="section-title">Contact Information</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
      </div>

      <div class="section">
        <h2 class="section-title">Message</h2>
        <p>${data.message}</p>
      </div>
    </div>
  </div>
</body>
</html>
  `
}
