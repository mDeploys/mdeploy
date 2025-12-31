import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { calculatePrice, type QuoteInputs, PRICING_SAR, type PricingConfig } from "@/lib/pricing"
import { convertToUSD, formatCurrency, type Currency } from "@/lib/currency"
import { Switch } from "@/components/ui/switch"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"

interface ServiceCalculatorProps {
  showSubmitForm?: boolean
  onSubmit?: (inputs: QuoteInputs) => void
}

export function ServiceCalculator({ showSubmitForm = false, onSubmit }: ServiceCalculatorProps) {
  const [currency, setCurrency] = useState<Currency>("SAR")
  const [config, setConfig] = useState<PricingConfig>(PRICING_SAR)
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
    // Addons
    backendHosting: false,
    webHosting5GB: false,
    webHosting10GB: false,
    cloudHosting20GB: false,
    paymentGateway: false,
    mailServer: false,
  })
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    async function loadPricing() {
      if (!isSupabaseConfigured) return

      const { data } = await supabase.from("pricing_config").select("*")
      if (data && data.length > 0) {
        const newConfig = { ...PRICING_SAR }
        data.forEach((item: any) => {
          if (item.key in newConfig) {
            (newConfig as any)[item.key] = Number(item.value)
          }
        })
        setConfig(newConfig)
      }
    }
    loadPricing()
  }, [])

  const inputClass =
    "bg-white/70 border-purple-200/60 text-slate-900 placeholder:text-slate-400 focus-visible:border-purple-400 focus-visible:ring-purple-200/60 dark:bg-white/5 dark:border-purple-400/30 dark:text-slate-100 dark:placeholder:text-purple-200/60 dark:focus-visible:border-purple-300 dark:focus-visible:ring-purple-400/40"
  const glowCardClass =
    "relative overflow-hidden border border-purple-200/60 bg-white/85 shadow-[0_0_40px_-30px_rgba(147,51,234,0.5)] dark:border-purple-400/30 dark:bg-gradient-to-br dark:from-[#12062a]/90 dark:via-[#12062a]/90 dark:to-[#090414] dark:shadow-[0_0_80px_-40px_rgba(168,85,247,0.9)]"
  const glowBackdrop = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl dark:bg-fuchsia-500/30" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent" />
    </div>
  )

  // Custom calculate price using dynamic config
  const calculateDynamicPrice = (inputs: QuoteInputs, config: PricingConfig) => {
    const websiteCost = inputs.websitePages * config.websitePagePrice
    const webAppCost = inputs.webAppPages * config.webAppPagePrice
    const ecommerceCost = inputs.ecommercePages * config.ecommercePagePrice
    const mobileCost = inputs.mobileScreens * config.mobileScreenPrice
    const desktopCost = inputs.desktopFunctions * config.desktopFunctionPrice
    const landingCost = inputs.landingPages * config.landingPagePrice
    const wordpressCost = inputs.wordpressTemplates * config.wordpressTemplatePrice
    const logoCost = inputs.logoDesigns * config.logoDesignPrice
    const brandingCost = inputs.brandingDesigns * config.brandingDesignPrice

    let addonsCost = 0
    if (inputs.backendHosting) addonsCost += config.backendHostingYearly
    if (inputs.webHosting5GB) addonsCost += config.webHosting5GBYearly
    if (inputs.webHosting10GB) addonsCost += config.webHosting10GBYearly
    if (inputs.cloudHosting20GB) addonsCost += config.cloudHosting20GBYearly
    if (inputs.paymentGateway) addonsCost += config.paymentGatewayOneTime
    if (inputs.mailServer) addonsCost += config.mailServerOneTime

    const subtotal =
      websiteCost +
      webAppCost +
      ecommerceCost +
      mobileCost +
      desktopCost +
      landingCost +
      wordpressCost +
      logoCost +
      brandingCost +
      addonsCost
    const total = subtotal + config.setupFee

    return {
      websiteCost,
      webAppCost,
      ecommerceCost,
      mobileCost,
      desktopCost,
      landingCost,
      wordpressCost,
      logoCost,
      brandingCost,
      setupFee: config.setupFee,
      addonsCost,
      subtotal,
      total,
    }
  }

  const breakdown = calculateDynamicPrice(inputs, config)
  const hasAnyInput = Object.values(inputs).some((v) => (typeof v === 'boolean' ? v : v > 0))

  const handleInputChange = (field: keyof QuoteInputs, value: string) => {
    const numValue = Math.max(0, Number.parseInt(value) || 0)
    setInputs((prev) => ({ ...prev, [field]: numValue }))
  }

  const handleCheckboxChange = (field: keyof QuoteInputs, checked: boolean) => {
    setInputs((prev) => ({ ...prev, [field]: checked }))
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
      backendHosting: false,
      webHosting5GB: false,
      webHosting10GB: false,
      cloudHosting20GB: false,
      paymentGateway: false,
      mailServer: false,
    })
  }

  const displayAmount = (amountSAR: number) => {
    const amount = currency === "USD" ? convertToUSD(amountSAR) : amountSAR
    return formatCurrency(amount, currency)
  }

  const formatLabel = (template: string, priceSAR: number) =>
    template.replace("{price}", displayAmount(priceSAR))

  const formatBreakdownLabel = (template: string, count: number, priceSAR: number) =>
    template.replace("{count}", count.toString()).replace("{price}", displayAmount(priceSAR))

  const checkboxClass = "h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500 accent-purple-600"
  const checkboxContainerClass = "flex items-center space-x-3 rounded-lg border border-purple-200/60 bg-white/50 p-3 hover:bg-white/80 transition-colors dark:border-purple-400/30 dark:bg-white/5 dark:hover:bg-white/10"

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
      <CardContent className="relative space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="websitePages">{formatLabel(t.serviceCalculator.fields.websitePages, config.websitePagePrice)}</Label>
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
            <Label htmlFor="webAppPages">{formatLabel(t.serviceCalculator.fields.webAppPages, config.webAppPagePrice)}</Label>
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
            <Label htmlFor="ecommercePages">{formatLabel(t.serviceCalculator.fields.ecommercePages, config.ecommercePagePrice)}</Label>
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
            <Label htmlFor="mobileScreens">{formatLabel(t.serviceCalculator.fields.mobileScreens, config.mobileScreenPrice)}</Label>
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
            <Label htmlFor="desktopFunctions">{formatLabel(t.serviceCalculator.fields.desktopFunctions, config.desktopFunctionPrice)}</Label>
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
            <Label htmlFor="landingPages">{formatLabel(t.serviceCalculator.fields.landingPages, config.landingPagePrice)}</Label>
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
            <Label htmlFor="wordpressTemplates">{formatLabel(t.serviceCalculator.fields.wordpressTemplates, config.wordpressTemplatePrice)}</Label>
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
            <Label htmlFor="logoDesigns">{formatLabel(t.serviceCalculator.fields.logoDesigns, config.logoDesignPrice)}</Label>
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
            <Label htmlFor="brandingDesigns">{formatLabel(t.serviceCalculator.fields.brandingDesigns, config.brandingDesignPrice)}</Label>
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

        <div className="space-y-4">
          <Label className="text-lg font-semibold text-slate-800 dark:text-slate-100">{t.serviceCalculator.addonsTitle}</Label>
          <div className="grid gap-4 md:grid-cols-2">
            <div className={checkboxContainerClass}>
              <input
                type="checkbox"
                id="backendHosting"
                checked={inputs.backendHosting}
                onChange={(e) => handleCheckboxChange("backendHosting", e.target.checked)}
                className={checkboxClass}
              />
              <Label htmlFor="backendHosting" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                {formatLabel(t.serviceCalculator.fields.backendHosting, config.backendHostingYearly)}
              </Label>
            </div>

            <div className={checkboxContainerClass}>
              <input
                type="checkbox"
                id="webHosting5GB"
                checked={inputs.webHosting5GB}
                onChange={(e) => handleCheckboxChange("webHosting5GB", e.target.checked)}
                className={checkboxClass}
              />
              <Label htmlFor="webHosting5GB" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                {formatLabel(t.serviceCalculator.fields.webHosting5GB, config.webHosting5GBYearly)}
              </Label>
            </div>

            <div className={checkboxContainerClass}>
              <input
                type="checkbox"
                id="webHosting10GB"
                checked={inputs.webHosting10GB}
                onChange={(e) => handleCheckboxChange("webHosting10GB", e.target.checked)}
                className={checkboxClass}
              />
              <Label htmlFor="webHosting10GB" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                {formatLabel(t.serviceCalculator.fields.webHosting10GB, config.webHosting10GBYearly)}
              </Label>
            </div>

            <div className={checkboxContainerClass}>
              <input
                type="checkbox"
                id="cloudHosting20GB"
                checked={inputs.cloudHosting20GB}
                onChange={(e) => handleCheckboxChange("cloudHosting20GB", e.target.checked)}
                className={checkboxClass}
              />
              <Label htmlFor="cloudHosting20GB" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                {formatLabel(t.serviceCalculator.fields.cloudHosting20GB, config.cloudHosting20GBYearly)}
              </Label>
            </div>

            <div className={checkboxContainerClass}>
              <input
                type="checkbox"
                id="paymentGateway"
                checked={inputs.paymentGateway}
                onChange={(e) => handleCheckboxChange("paymentGateway", e.target.checked)}
                className={checkboxClass}
              />
              <Label htmlFor="paymentGateway" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                {formatLabel(t.serviceCalculator.fields.paymentGateway, config.paymentGatewayOneTime)}
              </Label>
            </div>

            <div className={checkboxContainerClass}>
              <input
                type="checkbox"
                id="mailServer"
                checked={inputs.mailServer}
                onChange={(e) => handleCheckboxChange("mailServer", e.target.checked)}
                className={checkboxClass}
              />
              <Label htmlFor="mailServer" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                {formatLabel(t.serviceCalculator.fields.mailServer, config.mailServerOneTime)}
              </Label>
            </div>
          </div>
        </div>

        {hasAnyInput && (
          <div className="space-y-3 rounded-lg border border-purple-200/60 bg-white/70 p-4 text-slate-800 dark:border-purple-400/30 dark:bg-white/5 dark:text-slate-100">
            <h3 className="font-semibold">{t.serviceCalculator.breakdownTitle}</h3>
            <div className="space-y-2 text-sm">
              {inputs.websitePages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.website, inputs.websitePages, config.websitePagePrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.websiteCost)}</span>
                </div>
              )}
              {inputs.webAppPages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.webApp, inputs.webAppPages, config.webAppPagePrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.webAppCost)}</span>
                </div>
              )}
              {inputs.ecommercePages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.ecommerce, inputs.ecommercePages, config.ecommercePagePrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.ecommerceCost)}</span>
                </div>
              )}
              {inputs.mobileScreens > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.mobile, inputs.mobileScreens, config.mobileScreenPrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.mobileCost)}</span>
                </div>
              )}
              {inputs.desktopFunctions > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.desktop, inputs.desktopFunctions, config.desktopFunctionPrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.desktopCost)}</span>
                </div>
              )}
              {inputs.landingPages > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.landing, inputs.landingPages, config.landingPagePrice)}
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
                      config.wordpressTemplatePrice
                    )}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.wordpressCost)}</span>
                </div>
              )}
              {inputs.logoDesigns > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.logo, inputs.logoDesigns, config.logoDesignPrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.logoCost)}</span>
                </div>
              )}
              {inputs.brandingDesigns > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {formatBreakdownLabel(t.serviceCalculator.breakdownTemplates.branding, inputs.brandingDesigns, config.brandingDesignPrice)}
                  </span>
                  <span className="font-medium">{displayAmount(breakdown.brandingCost)}</span>
                </div>
              )}

              {breakdown.addonsCost > 0 && (
                <div className="border-t border-purple-200/60 pt-2 mt-2 dark:border-purple-400/30 space-y-2">
                  {inputs.backendHosting && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatLabel(t.serviceCalculator.breakdownTemplates.backendHosting, config.backendHostingYearly)}</span>
                      <span className="font-medium">{displayAmount(config.backendHostingYearly)}</span>
                    </div>
                  )}
                  {inputs.webHosting5GB && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatLabel(t.serviceCalculator.breakdownTemplates.webHosting5GB, config.webHosting5GBYearly)}</span>
                      <span className="font-medium">{displayAmount(config.webHosting5GBYearly)}</span>
                    </div>
                  )}
                  {inputs.webHosting10GB && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatLabel(t.serviceCalculator.breakdownTemplates.webHosting10GB, config.webHosting10GBYearly)}</span>
                      <span className="font-medium">{displayAmount(config.webHosting10GBYearly)}</span>
                    </div>
                  )}
                  {inputs.cloudHosting20GB && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatLabel(t.serviceCalculator.breakdownTemplates.cloudHosting20GB, config.cloudHosting20GBYearly)}</span>
                      <span className="font-medium">{displayAmount(config.cloudHosting20GBYearly)}</span>
                    </div>
                  )}
                  {inputs.paymentGateway && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatLabel(t.serviceCalculator.breakdownTemplates.paymentGateway, config.paymentGatewayOneTime)}</span>
                      <span className="font-medium">{displayAmount(config.paymentGatewayOneTime)}</span>
                    </div>
                  )}
                  {inputs.mailServer && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{formatLabel(t.serviceCalculator.breakdownTemplates.mailServer, config.mailServerOneTime)}</span>
                      <span className="font-medium">{displayAmount(config.mailServerOneTime)}</span>
                    </div>
                  )}
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
            className="flex-1 border-purple-200/70 bg-white/70 text-slate-700 hover:bg-purple-50/80 hover:text-purple-700 dark:border-purple-400/30 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-purple-500/10 dark:hover:text-purple-300 transition-colors"
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
