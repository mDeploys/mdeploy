"use client"

import { useState } from "react"
import { ServiceCalculator } from "@/components/service-calculator"
import { QuoteForm } from "@/components/quote-form"
import type { QuoteInputs } from "@/lib/pricing"

export default function CalculatorPage() {
  const [showForm, setShowForm] = useState(false)
  const [quoteInputs, setQuoteInputs] = useState<QuoteInputs>({
    websitePages: 0,
    webAppPages: 0,
    mobileScreens: 0,
    desktopFunctions: 0,
  })

  const handleSubmit = (inputs: QuoteInputs) => {
    setQuoteInputs(inputs)
    setShowForm(true)
    // Scroll to form
    setTimeout(() => {
      document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-balance text-4xl font-bold lg:text-5xl">Service Cost Calculator</h1>
          <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
            Calculate your project cost with our transparent pricing calculator
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
