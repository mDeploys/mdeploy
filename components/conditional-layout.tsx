"use client"

import { usePathname } from "next/navigation"

export function ConditionalLayout({
  children,
  header,
  footer
}: {
  children: React.ReactNode
  header: React.ReactNode
  footer: React.ReactNode
}) {
  const pathname = usePathname()

  // Hide header and footer on all admin pages
  if (pathname.startsWith("/admin")) {
    return <main className="min-h-screen bg-background">{children}</main>
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  )
}
