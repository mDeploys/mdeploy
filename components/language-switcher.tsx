"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en")
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 text-sm font-medium border border-primary/40 rounded-md hover:bg-primary/10 hover:border-primary/70 transition-colors cursor-pointer"
      aria-label={t.toggleLanguage}
    >
      <span className="flex items-center gap-1">
        <span className={language === "en" ? "font-bold" : "opacity-50"}>E</span>
        <span className="opacity-30">|</span>
        <span className={language === "ar" ? "font-bold" : "opacity-50"}>ع</span>
      </span>
    </button>
  )
}
