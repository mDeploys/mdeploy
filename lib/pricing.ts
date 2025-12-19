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
  setupFee: 200,
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
  subtotal: number
  total: number
}

export function calculatePrice(inputs: QuoteInputs): PriceBreakdown {
  const websiteCost = inputs.websitePages * PRICING_SAR.websitePagePrice
  const webAppCost = inputs.webAppPages * PRICING_SAR.webAppPagePrice
  const ecommerceCost = inputs.ecommercePages * PRICING_SAR.ecommercePagePrice
  const mobileCost = inputs.mobileScreens * PRICING_SAR.mobileScreenPrice
  const desktopCost = inputs.desktopFunctions * PRICING_SAR.desktopFunctionPrice
  const landingCost = inputs.landingPages * PRICING_SAR.landingPagePrice
  const wordpressCost = inputs.wordpressTemplates * PRICING_SAR.wordpressTemplatePrice
  const logoCost = inputs.logoDesigns * PRICING_SAR.logoDesignPrice
  const brandingCost = inputs.brandingDesigns * PRICING_SAR.brandingDesignPrice

  const subtotal =
    websiteCost +
    webAppCost +
    ecommerceCost +
    mobileCost +
    desktopCost +
    landingCost +
    wordpressCost +
    logoCost +
    brandingCost
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
    subtotal,
    total,
  }
}
