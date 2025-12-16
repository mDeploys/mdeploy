"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculatePrice, type QuoteInputs } from "@/lib/pricing"
import { convertToUSD, formatCurrency, type Currency } from "@/lib/currency"
import { Switch } from "@/components/ui/switch"

interface ServiceCalculatorProps {
  showSubmitForm?: boolean
  onSubmit?: (inputs: QuoteInputs) => void
}

export function ServiceCalculator({ showSubmitForm = false, onSubmit }: ServiceCalculatorProps) {
  const [currency, setCurrency] = useState<Currency>("SAR")
  const [inputs, setInputs] = useState<QuoteInputs>({
    websitePages: 0,
    webAppPages: 0,
    mobileScreens: 0,
    desktopFunctions: 0,
  })

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
      mobileScreens: 0,
      desktopFunctions: 0,
    })
  }

  const displayAmount = (amountSAR: number) => {
    const amount = currency === "USD" ? convertToUSD(amountSAR) : amountSAR
    return formatCurrency(amount, currency)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Service Cost Calculator</CardTitle>
            <CardDescription>Calculate your project cost based on our transparent pricing</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="currency-toggle" className="text-sm">
              {currency}
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
            <Label htmlFor="websitePages">Website Pages (250 SAR each)</Label>
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
            <Label htmlFor="webAppPages">Web App Pages (300 SAR each)</Label>
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
            <Label htmlFor="mobileScreens">Mobile App Screens (400 SAR each)</Label>
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
            <Label htmlFor="desktopFunctions">Desktop Functions (180 SAR each)</Label>
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
            <h3 className="font-semibold">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              {inputs.websitePages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Website Pages ({inputs.websitePages} × 250 SAR)</span>
                  <span className="font-medium">{displayAmount(breakdown.websiteCost)}</span>
                </div>
              )}
              {inputs.webAppPages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Web App Pages ({inputs.webAppPages} × 300 SAR)</span>
                  <span className="font-medium">{displayAmount(breakdown.webAppCost)}</span>
                </div>
              )}
              {inputs.mobileScreens > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mobile Screens ({inputs.mobileScreens} × 400 SAR)</span>
                  <span className="font-medium">{displayAmount(breakdown.mobileCost)}</span>
                </div>
              )}
              {inputs.desktopFunctions > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Desktop Functions ({inputs.desktopFunctions} × 180 SAR)</span>
                  <span className="font-medium">{displayAmount(breakdown.desktopCost)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{displayAmount(breakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Setup & Handling Fee</span>
                <span className="font-medium">{displayAmount(breakdown.setupFee)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base">
                <span className="font-bold">Total</span>
                <span className="font-bold">{displayAmount(breakdown.total)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} className="flex-1 bg-transparent">
            Reset
          </Button>
          {showSubmitForm && hasAnyInput && onSubmit && (
            <Button onClick={() => onSubmit(inputs)} className="flex-1">
              Continue to Submit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
