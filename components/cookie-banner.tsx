"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const { language } = useLanguage()
    const t = translations[language].cookieBanner

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent")
        if (!consent) {
            // Small delay to ensure smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted")
        setIsVisible(false)
    }

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined")
        setIsVisible(false)
    }

    if (!isVisible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-full duration-500">
            <div className="mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl md:flex-row md:p-6 shadow-2xl">
                    <div className="flex items-center gap-4 text-center md:text-start lg:rtl:text-right">
                        <div className="rounded-full bg-primary/10 p-2 shrink-0">
                            <Cookie className="h-6 w-6 text-primary" />
                        </div>
                        <p className="text-sm text-gray-300 md:text-base pr-8 lg:rtl:pr-0 lg:rtl:pl-8">
                            {t.message}
                        </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        <Button
                            variant="outline"
                            onClick={handleDecline}
                            className="w-full sm:w-auto border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
                        >
                            {t.decline}
                        </Button>
                        <Button
                            onClick={handleAccept}
                            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {t.accept}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
