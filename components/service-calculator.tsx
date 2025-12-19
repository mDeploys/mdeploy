"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculatePrice, type QuoteInputs } from "@/lib/pricing"
import { convertToUSD, formatCurrency, type Currency } from "@/lib/currency"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

interface ServiceCalculatorProps {
  showSubmitForm?: boolean
  onSubmit?: (inputs: QuoteInputs) => void
}

export function ServiceCalculator({ showSubmitForm = false, onSubmit }: ServiceCalculatorProps) {
  const [currency, setCurrency] = useState<Currency>("SAR")
  const [inputs, setInputs] = useState<QuoteInputs>({
    websitePages: 0,
    webAppPages: 0,
    ecommercePages: 0,
    mobileScreens: 0,
    desktopFunctions: 0,
    landingPages: 0,
    wordpressTemplates: 0,
    logoDesigns: 0,
    brandingDesigns: 0,
  })
  const { language } = useLanguage()
  const t = translations[language]
  const inputClass =
    "bg-white/70 border-purple-200/60 text-slate-900 placeholder:text-slate-400 focus-visible:border-purple-400 focus-visible:ring-purple-200/60 dark:bg-white/5 dark:border-purple-400/30 dark:text-slate-100 dark:placeholder:text-purple-200/60 dark:focus-visible:border-purple-300 dark:focus-visible:ring-purple-400/40"
  const glowCardClass =
    "relative overflow-hidden border border-purple-200/60 bg-white/85 shadow-[0_0_40px_-30px_rgba(147,51,234,0.5)] dark:border-purple-400/30 dark:bg-gradient-to-br dark:from-purple-500/20 dark:via-[#12062a]/90 dark:to-[#090414] dark:shadow-[0_0_80px_-40px_rgba(168,85,247,0.9)]"
  const glowBackdrop = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-20 left-6 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl dark:bg-purple-400/35" />
      <div className="absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-500/30" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
    </div>
  )

  const breakdown = calculatePrice(inputs)
  const hasAnyInput = Object.values(inputs).some((v) => v > 0)

  const handleInputChange = (field: keyof QuoteInputs, value: string) => {
    const numValue = Math.max(0, Number.parseInt(value) || 0)
    setInputs((prev) => ({ ...prev, [field]: numValue }))
  }

  const handleReset = () => {
    setInputs({
      websitePages: 0,
      webAppPages: 0,
      ecommercePages: 0,
      mobileScreens: 0,
      desktopFunctions: 0,
      landingPages: 0,
      wordpressTemplates: 0,
      logoDesigns: 0,
      brandingDesigns: 0,
    })
  }

  const displayAmount = (amountSAR: number) => {
    const amount = currency === "USD" ? convertToUSD(amountSAR) : amountSAR
    return formatCurrency(amount, currency)
  }

  const formatBreakdownLabel = (template: string, count: number) =>
    template.replace("{count}", count.toString())

  return (
    <Card className={glowCardClass}>
      {glowBackdrop}
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{t.serviceCalculator.title}</CardTitle>
            <CardDescription>{t.serviceCalculator.description}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="currency-toggle" className="text-sm">
              {t.serviceCalculator.currencyLabel}: {currency}
            </Label>
            <Switch
              id="currency-toggle"
              checked={currency === "USD"}
              onCheckedChange={(checked) => setCurrency(checked ? "USD" : "SAR")}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="websitePages">{t.serviceCalculator.fields.websitePages}</Label>
            <Input
              id="websitePages"
              type="number"
              min="0"
              value={inputs.websitePages || ""}
              onChange={(e) => handleInputChange("websitePages", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="webAppPages">{t.serviceCalculator.fields.webAppPages}</Label>
            <Input
              id="webAppPages"
              type="number"
              min="0"
              value={inputs.webAppPages || ""}
              onChange={(e) => handleInputChange("webAppPages", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ecommercePages">{t.serviceCalculator.fields.ecommercePages}</Label>
            <Input
              id="ecommercePages"
              type="number"
              min="0"
              value={inputs.ecommercePages || ""}
              onChange={(e) => handleInputChange("ecommercePages", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileScreens">{t.serviceCalculator.fields.mobileScreens}</Label>
            <Input
              id="mobileScreens"
              type="number"
              min="0"
              value={inputs.mobileScreens || ""}
              onChange={(e) => handleInputChange("mobileScreens", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="desktopFunctions">{t.serviceCalculator.fields.desktopFunctions}</Label>
            <Input
              id="desktopFunctions"
              type="number"
              min="0"
              value={inputs.desktopFunctions || ""}
              onChange={(e) => handleInputChange("desktopFunctions", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="landingPages">{t.serviceCalculator.fields.landingPages}</Label>
            <Input
              id="landingPages"
              type="number"
              min="0"
              value={inputs.landingPages || ""}
              onChange={(e) => handleInputChange("landingPages", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="wordpressTemplates">{t.serviceCalculator.fields.wordpressTemplates}</Label>
            <Input
              id="wordpressTemplates"
              type="number"
              min="0"
              value={inputs.wordpressTemplates || ""}
              onChange={(e) => handleInputChange("wordpressTemplates", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoDesigns">{t.serviceCalculator.fields.logoDesigns}</Label>
            <Input
              id="logoDesigns"
              type="number"
              min="0"
              value={inputs.logoDesigns || ""}
              onChange={(e) => handleInputChange("logoDesigns", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandingDesigns">{t.serviceCalculator.fields.brandingDesigns}</Label>
            <Input
              id="brandingDesigns"
              type="number"
              min="0"
              value={inputs.brandingDesigns || ""}
              onChange={(e) => handleInputChange("brandingDesigns", e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>
        </div>

        {hasAnyInput && (
          <div className="space-y-3 rounded-lg border border-purple-200/60 bg-white/70 p-4 text-slate-800 dark:border-purple-400/30 dark:bg-white/5 dark:text-slate-100">
            <h3 className="font-semibold">{t.serviceCalculator.breakdownTitle}</h3>
            <div className="space-y-2 text-sm">
              {inputs.websitePages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.website, inputs.websitePages)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.websiteCost)}</span>
                </div>
              )}
              {inputs.webAppPages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.webApp, inputs.webAppPages)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.webAppCost)}</span>
                </div>
              )}
              {inputs.ecommercePages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.ecommerce, inputs.ecommercePages)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.ecommerceCost)}</span>
                </div>
              )}
              {inputs.mobileScreens > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.mobile, inputs.mobileScreens)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.mobileCost)}</span>
                </div>
              )}
              {inputs.desktopFunctions > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.desktop, inputs.desktopFunctions)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.desktopCost)}</span>
                </div>
              )}
              {inputs.landingPages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.landing, inputs.landingPages)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.landingCost)}</span>
                </div>
              )}
              {inputs.wordpressTemplates > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(
                      t.serviceCalculator.breakdownTemplates.wordpress,
                      inputs.wordpressTemplates,
                    )}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.wordpressCost)}</span>
                </div>
              )}
              {inputs.logoDesigns > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.logo, inputs.logoDesigns)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.logoCost)}</span>
                </div>
              )}
              {inputs.brandingDesigns > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.branding, inputs.brandingDesigns)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.brandingCost)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-purple-200/60 pt-2 dark:border-purple-400/30">
                <span className="text-muted-foreground">{t.serviceCalculator.subtotal}</span>
                <span className="font-medium">{displayAmount(breakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.serviceCalculator.setupFee}</span>
                <span className="font-medium">{displayAmount(breakdown.setupFee)}</span>
              </div>
              <div className="flex justify-between border-t border-purple-200/60 pt-2 text-base dark:border-purple-400/30">
                <span className="font-bold">{t.serviceCalculator.total}</span>
                <span className="font-bold">{displayAmount(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1 border-purple-200/70 bg-white/70 text-slate-700 hover:bg-purple-50/80 dark:border-purple-400/30 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-purple-500/10"
          >
            {t.serviceCalculator.actions.reset}
          </Button>
          {showSubmitForm && hasAnyInput && onSubmit && (
            <Button
              onClick={() => onSubmit(inputs)}
              className="flex-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white shadow-[0_15px_30px_-18px_rgba(168,85,247,0.9)] hover:from-purple-400 hover:via-fuchsia-500 hover:to-purple-500"
            >
              {t.serviceCalculator.actions.continue}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
