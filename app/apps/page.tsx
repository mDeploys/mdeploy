"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { supabase, type App, isSupabaseConfigured } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Loader2 } from "lucide-react"

export default function AppsPage() {
    const [apps, setApps] = useState<App[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const { language } = useLanguage()

    // Translation placeholder (since we didn't add "apps" to translations.ts yet, using hardcoded simple text or existing keys where fit)
    const title = language === "en" ? "Apps Gallery" : "معرض التطبيقات"
    const description =
        language === "en"
            ? "Explore our collection of deployed applications."
            : "تصفح مجموعتنا من التطبيقات المنشورة."
    const emptyMessage = language === "en" ? "No apps found." : "لا توجد تطبيقات."
    const errorMessage =
        language === "en" ? "Failed to load apps." : "فشل تحميل التطبيقات."

    useEffect(() => {
        async function fetchApps() {
            if (!isSupabaseConfigured) {
                setLoading(false)
                return
            }
            try {
                const { data, error } = await supabase
                    .from("apps")
                    .select("*")
                    .order("created_at", { ascending: false })

                if (error) throw error
                setApps(data || [])
            } catch (err) {
                console.error("Error fetching apps:", err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }

        fetchApps()
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <div className="bg-noise" />
            <section className="relative pt-32 pb-16">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
                            {title}
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-24">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                            {errorMessage}
                        </div>
                    ) : apps.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                            {emptyMessage}
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {apps.map((app) => (
                                <Card
                                    key={app.id}
                                    className="group overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                        {app.thumbnail_url ? (
                                            <Image
                                                src={app.thumbnail_url}
                                                alt={app.name}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center bg-secondary/30">
                                                <span className="text-muted-foreground">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg truncate" title={app.name}>
                                            {app.name}
                                        </h3>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
