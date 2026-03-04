"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, Clock, Bell, Users, Hourglass, ArrowRight } from "lucide-react"
import { Amiri } from "next/font/google"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

const amiri = Amiri({ weight: ["400", "700"], subsets: ["arabic"] })

export default function LetsPrayPage() {
    const { language } = useLanguage()
    const t = translations[language].letsPrayPage

    return (
        <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500/30 overflow-hidden relative pb-20">
            {/* Background with Mosque & Stars (Subtle) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('/mosque-bg.jpg')] bg-cover bg-center mix-blend-screen"></div>

            {/* Subtle Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

            <div className="relative z-10 container mx-auto px-4 pt-40">

                {/* Hero Section */}
                <section className="flex flex-col items-center text-center space-y-8 mb-32 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-emerald-500/20 rounded-full px-5 py-2 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                        <span className="text-emerald-400 font-medium text-sm">Let's Pray</span>
                        <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-slate-300 text-sm">{t.subtitle}</span>
                    </div>

                    <h1 className={`text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-emerald-300 to-teal-600 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] ${amiri.className} pb-6 leading-normal pt-2`} dir="auto">
                        {t.title}
                    </h1>

                    <p className="text-lg md:text-xl text-emerald-100/70 max-w-2xl font-light">
                        {t.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <Button asChild size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-0 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] h-14 px-8 text-lg rounded-full">
                            <a href="https://apps.microsoft.com/detail/9P0D5302L719?hl=en-us&gl=SA&ocid=pdpshare" target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-5 w-5" /> {t.downloadWindows}
                            </a>
                        </Button>
                    </div>

                    {/* Hero Image Mockup (Will use a standard placeholder path until user uploads it) */}
                    <div className="pt-20 w-full max-w-5xl relative group">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10 h-full w-full pointer-events-none"></div>
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.15)] border border-emerald-500/20 bg-black/40 backdrop-blur-sm p-1.5 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                            {/* Fallback to simple img tag for easy drop-in placeholder */}
                            <img
                                src="/images/lets-pray/hero.png"
                                alt="Let's Pray App Dashboard"
                                className="rounded-xl w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity min-h-[400px] border border-slate-800"
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="mb-32 relative">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-teal-400 inline-block mb-4 drop-shadow-sm">{t.featuresTitle}</h2>
                        <p className="text-slate-400">{t.featuresSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t.features.map((feature, i) => {
                            const icons = [Clock, Bell, Users, Hourglass]
                            const Icon = icons[i] || Clock

                            return (
                                <div key={i} className="group relative bg-slate-900/40 backdrop-blur-xl border border-teal-900/40 rounded-2xl p-8 hover:border-emerald-500/40 transition-colors hover:shadow-[0_0_30px_rgba(16,185,129,0.08)]">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                        <Icon className="w-24 h-24 text-emerald-500" />
                                    </div>
                                    <div className="w-14 h-14 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.15)] group-hover:scale-110 transition-transform">
                                        <Icon className="w-7 h-7 text-emerald-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-emerald-50 mb-3">{feature.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-light text-sm">{feature.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Screenshots Showcase */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-emerald-100 mb-4">{t.uiTitle}</h2>
                        <p className="text-slate-400">{t.uiSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all bg-slate-900/50 p-1">
                            <img
                                src="/images/lets-pray/settings.png"
                                alt="Settings Panel"
                                className="w-full h-auto rounded-xl object-cover min-h-[300px] border border-slate-800"
                            />
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl hover:shadow-[0_0_40px_rgba(16,185,129,0.15)] transition-all bg-slate-900/50 p-1">
                            <img
                                src="/images/lets-pray/muezzin.png"
                                alt="Muezzin Selection"
                                className="w-full h-auto rounded-xl object-cover min-h-[300px] border border-slate-800"
                            />
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center bg-gradient-to-b from-slate-900/60 to-[#020617] rounded-3xl p-12 md:p-24 border border-teal-900/30 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen"></div>

                    <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">{t.ctaTitle}</h2>
                        <p className="text-lg text-emerald-200/50 font-light mx-auto">
                            {t.ctaDesc}
                        </p>
                        <div className="pt-8">
                            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold border-0 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 h-16 px-10 text-lg rounded-full">
                                {t.ctaButton} <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    )
}
