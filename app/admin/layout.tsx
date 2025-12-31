"use client"

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { LogoutButton } from "./logout-button"
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Settings,
    Package,
    DollarSign,
    ChevronRight,
    User
} from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isLoginPage = pathname === "/admin/login"

    if (isLoginPage) {
        return <>{children}</>
    }

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-slate-900/40 backdrop-blur-2xl hidden md:flex flex-col sticky top-0 h-screen overflow-hidden">
                {/* Logo Area */}
                <div className="p-6 border-b border-white/5">
                    <Link href="https://mdeploy.dev" className="flex items-center gap-3 group">
                        <div className="relative animate-pulse-glow">
                            <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Image
                                src="/logo.png"
                                alt="mDeploy"
                                width={40}
                                height={40}
                                className="h-8 w-auto relative z-10"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-fuchsia-400 animate-shine">
                            mDeploy
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">
                        Main Menu
                    </div>

                    <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" active />
                    {/* We'll add more links later if we refactor to separate pages */}
                </nav>

                {/* User / Footer Area */}
                <div className="p-4 border-t border-white/5 space-y-4">
                    <div className="px-3 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold ring-2 ring-white/10">
                            AD
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-medium truncate">Administrator</p>
                            <p className="text-[10px] text-slate-500 truncate">admin@mdeploy.dev</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="h-16 border-b border-white/5 bg-slate-900/20 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>Admin</span>
                        <ChevronRight size={14} className="opacity-40" />
                        <span className="text-slate-100 font-medium">Dashboard</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            System Online
                        </div>
                    </div>
                </header>

                <main className="flex-1 relative overflow-x-hidden pt-6">
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/5 rounded-full blur-[120px]" />
                    </div>

                    <div className="px-8 pb-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

function SidebarLink({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`
        flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
        ${active
                    ? "bg-purple-600/10 text-purple-400 border border-purple-500/20"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5"}
      `}
        >
            <span className={`${active ? "text-purple-400" : "text-slate-500 group-hover:text-slate-300"} transition-colors`}>
                {icon}
            </span>
            <span className="text-sm font-medium tracking-wide">{label}</span>
            {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500" />}
        </Link>
    )
}
