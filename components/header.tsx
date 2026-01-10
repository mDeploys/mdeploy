"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { usePathname } from "next/navigation"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState("")
  const pathname = usePathname()
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash)
    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  useEffect(() => {
    setCurrentHash(window.location.hash)
  }, [pathname])

  const isHome = pathname === "/"
  const isServices = isHome && currentHash === "#services"
  const isHomeLink = isHome && currentHash !== "#services"
  const isCalculator = pathname === "/calculator"
  const isApps = pathname === "/apps"
  const isContact = pathname === "/contact"

  const navLinkClass = (active: boolean) =>
    [
      "relative rounded-full px-3 py-1 text-sm font-medium transition-all",
      "hover:text-purple-700 hover:bg-purple-100/70 dark:hover:text-purple-200 dark:hover:bg-purple-900/40",
      active
        ? "text-purple-700 bg-purple-100/80 font-semibold shadow-sm after:absolute after:left-1/2 after:-bottom-2 after:h-1.5 after:w-6 after:-translate-x-1/2 after:rounded-full after:bg-gradient-to-r after:from-purple-500 after:to-fuchsia-500 after:shadow-[0_0_12px_rgba(168,85,247,0.55)] dark:text-fuchsia-100 dark:bg-purple-900/60 dark:shadow-[0_0_20px_rgba(88,28,135,0.6)] dark:after:from-fuchsia-400 dark:after:to-purple-300"
        : "text-slate-600 dark:text-slate-200",
    ].join(" ")

  const mobileLinkClass = (active: boolean) =>
    [
      "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-primary/15 text-primary font-semibold dark:bg-purple-900/40 dark:text-purple-200"
        : "text-muted-foreground hover:text-primary hover:bg-primary/10 dark:text-slate-200 dark:hover:bg-purple-900/30",
    ].join(" ")

  const navLinks = [
    { href: "/", label: t.home, active: isHomeLink },
    { href: "/#services", label: t.services, active: isServices },
    { href: "/calculator", label: t.calculator, active: isCalculator },
    { href: "/apps", label: t.appsGallery.title, active: isApps },
    { href: "https://git.mdeploy.dev", label: t.zoneCode, active: false, external: true },
    { href: "https://jalalnasser.com", label: t.blog, active: false, external: true },
    { href: "/contact", label: t.contact, active: isContact },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 overflow-hidden border-b border-purple-200/70 bg-gradient-to-b from-white via-white/95 to-[#f7e9ff] dark:from-[#050112] dark:via-[#12062a] dark:to-[#1d0a3d]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent via-[#a855f7]/15 to-[#7c3aed]/25 dark:via-[#6d28d9]/25 dark:to-[#4c1d95]/55"
      >
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120C200 90 360 140 580 120C800 100 980 60 1200 80C1340 90 1420 110 1440 120V160H0Z"
            className="fill-[#7c3aed] dark:fill-[#a855f7]"
            opacity="0.85"
          />
          <path
            d="M0 140C260 120 420 150 640 130C860 110 1080 95 1270 115C1380 125 1420 135 1440 140V160H0Z"
            className="fill-[#5b21b6] dark:fill-[#7c3aed]"
            opacity="0.75"
          />
        </svg>
      </div>

      <nav className="container relative mx-auto flex h-24 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="mDeploy logo"
            width={180}
            height={80}
            className="h-12 w-auto drop-shadow-[0_12px_25px_rgba(109,40,217,0.35)] transition group-hover:scale-[1.02]"
          />
          <div className="hidden leading-tight text-start md:block">
            <span className="text-lg font-bold tracking-tight text-[#f959ca] drop-shadow-[0_2px_10px_rgba(249,89,202,0.6)]">mDeploy</span>
            <span className="block text-xs text-slate-500 dark:text-slate-300">{t.hero.badge}</span>
          </div>
        </Link>

        <div className="hidden items-center justify-center gap-4 rounded-full border border-purple-100/60 bg-white/80 dark:border-purple-800/60 dark:bg-[#160733]/85 px-4 py-2 shadow-[0_10px_35px_-25px_rgba(79,70,229,0.9)] backdrop-blur-md md:flex">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={navLinkClass(link.active)}
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className={navLinkClass(link.active)}>
                {link.label}
              </Link>
            )
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-lg shadow-primary/25 hover:from-purple-700 hover:to-fuchsia-700 text-white"
          >
            <Link href="/calculator">{t.getQuote}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="rounded-full border border-purple-200 p-2"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 max-w-[80vw] border-l border-primary/10 bg-background shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="text-sm font-semibold text-muted-foreground">{t.language}</span>
              <button
                className="rounded-lg border border-primary/20 p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={mobileLinkClass(link.active)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={mobileLinkClass(link.active)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
                <Link href="/calculator" onClick={() => setMobileMenuOpen(false)}>
                  {t.getQuote}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
