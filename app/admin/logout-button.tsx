"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/supabase"
import { LogOut } from "lucide-react"
import { toast } from "sonner"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()
  const t = translations[language]

  async function handleLogout() {
    setLoading(true)
    try {
      await signOut()
      toast.success(t.logout.success)
      router.replace("/admin/login")
    } catch (error) {
      toast.error(t.logout.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      className="bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 hover:text-red-200"
    >
      <LogOut className="h-4 w-4 mr-2" />
      {loading ? t.logout.loading : t.logout.label}
    </Button>
  )
}
