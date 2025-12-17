export const ADMIN_AUTH_COOKIE = "mdeploy-admin-auth"

const DEFAULT_MAX_AGE = 60 * 60 * 6 // 6 hours

export function setAdminAuthCookie(value: string, maxAgeSeconds = DEFAULT_MAX_AGE) {
  if (typeof document === "undefined") return
  document.cookie = `${ADMIN_AUTH_COOKIE}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; sameSite=Lax`
}

export function clearAdminAuthCookie() {
  if (typeof document === "undefined") return
  document.cookie = `${ADMIN_AUTH_COOKIE}=; path=/; max-age=0; sameSite=Lax`
}
