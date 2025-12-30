"use client"

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
  const { language } = useLanguage()
  const t = translations[language]

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      toast.error(t.adminLogin.toast.configMissing)
      return
    }
    setLoading(true)
    try {
      const { data, error } = await signInWithEmail(email, password)
      if (error) {
        const message = error.message.toLowerCase().includes("invalid login")
          ? t.adminLogin.toast.invalidCredentials
          : error.message
        toast.error(message)
        return
      }
      if (data?.session?.access_token) {
        setAdminAuthCookie(data.session.access_token)
      }
      toast.success(t.adminLogin.toast.signInSuccess)
      router.replace("/admin")
    } catch (err) {
      console.error("Admin login error:", err)
      toast.error(t.adminLogin.toast.networkError)
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
