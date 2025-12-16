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
  
  // Hide header and footer on login page
  if (pathname === "/admin/login") {
    return <main>{children}</main>
  }
  
  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  )
}
