// Simple in-memory rate limiting
const requests = new Map<string, number[]>()

export function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  const userRequests = requests.get(identifier) || []

  // Filter out old requests outside the time window
  const recentRequests = userRequests.filter((time) => now - time < windowMs)

  if (recentRequests.length >= maxRequests) {
    return false
  }

  recentRequests.push(now)
  requests.set(identifier, recentRequests)

  return true
}
