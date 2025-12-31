"use client"

import Link from "next/link"
import {
  ArrowRight,
  Server,
  Smartphone,
  Globe,
  Monitor,
  Zap,
  Shield,
  Rocket,
  Sparkles,
  Cloud,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceCalculator } from "@/components/service-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { useEffect } from "react"

const serviceCards = [
  {
    key: "website" as const,
    image: "/website-deployment-browser-wireframe-modern-blue.jpg",
    icon: Globe,
    bg: "from-purple-500/10 to-violet-500/10",
    iconBg: "from-purple-500 to-violet-600",
    priceColor: "text-purple-600 dark:text-purple-400",
    hover: "hover:border-purple-500 hover:shadow-purple-500/10",
  },
  {
    key: "webApp" as const,
    image: "/web-application-dashboard-api-database-purple.jpg",
    icon: Server,
    bg: "from-fuchsia-500/10 to-pink-500/10",
    iconBg: "from-fuchsia-500 to-pink-600",
    priceColor: "text-fuchsia-600 dark:text-fuchsia-400",
    hover: "hover:border-fuchsia-500 hover:shadow-fuchsia-500/10",
  },
  {
    key: "mobile" as const,
    image: "/mobile-app-ios-android-smartphone-interface-green.jpg",
    icon: Smartphone,
    bg: "from-emerald-500/10 to-teal-500/10",
    iconBg: "from-emerald-500 to-teal-600",
    priceColor: "text-emerald-600 dark:text-emerald-400",
    hover: "hover:border-emerald-500 hover:shadow-emerald-500/10",
  },
  {
    key: "desktop" as const,
    image: "/desktop-windows-application-software-interface-ora.jpg",
    icon: Monitor,
    bg: "from-amber-500/10 to-orange-500/10",
    iconBg: "from-amber-500 to-orange-600",
    priceColor: "text-amber-600 dark:text-amber-400",
    hover: "hover:border-amber-500 hover:shadow-amber-500/10",
  },
]

const processIcons = [Zap, Shield, Rocket]

export default function HomePage() {
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-noise" />
      <section className="relative min-h-[95vh] overflow-hidden scroll-reveal is-visible" data-reveal>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900 animate-gradient" />

        {/* Decorative orbs - Enhanced */}
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-purple-500/20 blur-[100px] animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[120px] animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-violet-600/10 blur-[130px]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container relative mx-auto px-4 py-32 lg:px-8 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-start">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                {t.hero.badge}
              </div>

              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white lg:text-6xl xl:text-7xl">
                {t.hero.title}
                <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-300 bg-clip-text text-transparent">
                  {t.hero.emphasis}
                </span>
              </h1>

              <p className="mb-8 text-pretty text-lg text-purple-100/90 lg:text-xl">
                {t.hero.description}
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base bg-white text-purple-900 shadow-xl shadow-purple-900/30 hover:bg-purple-100"
                >
                  <Link href="/calculator">
                    {t.hero.primaryCta} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/contact">{t.hero.secondaryCta}</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-purple-200/70">{t.hero.stats.projectsLabel}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-purple-200/70">{t.hero.stats.uptimeLabel}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-purple-200/70">{t.hero.stats.supportLabel}</div>
                </div>
              </div>
            </div>

            {/* Floating cards illustration */}
            <div className="relative hidden lg:block">
              <div className="relative h-[500px]">
                {/* Main card */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{t.hero.card.title}</div>
                        <div className="text-xs text-purple-200/70">{t.hero.card.subtitle}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {t.hero.card.checklist.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-400" />
                          <span className="text-sm text-purple-100">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating icons */}
                <div className="absolute top-10 left-10 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="absolute top-20 right-10 animate-float-delay">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-xl">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl">
                    <Monitor className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-10 right-20 animate-float-delay">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
                    <Cloud className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="absolute top-1/3 right-5 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-xl">
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Services Section - updated colors */}
      <section id="services" className="border-b border-border py-16 lg:py-24 scroll-reveal" data-reveal>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Server className="h-4 w-4" />
              {t.servicesSection.badge}
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{t.servicesSection.title}</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">{t.servicesSection.description}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map((service) => {
              const copy = t.servicesSection.cards[service.key]
              const Icon = service.icon

              return (
                <Card
                  key={service.key}
                  className={`group overflow-hidden border transition-all duration-300 ${service.hover} hover:shadow-2xl hover:-translate-y-1`}
                >
                  <div
                    className={`relative h-56 w-full overflow-hidden bg-gradient-to-br ${service.bg} opacity-90 transition-opacity group-hover:opacity-100`}
                  >
                    <Image
                      src={service.image}
                      alt={copy.title}
                      width={400}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <div
                      className={`mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-purple-500 transition-colors duration-300">
                      {copy.title}
                    </CardTitle>
                    <CardDescription className={`text-base font-bold ${service.priceColor}`}>
                      {copy.price}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{copy.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Calculator Preview - updated with purple theme */}
      <section className="relative overflow-hidden border-b border-border py-16 lg:py-24 scroll-reveal" data-reveal>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-background to-fuchsia-500/10" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              {t.calculatorPreview.badge}
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">
              {t.calculatorPreview.title}
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              {t.calculatorPreview.description}
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <ServiceCalculator />
            <div className="mt-6 text-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700"
              >
                <Link href="/calculator">{t.calculatorPreview.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - updated with purple gradients */}
      <section className="border-b border-border py-16 lg:py-24 scroll-reveal" data-reveal>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Rocket className="h-4 w-4" />
              {t.process.badge}
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{t.process.title}</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              {t.process.description}
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {t.process.steps.map((step, index) => {
              const Icon = processIcons[index]
              const gradients = [
                "from-purple-500 to-violet-600 shadow-purple-500/25",
                "from-fuchsia-500 to-pink-600 shadow-fuchsia-500/25",
                "from-emerald-500 to-teal-600 shadow-emerald-500/25",
              ]

              return (
                <div className="text-center" key={step.title}>
                  <div
                    className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-xl font-bold text-white shadow-lg ${gradients[index]}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-b border-border bg-muted/40 py-16 lg:py-24 scroll-reveal" data-reveal>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              {t.testimonials.badge}
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{t.testimonials.title}</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {t.testimonials.cards.map((card, index) => (
              <Card
                key={card.name}
                className={`border-2 border-transparent transition-colors ${index === 0
                  ? "hover:border-purple-500/50"
                  : index === 1
                    ? "hover:border-fuchsia-500/50"
                    : "hover:border-emerald-500/50"
                  }`}
              >
                <CardContent className="pt-6">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-sm italic text-muted-foreground">{card.quote}</p>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-sm text-muted-foreground">{card.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-16 lg:py-24 scroll-reveal" data-reveal>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">{t.faq.title}</h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              {t.faq.items.map((item, index) => (
                <AccordionItem key={item.question} value={`item-${index + 1}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - updated with professional gradient and badge */}
      <section className="relative overflow-hidden py-24 lg:py-32 scroll-reveal" data-reveal>
        <div className="absolute inset-0 bg-gradient-to-br from-[#12062a] via-purple-900 to-fuchsia-900" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <Rocket className="h-4 w-4 text-purple-300" />
            {t.cta.badge || "Ready to ship?"}
          </div>
          <h2 className="mb-6 text-balance text-4xl font-bold text-white lg:text-6xl tracking-tight">
            {t.cta.title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-purple-100/80 lg:text-xl">
            {t.cta.description}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-14 px-8 text-base bg-white text-purple-900 shadow-xl shadow-purple-900/40 hover:bg-purple-50">
              <Link href="/calculator">
                {t.cta.primaryCta} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">{t.cta.secondaryCta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
