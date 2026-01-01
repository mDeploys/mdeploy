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
    const t = translations[language]

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
            } catch (err: any) {
                console.error("Error fetching apps:", err.message || err)
                if (err.details) console.error("Error details:", err.details)
                if (err.hint) console.error("Error hint:", err.hint)
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
                            {t.appsGallery.title}
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                            {t.appsGallery.description}
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-24">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-8 text-center text-destructive">
                            {t.appsGallery.error}
                        </div>
                    ) : apps.length === 0 ? (
                        <div className="rounded-lg border border-dashed p-12 text-center text-muted-foreground">
                            {t.appsGallery.empty}
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {apps.map((app) => (
                                <Card
                                    key={app.id}
                                    className="group overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col"
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
                                    <CardContent className="p-4 flex flex-col flex-grow">
                                        <h3 className="font-semibold text-lg truncate mb-2" title={app.name}>
                                            {app.name}
                                        </h3>
                                        {app.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {app.description}
                                            </p>
                                        )}
                                        <div className="mt-auto flex flex-wrap gap-2">
                                            {app.preview_url && (
                                                <a
                                                    href={app.preview_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 transition-colors"
                                                >
                                                    {t.appsGallery.preview}
                                                </a>
                                            )}
                                            {app.url && (
                                                <a
                                                    href={app.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
                                                >
                                                    {t.appsGallery.viewProject}
                                                </a>
                                            )}
                                            {app.download_url && (
                                                <a
                                                    href={app.download_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/5 transition-colors"
                                                >
                                                    {t.appsGallery.download}
                                                </a>
                                            )}
                                        </div>
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
