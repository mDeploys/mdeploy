"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import type { QuoteInputs } from "@/lib/pricing"

interface QuoteFormProps {
  inputs: QuoteInputs
}

export function QuoteForm({ inputs }: QuoteFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    notes: "",
    honeypot: "", // spam protection
  })

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
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Quote Request Sent!",
          description: "We've sent you a confirmation email and will be in touch soon.",
        })
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
          title: "Error",
          description: data.error || "Failed to submit quote request. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Information</CardTitle>
        <CardDescription>Fill in your details to receive your quote</CardDescription>
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

          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="john@example.com"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                placeholder="Your Company"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Project Notes / Requirements</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Tell us more about your project..."
              rows={4}
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Submit Quote Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
