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
    <Card className="glass-card border-white/10 shadow-2xl relative overflow-hidden rounded-3xl animate-in fade-in duration-700">
      <div className="cosmic-gradient absolute inset-0 opacity-40 pointer-events-none" />

      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-3xl font-black text-white text-glow-purple tracking-tight">
          {t.quoteForm.title}
        </CardTitle>
        <CardDescription className="text-slate-400 font-medium">
          {t.quoteForm.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="bg-black/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4 mb-2 flex items-center justify-between lightning-shadow animate-in slide-in-from-top-4 duration-500">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {submissionId ? "Confirmed Reference" : "Quote Pool ID"}
                </span>
                <span className="font-mono font-black text-purple-400 text-lg">
                  {submissionId || pendingId}
                </span>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2 group">
              <Label htmlFor="fullName" className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-purple-400 transition-colors">
                {t.quoteForm.labels.fullName}
              </Label>
              <Input
                id="fullName"
                required
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                placeholder={t.quoteForm.placeholders.fullName}
                className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl transition-all font-medium text-white"
              />
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-purple-400 transition-colors">
                {t.quoteForm.labels.email}
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder={t.quoteForm.placeholders.email}
                className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl transition-all font-medium text-white"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 group">
                <Label htmlFor="company" className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-purple-400 transition-colors">
                  {t.quoteForm.labels.company}
                </Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder={t.quoteForm.placeholders.company}
                  className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl transition-all font-medium text-white"
                />
              </div>

              <div className="space-y-2 group">
                <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-purple-400 transition-colors">
                  {t.quoteForm.labels.phone}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder={t.quoteForm.placeholders.phone}
                  className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl transition-all font-medium text-white"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-slate-400 group-focus-within:text-purple-400 transition-colors">
                {t.quoteForm.labels.notes}
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder={t.quoteForm.placeholders.notes}
                rows={4}
                className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-2xl transition-all font-medium text-white resize-none"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-purple-600 hover:bg-purple-500 text-white font-black text-lg rounded-2xl lightning-shadow-hover hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t.quoteForm.submitting}
              </div>
            ) : t.quoteForm.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
