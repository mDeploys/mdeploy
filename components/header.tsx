"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90">
      <nav className="container mx-auto flex items-center justify-between p-4 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-purple-600 via-primary to-fuchsia-500 bg-clip-text text-transparent"
        >
          MDeploy
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/#services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="/calculator"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Calculator
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <ThemeToggle />
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-lg shadow-primary/25 hover:from-purple-700 hover:to-fuchsia-700 text-white"
          >
            <Link href="/calculator">Get Quote</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button className="p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-primary/10 bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-4 p-4">
            <Link
              href="/#services"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/calculator"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Calculator
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
              <Link href="/calculator" onClick={() => setMobileMenuOpen(false)}>
                Get Quote
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
