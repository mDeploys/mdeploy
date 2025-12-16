export type Currency = "SAR" | "USD"

export function getExchangeRate(): number {
  const rate = process.env.NEXT_PUBLIC_USD_PER_SAR
  return rate ? Number.parseFloat(rate) : 0.266
}

export function convertToUSD(amountSAR: number): number {
  return amountSAR * getExchangeRate()
}

export function formatCurrency(amount: number, currency: Currency): string {
  const formatted = amount.toFixed(2)
  return currency === "SAR" ? `${formatted} SAR` : `$${formatted}`
}
