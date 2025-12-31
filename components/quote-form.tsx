"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { calculatePrice, type QuoteInputs } from "@/lib/pricing"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface QuoteFormProps {
  inputs: QuoteInputs
}

export function QuoteForm({ inputs }: QuoteFormProps) {
  const { toast } = useToast()
  const { language } = useLanguage()
  const t = translations[language]
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
    honeypot: "", // spam protection
  })
  const [submissionId, setSubmissionId] = useState<string | null>(null)
  const [pendingId, setPendingId] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPendingId() {
      try {
        const response = await fetch("/api/quote/id")
        const data = await response.json()
        if (data.quoteId) {
          setPendingId(data.quoteId)
        }
      } catch (error) {
        console.error("Failed to fetch pending ID:", error)
      }
    }
    fetchPendingId()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) {
      // Bot detected
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...inputs,
          reservedQuoteId: pendingId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: t.quoteForm.toast.successTitle,
          description: t.quoteForm.toast.successDescription,
        })
        setSubmissionId(data.quoteId)
        setFormData({
          fullName: "",
          email: "",
          company: "",
          phone: "",
          notes: "",
          honeypot: "",
        })
      } else {
        toast({
          title: t.quoteForm.toast.errorTitle,
          description: data.error || t.quoteForm.toast.errorDescription,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: t.quoteForm.toast.errorTitle,
        description: t.quoteForm.toast.errorDescription,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.quoteForm.title}</CardTitle>
        <CardDescription>{t.quoteForm.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot field - hidden from users */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData((prev) => ({ ...prev, honeypot: e.target.value }))}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {(submissionId || pendingId) && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 rounded-lg p-3 mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                {submissionId ? "Confirmed Reference ID:" : "Quote Reference ID:"}
              </span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                {submissionId || pendingId}
              </span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">{t.quoteForm.labels.fullName}</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder={t.quoteForm.placeholders.fullName}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t.quoteForm.labels.email}</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder={t.quoteForm.placeholders.email}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">{t.quoteForm.labels.company}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder={t.quoteForm.placeholders.company}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t.quoteForm.labels.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder={t.quoteForm.placeholders.phone}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t.quoteForm.labels.notes}</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder={t.quoteForm.placeholders.notes}
              rows={4}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t.quoteForm.submitting : t.quoteForm.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
