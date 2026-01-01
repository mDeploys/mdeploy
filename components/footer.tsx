"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Github, Globe2, Linkedin } from "lucide-react"

function BehanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.5 4h6.4c2.9 0 4.6 1.6 4.6 3.9 0 1.5-.9 2.7-2.1 3.2 1.6.4 2.7 1.9 2.7 3.6 0 2.6-1.8 4.3-4.9 4.3H4.5Zm3.4 7.1h2.7c1.1 0 1.9-.7 1.9-1.7s-.7-1.6-1.9-1.6H7.9Zm0 6h3.1c1.3 0 2.1-.7 2.1-1.8s-.8-1.9-2.1-1.9H7.9Zm9.5-3.2c0-2.7 2-4.7 4.6-4.7 2.8 0 4.3 1.9 4.4 4.6 0 .3 0 .7-.1 1h-6c.2 1 .9 1.6 2.1 1.6.9 0 1.6-.3 2.3-1l1.6 1.8c-.9 1-2.2 1.6-3.9 1.6-2.9 0-5-1.9-5-4.9Zm4.6-2c-1 0-1.5.7-1.7 1.4h3.4c-.1-.7-.6-1.4-1.7-1.4Zm1.3-4.8H18V6h5.1Z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="m4 3h4.5l3.5 4.9L15.4 3H20l-6.3 8.5L20.2 21h-4.6l-4-5.2L7.2 21H3l6.5-8.8Z" />
    </svg>
  )
}

export function Footer() {
  const { language } = useLanguage()
  const t = translations[language]
  const socialLinks = [
    { key: "twitter" as const, href: "https://x.com/jalalnasser", Icon: XIcon },
    { key: "github" as const, href: "https://github.com/mDeploys", Icon: Github },
    { key: "behance" as const, href: "https://www.behance.net/jalalnasser", Icon: BehanceIcon },
    { key: "linkedin" as const, href: "https://www.linkedin.com/in/jalalnasser", Icon: Linkedin },
    { key: "blog" as const, href: "https://jalalnasser.com", Icon: Globe2 },
  ]

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-2 text-xl font-bold tracking-tight">mDeploy</h3>
            <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            <div className="mt-5">
              <p className="text-sm font-semibold text-foreground">{t.footer.socialTitle}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {socialLinks.map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground transition hover:border-primary/60 hover:text-primary hover:bg-primary/5"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{t.footer.social[key]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t.footer.servicesTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  {t.footer.services.website}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  {t.footer.services.webApps}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  {t.footer.services.mobileApps}
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  {t.footer.services.desktopApps}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t.footer.companyTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator" className="text-muted-foreground hover:text-foreground">
                  {t.calculator}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">{t.footer.legalTitle}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  {t.footer.terms}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 w-full border-t border-slate-800 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-950 py-5 text-center text-sm text-slate-100 shadow-[0_-10px_35px_-25px_rgba(15,23,42,0.8)]">
        <div className="container mx-auto px-4 lg:px-8">
          <p>
            &copy; {new Date().getFullYear()} mDeploy. {t.footer.rights} · {t.footer.developedBy}{" "}
            <a
              href="https://github.com/Jalal-Nasser"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple-300 hover:text-purple-200"
            >
              Jalal Nasser
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
