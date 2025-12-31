"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, MapPin, Send, MessageSquare, Clock, Phone } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useRef } from "react"

const WhatsAppIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5" {...props}>
    <path d="M21.7 3.3a1.2 1.2 0 0 0-1.2-.2L2.7 10.7a1.1 1.1 0 0 0-.7 1.1 1.1 1.1 0 0 0 .8.9l4.3 1.3 1.6 5.2a1.2 1.2 0 0 0 1 .8h.1a1.2 1.2 0 0 0 1-.6l2.2-3.3 4.1 3a1.2 1.2 0 0 0 1.2.1 1.2 1.2 0 0 0 .7-.9l2.3-14.8a1.2 1.2 0 0 0-.4-1.1Zm-3 1.9-9.2 8.4-2.7-.8Zm-8.2 10.9 9.3-8.4-6.9 10.1-2.4 3.6Z" />
  </svg>
)

export default function ContactPage() {
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]
  const [loading, setLoading] = useState(false)
  const hcaptchaRef = useRef<HCaptcha>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const inputClass =
    "bg-white/70 border-purple-200/60 text-slate-900 placeholder:text-slate-400 focus-visible:border-purple-400 focus-visible:ring-purple-200/60 dark:bg-white/5 dark:border-purple-400/30 dark:text-slate-100 dark:placeholder:text-purple-200/60 dark:focus-visible:border-purple-300 dark:focus-visible:ring-purple-400/40"
  const glowCardClass =
    "relative overflow-hidden border border-purple-200/60 bg-white/85 shadow-[0_0_40px_-30px_rgba(147,51,234,0.5)] dark:border-purple-400/30 dark:bg-gradient-to-br dark:from-purple-500/20 dark:via-[#12062a]/90 dark:to-[#090414] dark:shadow-[0_0_80px_-40px_rgba(168,85,247,0.9)]"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
    honeypot: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.honeypot) return
    if (!captchaToken) {
      toast({
        title: t.contactPage.toast.errorTitle,
        description: "Please complete the CAPTCHA",
        variant: "destructive",
      })
      return
    }
    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, captchaToken }),
      })

      if (response.ok) {
        toast({
          title: t.contactPage.toast.successTitle,
          description: t.contactPage.toast.successDescription,
        })
        setFormData({ fullName: "", email: "", company: "", message: "", honeypot: "" })
        setCaptchaToken(null)
        hcaptchaRef.current?.resetCaptcha()
      } else {
        const data = await response.json()
        toast({
          title: t.contactPage.toast.errorTitle,
          description: data.error || t.contactPage.toast.errorDescription,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t.contactPage.toast.errorTitle,
        description: t.contactPage.toast.errorDescription,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <MessageSquare className="h-4 w-4" />
            {t.contact}
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold lg:text-6xl tracking-tight">
            {t.contactPage.title}
          </h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
            {t.contactPage.description}
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
          {/* Main Form */}
          <div className="lg:col-span-3">
            <Card className={glowCardClass}>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 left-8 h-48 w-48 rounded-full bg-purple-500/25 blur-3xl dark:bg-purple-400/40" />
                <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/70 to-transparent" />
              </div>
              <CardHeader className="relative pb-8">
                <CardTitle className="text-2xl">{t.contactPage.form.title}</CardTitle>
                <CardDescription className="text-base">{t.contactPage.form.description}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="honeypot"
                    className="hidden"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">{t.contactPage.form.labels.fullName}</Label>
                      <Input
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder={t.contactPage.form.placeholders.fullName}
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contactPage.form.labels.email}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder={t.contactPage.form.placeholders.email}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">{t.contactPage.form.labels.company}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder={t.contactPage.form.placeholders.company}
                      className={inputClass}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contactPage.form.labels.message}</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder={t.contactPage.form.placeholders.message}
                      rows={6}
                      className={inputClass}
                    />
                  </div>

                  <div className="flex justify-center py-2">
                    <HCaptcha
                      ref={hcaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
                      onVerify={(token) => setCaptchaToken(token)}
                      onExpire={() => setCaptchaToken(null)}
                      theme="light"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4 animate-spin" />
                        {t.contactPage.form.submitting}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        {t.contactPage.form.submit}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold px-1">{t.contactPage.faq.title}</h3>
              <Accordion type="single" collapsible className="w-full">
                {t.contactPage.faq.items.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-purple-100/50 dark:border-purple-400/20">
                    <AccordionTrigger className="text-start hover:text-purple-600 dark:hover:text-purple-400 no-underline transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <Card className={glowCardClass}>
              <CardContent className="pt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.contactPage.contactDetails.email.label}</p>
                    <p className="text-sm text-muted-foreground">{t.contactPage.contactDetails.email.value}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.contactPage.contactDetails.whatsapp.label}</p>
                    <a
                      href="https://wa.me/message/CWPGKLHKNYODN1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      {t.contactPage.contactDetails.whatsapp.cta}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    <TelegramIcon />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.contactPage.contactDetails.telegram.label}</p>
                    <a
                      href="https://t.me/jalalnasserr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-purple-500 transition-colors"
                    >
                      {t.contactPage.contactDetails.telegram.cta}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.contactPage.contactDetails.location.label}</p>
                    <p className="text-sm text-muted-foreground">{t.contactPage.contactDetails.location.value}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-purple-100/50 dark:border-purple-400/20">
                  <p className="text-sm font-bold mb-3">{t.contactPage.contactDetails.hoursTitle}</p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {t.contactPage.contactDetails.hoursWeekday}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 opacity-0" />
                      {t.contactPage.contactDetails.hoursWeekend}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
