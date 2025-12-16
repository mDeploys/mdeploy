import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MDeploy - Professional Deployment Services",
  description:
    "Professional deployment services for websites, web applications, mobile apps, and desktop applications. Transparent pricing, reliable delivery.",
  keywords: [
    "deployment",
    "devops",
    "website deployment",
    "web app deployment",
    "mobile app deployment",
    "desktop app development",
  ],
  authors: [{ name: "MDeploy" }],
  openGraph: {
    title: "MDeploy - Professional Deployment Services",
    description:
      "Professional deployment services for websites, web applications, mobile apps, and desktop applications.",
    url: "https://mdeploy.dev",
    siteName: "MDeploy",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDeploy - Professional Deployment Services",
    description: "Professional deployment services with transparent pricing",
  },
  generator: "Next.js",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
    <html lang="en" className="bg-background">
      <body className={`font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
