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
  })
  const { language } = useLanguage()
  const t = translations[language]

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
    })
  }

  const displayAmount = (amountSAR: number) => {
    const amount = currency === "USD" ? convertToUSD(amountSAR) : amountSAR
    return formatCurrency(amount, currency)
  }

  const formatBreakdownLabel = (template: string, count: number) =>
    template.replace("{count}", count.toString())

  return (
    <Card className="w-full">
      <CardHeader>
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
      <CardContent className="space-y-6">
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
            />
          </div>
        </div>

        {hasAnyInput && (
          <div className="space-y-3 rounded-lg border border-border bg-muted/50 p-4">
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
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">{t.serviceCalculator.subtotal}</span>
                <span className="font-medium">{displayAmount(breakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.serviceCalculator.setupFee}</span>
                <span className="font-medium">{displayAmount(breakdown.setupFee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <span className="font-bold">{t.serviceCalculator.total}</span>
                <span className="font-bold">{displayAmount(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
            {t.serviceCalculator.actions.reset}
          </Button>
          {showSubmitForm && hasAnyInput && onSubmit && (
            <Button onClick={() => onSubmit(inputs)} className="flex-1">
              {t.serviceCalculator.actions.continue}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
