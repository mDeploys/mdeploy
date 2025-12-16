# mDeploy - Professional Deployment Services

A modern, production-ready business website for mDeploy offering deployment services for websites, web apps, mobile apps, and desktop applications.

## Features

- 🎯 **Service Cost Calculator** - Interactive calculator with transparent pricing
- 💰 **Currency Toggle** - Switch between SAR and USD pricing
- 📧 **Email Integration** - Quote and contact form submissions via Resend
- 🎨 **Modern Design** - Dark/light mode with professional aesthetic
- 📱 **Mobile-First** - Fully responsive across all devices
- 🔒 **Security** - Rate limiting and honeypot spam protection
- ♿ **Accessible** - WCAG compliant with semantic HTML
- 🚀 **SEO Optimized** - Metadata, OpenGraph, and structured content

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Email**: Resend
- **Validation**: Zod
- **Analytics**: Vercel Analytics

## Pricing Structure

- Website Pages: **250 SAR** per page
- Web App Pages: **300 SAR** per page
- Mobile Screens: **400 SAR** per screen
- Desktop Functions: **180 SAR** per function
- Setup & Handling Fee: **200 SAR** (fixed, added once per order)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Resend API Key (for email sending)
RESEND_API_KEY=re_your_api_key_here

# Business email (receives quote/contact submissions)
BUSINESS_TO_EMAIL=hello@mdeploy.dev

# From email (sender address for emails)
FROM_EMAIL=no-reply@mdeploy.dev

# USD conversion rate (public, used client-side)
NEXT_PUBLIC_USD_PER_SAR=0.266
```

### Getting Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Go to API Keys section
3. Create a new API key
4. Add your domain for production use

## Installation & Setup

1. **Clone or download the project**

```bash
# If using git
git clone <repository-url>
cd mdeploy
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create `.env.local` file with the variables listed above.

4. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## Project Structure

```
mdeploy/
├── app/
│   ├── api/
│   │   ├── contact/route.ts    # Contact form API
│   │   └── quote/route.ts      # Quote submission API
│   ├── calculator/page.tsx     # Calculator page
│   ├── contact/page.tsx        # Contact page
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   ├── page.tsx                # Home page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn UI components
│   ├── header.tsx              # Site header/nav
│   ├── footer.tsx              # Site footer
│   ├── service-calculator.tsx  # Calculator component
│   └── quote-form.tsx          # Quote submission form
├── lib/
│   ├── pricing.ts              # Pricing logic
│   ├── currency.ts             # Currency conversion
│   ├── validations.ts          # Zod schemas
│   ├── email-templates.ts      # Email HTML templates
│   ├── rate-limit.ts           # Rate limiting
│   └── utils.ts                # Utilities
└── README.md
```

## Pages

- **/** - Home page with hero, services, calculator preview, process, testimonials, FAQ, CTA
- **/calculator** - Full calculator with quote submission form
- **/contact** - Contact form page
- **/privacy** - Privacy policy
- **/terms** - Terms of service

## Key Features Explained

### Service Calculator

- Non-negative integer inputs for each service type
- Real-time price calculation with detailed breakdown
- Currency toggle (SAR ↔ USD)
- Input validation
- Reset functionality

### Email Submissions

- **Quote Requests**: Sends detailed breakdown to business and confirmation to user
- **Contact Form**: Sends message to business with reply-to set to user's email
- **Security**: Honeypot field and rate limiting (5 requests per minute per IP)
- **Validation**: Zod schemas ensure data integrity

### Responsive Design

- Mobile-first approach
- Hamburger menu on mobile
- Touch-friendly targets (min 44px)
- iOS Safari optimizations (disabled auto-zoom)
- Proper viewport configuration

## Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Environment Variables in Production

Make sure to add all required environment variables in your deployment platform:

- `RESEND_API_KEY`
- `BUSINESS_TO_EMAIL`
- `FROM_EMAIL`
- `NEXT_PUBLIC_USD_PER_SAR`

## Customization

### Update Pricing

Edit `lib/pricing.ts`:

```typescript
export const PRICING_SAR: PricingConfig = {
  websitePagePrice: 250,
  webAppPagePrice: 300,
  mobileScreenPrice: 400,
  desktopFunctionPrice: 180,
  setupFee: 200,
}
```

### Change Currency Exchange Rate

Update the `NEXT_PUBLIC_USD_PER_SAR` environment variable.

### Modify Theme Colors

Edit `app/globals.css` color variables in `:root` and `.dark` sections.

## Support

For questions or issues, contact: hello@mdeploy.dev

## License

All rights reserved © mDeploy
