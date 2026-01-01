"use client"

import HCaptcha from "@hcaptcha/react-hcaptcha"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { signInWithEmail, signUpWithEmail, isSupabaseConfigured } from "@/lib/supabase"
import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { setAdminAuthCookie } from "@/lib/admin-auth-cookie"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const { language } = useLanguage()
  const t = translations[language]

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      toast.error(t.adminLogin.toast.configMissing)
      return
    }

    if (!captchaToken) {
      toast.error("Please complete the captcha verification")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await signInWithEmail(email, password)
      if (error) {
        console.error("Login Error Details:", error)

        // Map specific error statuses to user-friendly messages
        let message = t.adminLogin.toast.networkError

        if (error.status === 400 || error.message.toLowerCase().includes("invalid login")) {
          // 400 Bad Request usually means Invalid Credentials in auth
          message = t.adminLogin.toast.invalidCredentials
        } else if (error.status === 500) {
          // 500 Internal Server Error
          message = "Development System Error: Please check Supabase logs and triggers."
        } else if (error.message) {
          // Fallback to error message from server
          message = error.message
        }

        toast.error(message)
        return
      }

      if (data?.session?.access_token) {
        setAdminAuthCookie(data.session.access_token)
      }
      toast.success(t.adminLogin.toast.signInSuccess)
      router.replace("/admin")
    } catch (err: any) {
      console.error("Admin login unexpected error:", err)
      toast.error("Critical Application Error: " + (err.message || "Unknown"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-black flex items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-black/40 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="mb-8 text-center flex flex-col items-center">
            <Image
              src="/logo.png"
              alt="mDeploy logo"
              width={120}
              height={120}
              className="h-24 w-auto mb-4"
            />
            <p className="text-purple-200/60 text-sm">
              {t.adminLogin.subtitleSignIn}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">


            <div className="space-y-2">
              <Label htmlFor="email" className="text-purple-200">
                {t.adminLogin.email}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@mdeploy.dev"
                required
                className="bg-white/10 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-purple-200">
                {t.adminLogin.password}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-white/10 border-purple-500/30 text-white placeholder:text-white/40 focus:border-purple-400 focus:ring-purple-400/20"
              />
            </div>

            {/* hCaptcha */}
            <div className="flex justify-center py-2">
              <HCaptcha
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ""}
                onVerify={(token) => setCaptchaToken(token)}
                theme="dark" // Matches the dark theme
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {t.adminLogin.signingIn}
                </div>
              ) : (
                t.adminLogin.signIn
              )}
            </Button>
          </form>



          {/* Home Link */}
          <div className="mt-6 pt-6 border-t border-purple-500/20 text-center">
            <Link
              href="/"
              className="text-purple-300/60 hover:text-purple-300 text-sm transition-colors"
            >
              ← {t.adminLogin.backHome}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
