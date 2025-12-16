"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, MapPin, Send } from "lucide-react"
import type React from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

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
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
    honeypot: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: t.contactPage.toast.successTitle,
          description: t.contactPage.toast.successDescription,
        })
        setFormData({
          fullName: "",
          email: "",
          company: "",
          message: "",
          honeypot: "",
        })
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
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold lg:text-5xl">{t.contactPage.title}</h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">{t.contactPage.description}</p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{t.contactPage.form.title}</CardTitle>
                <CardDescription>{t.contactPage.form.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
                    style={{ display: "none" }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="space-y-2">
                    <Label htmlFor="fullName">{t.contactPage.form.labels.fullName}</Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder={t.contactPage.form.placeholders.fullName}
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
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">{t.contactPage.form.labels.company}</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder={t.contactPage.form.placeholders.company}
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
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? t.contactPage.form.submitting : t.contactPage.form.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{t.contactPage.contactDetails.email.label}</div>
                    <div className="text-sm text-muted-foreground">{t.contactPage.contactDetails.email.value}</div>
                  </div>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <WhatsAppIcon />
                  <div>
                    <div className="font-medium">{t.contactPage.contactDetails.whatsapp.label}</div>
                    <a
                      href="https://wa.me/message/CWPGKLHKNYODN1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.contactPage.contactDetails.whatsapp.cta}
                    </a>
                  </div>
                </div>

                <div className="mb-4 flex items-start gap-3">
                  <TelegramIcon />
                  <div>
                    <div className="font-medium">{t.contactPage.contactDetails.telegram.label}</div>
                    <a
                      href="https://t.me/jalalnasserr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {t.contactPage.contactDetails.telegram.cta}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{t.contactPage.contactDetails.location.label}</div>
                    <div className="text-sm text-muted-foreground">{t.contactPage.contactDetails.location.value}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="mb-2 font-semibold">{t.contactPage.contactDetails.hoursTitle}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div>{t.contactPage.contactDetails.hoursWeekday}</div>
                  <div>{t.contactPage.contactDetails.hoursWeekend}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
