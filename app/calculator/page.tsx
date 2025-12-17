"use client"

import { useState } from "react"
import { ServiceCalculator } from "@/components/service-calculator"
import { QuoteForm } from "@/components/quote-form"
import type { QuoteInputs } from "@/lib/pricing"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function CalculatorPage() {
  const [showForm, setShowForm] = useState(false)
  const [quoteInputs, setQuoteInputs] = useState<QuoteInputs>({
    websitePages: 0,
    webAppPages: 0,
    ecommercePages: 0,
    mobileScreens: 0,
    desktopFunctions: 0,
  })
  const { language } = useLanguage()
  const t = translations[language]

  const handleSubmit = (inputs: QuoteInputs) => {
    setQuoteInputs(inputs)
    setShowForm(true)
    // Scroll to form
    setTimeout(() => {
      document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold lg:text-5xl">{t.calculatorPage.title}</h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            {t.calculatorPage.description}
          </p>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          <ServiceCalculator showSubmitForm onSubmit={handleSubmit} />

          {showForm && (
            <div id="quote-form">
              <QuoteForm inputs={quoteInputs} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
