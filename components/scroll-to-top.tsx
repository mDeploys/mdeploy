"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (pathname === "/admin/login") return null

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white shadow-[0_18px_40px_-20px_rgba(168,85,247,0.9)] transition-all duration-300 hover:scale-105 hover:from-purple-400 hover:to-fuchsia-500 ${
        visible ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
