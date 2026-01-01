import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { type QuoteInputs, PRICING_SAR, type PricingConfig } from "@/lib/pricing"
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

  const glowBackdrop = (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
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

    // Non-complexity based services
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
  const hasAnyInput = Object.values(inputs).some((v) => (typeof v === 'boolean' ? v : typeof v === 'number' && v > 0))

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

  const formatLabel = (template: string, priceSAR: number, showPrice: boolean) => {
    if (showPrice) {
      return template.replace("{price}", displayAmount(priceSAR))
    }
    return template.replace("{price} ", "").replace("{price}", "").trim()
  }

  const formatBreakdownLabel = (template: string, count: number, priceSAR: number) => {
    let base = template.replace("{count}", count.toString()).replace("{price}", displayAmount(priceSAR))
    return base
  }

  const checkboxClass = "h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500 accent-purple-600"
  const checkboxContainerClass = "flex items-center space-x-3 rounded-lg border border-purple-200/60 bg-white/50 p-3 hover:bg-white/80 transition-colors dark:border-purple-400/30 dark:bg-white/5 dark:hover:bg-white/10"

  const DevelopmentRow = ({
    id,
    labelKey,
    countKey,
    price
  }: {
    id: string,
    labelKey: string,
    countKey: keyof QuoteInputs,
    price: number
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{formatLabel(labelKey, price, (inputs[countKey] as number) > 0)}</Label>
      <Input
        id={id}
        type="number"
        min="0"
        value={inputs[countKey] as number || ""}
        onChange={(e) => handleInputChange(countKey, e.target.value)}
        placeholder="0"
        className={inputClass}
      />
    </div>
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-start">
      {glowBackdrop}

      {/* Left Column: Configuration */}
      <div className="lg:col-span-2 space-y-6 relative z-10">
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{t.serviceCalculator.title}</h2>
              <p className="text-slate-500 dark:text-slate-400">{t.serviceCalculator.description}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
              <Label htmlFor="currency-toggle" className="text-sm font-medium">
                {currency}
              </Label>
              <Switch
                id="currency-toggle"
                checked={currency === "USD"}
                onCheckedChange={(checked) => setCurrency(checked ? "USD" : "SAR")}
              />
            </div>
          </div>
        </div>

        {/* Development Services Card */}
        <Card className="border border-purple-200/60 bg-white/80 dark:border-purple-400/20 dark:bg-[#12062a]/80 backdrop-blur-md shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {t.serviceCalculator.developmentTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <DevelopmentRow
              id="websitePages"
              labelKey={t.serviceCalculator.fields.websitePages}
              countKey="websitePages"
              price={config.websitePagePrice}
            />
            <DevelopmentRow
              id="webAppPages"
              labelKey={t.serviceCalculator.fields.webAppPages}
              countKey="webAppPages"
              price={config.webAppPagePrice}
            />
            <DevelopmentRow
              id="ecommercePages"
              labelKey={t.serviceCalculator.fields.ecommercePages}
              countKey="ecommercePages"
              price={config.ecommercePagePrice}
            />
            <DevelopmentRow
              id="mobileScreens"
              labelKey={t.serviceCalculator.fields.mobileScreens}
              countKey="mobileScreens"
              price={config.mobileScreenPrice}
            />
            <DevelopmentRow
              id="desktopFunctions"
              labelKey={t.serviceCalculator.fields.desktopFunctions}
              countKey="desktopFunctions"
              price={config.desktopFunctionPrice}
            />
          </CardContent>
        </Card>

        {/* Design & Templates Card */}
        <Card className="border border-purple-200/60 bg-white/80 dark:border-purple-400/20 dark:bg-[#12062a]/80 backdrop-blur-md shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {t.serviceCalculator.designTitle}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="landingPages">{formatLabel(t.serviceCalculator.fields.landingPages, config.landingPagePrice, (inputs.landingPages ?? 0) > 0)}</Label>
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
              <Label htmlFor="wordpressTemplates">{formatLabel(t.serviceCalculator.fields.wordpressTemplates, config.wordpressTemplatePrice, (inputs.wordpressTemplates ?? 0) > 0)}</Label>
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
              <Label htmlFor="logoDesigns">{formatLabel(t.serviceCalculator.fields.logoDesigns, config.logoDesignPrice, (inputs.logoDesigns ?? 0) > 0)}</Label>
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
              <Label htmlFor="brandingDesigns">{formatLabel(t.serviceCalculator.fields.brandingDesigns, config.brandingDesignPrice, (inputs.brandingDesigns ?? 0) > 0)}</Label>
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
          </CardContent>
        </Card>

        {/* Add-ons Card */}
        <Card className="border border-purple-200/60 bg-white/80 dark:border-purple-400/20 dark:bg-[#12062a]/80 backdrop-blur-md shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-purple-600 dark:text-purple-400">
              {t.serviceCalculator.addonsTitle}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {/* Hosting & Setup */}
              <div className={checkboxContainerClass}>
                <input
                  type="checkbox"
                  id="backendHosting"
                  checked={inputs.backendHosting}
                  onChange={(e) => handleCheckboxChange("backendHosting", e.target.checked)}
                  className={checkboxClass}
                />
                <Label htmlFor="backendHosting" className="flex-1 cursor-pointer font-normal text-slate-700 dark:text-slate-300">
                  {formatLabel(t.serviceCalculator.fields.backendHosting, config.backendHostingYearly, !!inputs.backendHosting)}
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
                  {formatLabel(t.serviceCalculator.fields.webHosting5GB, config.webHosting5GBYearly, !!inputs.webHosting5GB)}
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
                  {formatLabel(t.serviceCalculator.fields.webHosting10GB, config.webHosting10GBYearly, !!inputs.webHosting10GB)}
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
                  {formatLabel(t.serviceCalculator.fields.cloudHosting20GB, config.cloudHosting20GBYearly, !!inputs.cloudHosting20GB)}
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
                  {formatLabel(t.serviceCalculator.fields.paymentGateway, config.paymentGatewayOneTime, !!inputs.paymentGateway)}
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
                  {formatLabel(t.serviceCalculator.fields.mailServer, config.mailServerOneTime, !!inputs.mailServer)}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Sticky Summary */}
      <div className="lg:col-span-1 relative z-10 lg:sticky lg:top-8">
        <Card className="border border-purple-200/60 bg-slate-900/90 text-white shadow-xl dark:border-purple-400/30 overflow-hidden">
          {/* Aesthetic glow for the summary card */}
          <div className="absolute top-0 right-0 p-12 bg-purple-500/20 rounded-full blur-2xl -mr-6 -mt-6"></div>

          <CardHeader className="pb-4 border-b border-white/10">
            <CardTitle className="text-xl">{t.serviceCalculator.summaryTitle}</CardTitle>
            <CardDescription className="text-slate-400">{t.serviceCalculator.summarySubtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{t.serviceCalculator.developmentLabel}</div>
                <div className="font-semibold">{displayAmount(breakdown.websiteCost + breakdown.webAppCost + breakdown.mobileCost + breakdown.desktopCost + breakdown.ecommerceCost)}</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{t.serviceCalculator.designLabel}</div>
                <div className="font-semibold">{displayAmount(breakdown.landingCost + breakdown.wordpressCost + breakdown.logoCost + breakdown.brandingCost)}</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{t.serviceCalculator.addonsLabel}</div>
                <div className="font-semibold">{displayAmount(breakdown.addonsCost)}</div>
              </div>
              <div className="rounded-lg bg-white/5 p-3 border border-white/10">
                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">{t.serviceCalculator.setupLabel}</div>
                <div className="font-semibold">{displayAmount(breakdown.setupFee)}</div>
              </div>
            </div>

            {/* Detailed Line Items */}
            {hasAnyInput ? (
              <div className="space-y-3 py-2">
                <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Details</div>
                <div className="space-y-2 text-sm max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {/* Setup Fee - Explicitly Listed */}
                  <div className="flex justify-between items-start pb-2 mb-2 border-b border-white/5">
                    <div className="flex flex-col">
                      <span className="text-slate-300 text-xs">{t.serviceCalculator.setupFeeDetails}</span>
                      <span className="text-[10px] text-slate-500">{t.serviceCalculator.setupFeeDescription}</span>
                    </div>
                    <span className="font-mono text-xs">{displayAmount(config.setupFee)}</span>
                  </div>

                  {Object.entries({
                    website: { count: inputs.websitePages, cost: breakdown.websiteCost, price: config.websitePagePrice, tpl: t.serviceCalculator.breakdownTemplates.website },
                    webApp: { count: inputs.webAppPages, cost: breakdown.webAppCost, price: config.webAppPagePrice, tpl: t.serviceCalculator.breakdownTemplates.webApp },
                    ecommerce: { count: inputs.ecommercePages, cost: breakdown.ecommerceCost, price: config.ecommercePagePrice, tpl: t.serviceCalculator.breakdownTemplates.ecommerce },
                    mobile: { count: inputs.mobileScreens, cost: breakdown.mobileCost, price: config.mobileScreenPrice, tpl: t.serviceCalculator.breakdownTemplates.mobile },
                    desktop: { count: inputs.desktopFunctions, cost: breakdown.desktopCost, price: config.desktopFunctionPrice, tpl: t.serviceCalculator.breakdownTemplates.desktop },
                    landing: { count: inputs.landingPages, cost: breakdown.landingCost, price: config.landingPagePrice, tpl: t.serviceCalculator.breakdownTemplates.landing },
                    wordpress: { count: inputs.wordpressTemplates, cost: breakdown.wordpressCost, price: config.wordpressTemplatePrice, tpl: t.serviceCalculator.breakdownTemplates.wordpress },
                    logo: { count: inputs.logoDesigns, cost: breakdown.logoCost, price: config.logoDesignPrice, tpl: t.serviceCalculator.breakdownTemplates.logo },
                    branding: { count: inputs.brandingDesigns, cost: breakdown.brandingCost, price: config.brandingDesignPrice, tpl: t.serviceCalculator.breakdownTemplates.branding },
                  }).map(([key, data]) => {
                    if (data.count > 0) {
                      return (
                        <div key={key} className="flex justify-between items-start">
                          <span className="text-slate-300 text-xs">
                            {formatBreakdownLabel(data.tpl, data.count, data.price).split('AED')[0].split('SAR')[0].split('$')[0].trim()}
                          </span>
                          <span className="font-mono text-xs">{displayAmount(data.cost)}</span>
                        </div>
                      )
                    }
                    return null
                  })}

                  {/* Addons List */}
                  {inputs.backendHosting && <div className="flex justify-between text-xs"><span className="text-slate-300">Backend Hosting</span><span className="font-mono">{displayAmount(config.backendHostingYearly)}</span></div>}
                  {inputs.webHosting5GB && <div className="flex justify-between text-xs"><span className="text-slate-300">Web Hosting (5GB)</span><span className="font-mono">{displayAmount(config.webHosting5GBYearly)}</span></div>}
                  {inputs.webHosting10GB && <div className="flex justify-between text-xs"><span className="text-slate-300">Web Hosting (10GB)</span><span className="font-mono">{displayAmount(config.webHosting10GBYearly)}</span></div>}
                  {inputs.cloudHosting20GB && <div className="flex justify-between text-xs"><span className="text-slate-300">Cloud Hosting (20GB)</span><span className="font-mono">{displayAmount(config.cloudHosting20GBYearly)}</span></div>}
                  {inputs.paymentGateway && <div className="flex justify-between text-xs"><span className="text-slate-300">Payment Gateway</span><span className="font-mono">{displayAmount(config.paymentGatewayOneTime)}</span></div>}
                  {inputs.mailServer && <div className="flex justify-between text-xs"><span className="text-slate-300">Mail Server</span><span className="font-mono">{displayAmount(config.mailServerOneTime)}</span></div>}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 text-sm">
                {t.serviceCalculator.selectServicesPrompt}
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm text-slate-300">{t.serviceCalculator.estimatedTotal}</span>
                <span className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  {displayAmount(breakdown.total)}
                </span>
              </div>
              {currency === "SAR" && (
                <div className="flex justify-end text-xs text-slate-500">
                  {t.serviceCalculator.approxLabel} {formatCurrency(convertToUSD(breakdown.total), "USD")}
                </div>
              )}
            </div>

            <div className="grid gap-2 pt-2">
              <Button
                onClick={handleReset}
                variant="ghost"
                className="w-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                {t.serviceCalculator.actions.reset}
              </Button>

              {showSubmitForm && hasAnyInput && onSubmit && (
                <Button
                  onClick={() => onSubmit(inputs)}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-900/20"
                >
                  {t.serviceCalculator.actions.continue}
                </Button>
              )}
            </div>

          </CardContent>

          {/* FAQ / Info Section at bottom of sticky card */}
          <div className="bg-black/20 p-4 border-t border-white/5 space-y-2">
            <div className="flex items-start gap-2 text-xs text-slate-400">
              <span className="w-4 h-4 mt-0.5 rounded-full border border-current flex-shrink-0 flex items-center justify-center text-[10px] opacity-70">i</span>
              <p><strong>{t.serviceCalculator.setupFeeDetails} ({displayAmount(config.setupFee)})</strong> {t.serviceCalculator.setupFeeDescription}.</p>
            </div>
          </div>

        </Card>
      </div>

    </div>
  )
}
