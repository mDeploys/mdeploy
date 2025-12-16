"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/15 bg-background/90 backdrop-blur-xl shadow-sm supports-[backdrop-filter]:bg-background/80">
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <nav className="container mx-auto h-20 px-4 lg:px-8">
        <div className="flex h-full items-center gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-xl border border-primary/10 bg-card/80 px-3 py-2 shadow-sm backdrop-blur-sm transition hover:border-primary/40 hover:shadow-lg"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-white shadow-inner ring-1 ring-primary/20">
              <Image
                src="/logo.png"
                alt="mDeploy logo"
                width={120}
                height={120}
                className="h-full w-full object-contain animate-float"
              />
            </div>
            <div className="leading-tight text-start">
              <span className="text-lg font-bold tracking-tight text-purple-900 dark:text-purple-200">mDeploy</span>
              <span className="block text-xs text-purple-800/80 dark:text-purple-200/80">{t.hero.badge}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            <Link
              href="/"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.home}
            </Link>
            <Link
              href="/#services"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.services}
            </Link>
            <Link
              href="/calculator"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.calculator}
            </Link>
            <Link
              href="/contact"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.contact}
            </Link>
            <a
              href="https://jalalnasser.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {t.blog}
            </a>
          </div>

          <div className="hidden flex-1 items-center justify-end gap-3 md:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-lg shadow-primary/25 hover:from-purple-700 hover:to-fuchsia-700 text-white"
            >
              <Link href="/calculator">{t.getQuote}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden ml-auto">
            <LanguageSwitcher />
            <ThemeToggle />
            <button className="p-2 rounded-lg border border-primary/20 hover:border-primary/50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-primary/10 bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 p-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.home}
            </Link>
            <Link
              href="/#services"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.services}
            </Link>
            <Link
              href="/calculator"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.calculator}
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.contact}
            </Link>
            <a
              href="https://jalalnasser.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t.blog}
            </a>
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
              <Link href="/calculator" onClick={() => setMobileMenuOpen(false)}>
                {t.getQuote}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
