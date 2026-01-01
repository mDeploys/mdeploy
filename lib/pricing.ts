import { Currency } from "./currency"

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
  // Allow for other dynamic keys
  [key: string]: number
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
  // Addons
  backendHosting: boolean
  webHosting5GB: boolean
  webHosting10GB: boolean
  cloudHosting20GB: boolean
  paymentGateway: boolean
  mailServer: boolean
}

export const calculatePrice = (inputs: QuoteInputs, config: PricingConfig = PRICING_SAR) => {
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
