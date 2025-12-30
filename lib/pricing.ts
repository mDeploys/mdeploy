export interface PricingConfig {
  websitePagePrice: number
  webAppPagePrice: number
  ecommercePagePrice: number
  mobileScreenPrice: number
  desktopFunctionPrice: number
  landingPagePrice: number
  wordpressTemplatePrice: number
  logoDesignPrice: number
  brandingDesignPrice: number
  setupFee: number
  // Addons
  backendHostingYearly: number
  webHosting5GBYearly: number
  webHosting10GBYearly: number
  cloudHosting20GBYearly: number
  paymentGatewayOneTime: number
  mailServerOneTime: number
}

export const PRICING_SAR: PricingConfig = {
  websitePagePrice: 250,
  webAppPagePrice: 300,
  ecommercePagePrice: 450,
  mobileScreenPrice: 300,
  desktopFunctionPrice: 180,
  landingPagePrice: 500,
  wordpressTemplatePrice: 1500,
  logoDesignPrice: 300,
  brandingDesignPrice: 1500,
  setupFee: 300,
  // Addons
  backendHostingYearly: 1500,
  webHosting5GBYearly: 500,
  webHosting10GBYearly: 800,
  cloudHosting20GBYearly: 1000,
  paymentGatewayOneTime: 800,
  mailServerOneTime: 350,
}

export interface QuoteInputs {
  websitePages: number
  webAppPages: number
  ecommercePages: number
  mobileScreens: number
  desktopFunctions: number
  landingPages: number
  wordpressTemplates: number
  logoDesigns: number
  brandingDesigns: number
  // Addons - usually booleans for one-time/yearly selection, or number if quantity based.
  // The request says "Add the following addons as an option". Assuming checkboxes (boolean).
  backendHosting: boolean
  webHosting5GB: boolean
  webHosting10GB: boolean
  cloudHosting20GB: boolean
  paymentGateway: boolean
  mailServer: boolean
}

export interface PriceBreakdown {
  websiteCost: number
  webAppCost: number
  ecommerceCost: number
  mobileCost: number
  desktopCost: number
  landingCost: number
  wordpressCost: number
  logoCost: number
  brandingCost: number
  setupFee: number
  // Addons cost
  addonsCost: number
  subtotal: number
  total: number
}

export function calculatePrice(inputs: Partial<QuoteInputs>): PriceBreakdown {
  const websiteCost = (inputs.websitePages || 0) * PRICING_SAR.websitePagePrice
  const webAppCost = (inputs.webAppPages || 0) * PRICING_SAR.webAppPagePrice
  const ecommerceCost = (inputs.ecommercePages || 0) * PRICING_SAR.ecommercePagePrice
  const mobileCost = (inputs.mobileScreens || 0) * PRICING_SAR.mobileScreenPrice
  const desktopCost = (inputs.desktopFunctions || 0) * PRICING_SAR.desktopFunctionPrice
  const landingCost = (inputs.landingPages || 0) * PRICING_SAR.landingPagePrice
  const wordpressCost = (inputs.wordpressTemplates || 0) * PRICING_SAR.wordpressTemplatePrice
  const logoCost = (inputs.logoDesigns || 0) * PRICING_SAR.logoDesignPrice
  const brandingCost = (inputs.brandingDesigns || 0) * PRICING_SAR.brandingDesignPrice

  let addonsCost = 0
  if (inputs.backendHosting) addonsCost += PRICING_SAR.backendHostingYearly
  if (inputs.webHosting5GB) addonsCost += PRICING_SAR.webHosting5GBYearly
  if (inputs.webHosting10GB) addonsCost += PRICING_SAR.webHosting10GBYearly
  if (inputs.cloudHosting20GB) addonsCost += PRICING_SAR.cloudHosting20GBYearly
  if (inputs.paymentGateway) addonsCost += PRICING_SAR.paymentGatewayOneTime
  if (inputs.mailServer) addonsCost += PRICING_SAR.mailServerOneTime

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

  const total = subtotal + PRICING_SAR.setupFee

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
    setupFee: PRICING_SAR.setupFee,
    addonsCost,
    subtotal,
    total,
  }
}
