export interface PricingConfig {
  websitePagePrice: number
  webAppPagePrice: number
  mobileScreenPrice: number
  desktopFunctionPrice: number
  setupFee: number
}

export const PRICING_SAR: PricingConfig = {
  websitePagePrice: 250,
  webAppPagePrice: 300,
  mobileScreenPrice: 400,
  desktopFunctionPrice: 180,
  setupFee: 200,
}

export interface QuoteInputs {
  websitePages: number
  webAppPages: number
  mobileScreens: number
  desktopFunctions: number
}

export interface PriceBreakdown {
  websiteCost: number
  webAppCost: number
  mobileCost: number
  desktopCost: number
  setupFee: number
  subtotal: number
  total: number
}

export function calculatePrice(inputs: QuoteInputs): PriceBreakdown {
  const websiteCost = inputs.websitePages * PRICING_SAR.websitePagePrice
  const webAppCost = inputs.webAppPages * PRICING_SAR.webAppPagePrice
  const mobileCost = inputs.mobileScreens * PRICING_SAR.mobileScreenPrice
  const desktopCost = inputs.desktopFunctions * PRICING_SAR.desktopFunctionPrice

  const subtotal = websiteCost + webAppCost + mobileCost + desktopCost
  const total = subtotal + PRICING_SAR.setupFee

  return {
    websiteCost,
    webAppCost,
    mobileCost,
    desktopCost,
    setupFee: PRICING_SAR.setupFee,
    subtotal,
    total,
  }
}
