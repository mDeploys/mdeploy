import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ConditionalLayout } from "@/components/conditional-layout"
import { LanguageProvider } from "@/lib/language-context"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "mDeploy - Professional Deployment Services",
  description:
    "Professional deployment services for websites, web applications, mobile apps, and desktop applications. Transparent pricing, reliable delivery.",
  keywords: [
    "deployment",
    "devops",
    "website deployment",
    "web app deployment",
    "mobile app deployment",
    "desktop app development",
    "خدمات النشر",
    "نشر التطبيقات",
  ],
  authors: [{ name: "mDeploy" }],
  creator: "mDeploy",
  publisher: "mDeploy",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "https://mdeploy.dev",
    languages: {
      "en-US": "https://mdeploy.dev/en",
      "ar-SA": "https://mdeploy.dev/ar",
    },
  },
  openGraph: {
    title: "mDeploy - Professional Deployment Services",
    description:
      "Professional deployment services for websites, web applications, mobile apps, and desktop applications.",
    url: "https://mdeploy.dev",
    siteName: "mDeploy",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
  },
  twitter: {
    card: "summary_large_image",
    title: "mDeploy - Professional Deployment Services",
    description: "Professional deployment services with transparent pricing",
    creator: "@mdeploy",
  },
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
      },
      {
        url: "/favicon.ico",
        sizes: "any",
      },
    ],
    apple: "/logo.png",
    shortcut: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" className="bg-background" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <ConditionalLayout header={<Header />} footer={<Footer />}>
            {children}
          </ConditionalLayout>
          <Toaster />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
