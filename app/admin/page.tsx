"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, type Project, type Quote, type App, type PricingItem, type Profile, getSession, isSupabaseConfigured } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Plus, Loader2, ShieldCheck, ShieldAlert, Info, Eye } from "lucide-react"
import { LogoutButton } from "./logout-button"
import { toast } from "sonner"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { language } = useLanguage()
  const t = translations[language]

  // --- DATA STATES ---
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [pricing, setPricing] = useState<PricingItem[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)

  // --- UI STATES ---
  const [activeTab, setActiveTab] = useState("quotes")

  // Quotes Dialog (View/Edit Status)
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false)
  const [viewingQuote, setViewingQuote] = useState<Quote | null>(null)
  const [currency, setCurrency] = useState<'SAR' | 'USD'>('SAR')

  const formatPrice = (amount: number) => {
    if (currency === 'USD') {
      return `$${(amount * 0.27).toFixed(0)}`
    }
    return `${amount} SAR`
  }

  // Projects Dialog
  const [projectDialogOpen, setProjectDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    type: "website",
    status: "pending",
    client_name: "",
    client_email: "",
    price: 0,
  })

  // Apps Dialog
  const [appDialogOpen, setAppDialogOpen] = useState(false)
  const [editingApp, setEditingApp] = useState<App | null>(null)
  const [appForm, setAppForm] = useState({
    name: "",
    thumbnail_url: "",
    url: "",
    description: "",
    download_url: "",
  })

  useEffect(() => {
    const init = async () => {
      if (!isSupabaseConfigured) {
        toast.error("Supabase not configured")
        setLoading(false)
        return
      }

      const { data: { session } } = await getSession()
      if (!session) {
        router.replace("/admin/login")
        return
      }

      // Fetch Profile for Role Check
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      } else if (profileError) {
        console.error("Profile fetch error:", profileError)
      }

      await loadAllData()
      setLoading(false)
    }
    init()
  }, [router])

  async function loadAllData() {
    await Promise.all([fetchQuotes(), fetchProjects(), fetchApps(), fetchPricing()])
  }

  // --- QUOTES ---
  async function fetchQuotes() {
    const { data, error } = await supabase.from("quotes").select("*").order("created_at", { ascending: false })
    if (error) {
      console.error("Fetch quotes error:", error)
      toast.error(`Failed to load quotes: ${error.message}`)
      return
    }
    if (data) setQuotes(data)
  }

  async function updateQuoteStatus(id: string, status: Quote['status']) {
    const { error } = await supabase.from("quotes").update({ status }).eq("id", id)
    if (!error) {
      toast.success("Quote status updated")
      fetchQuotes()
    }
  }

  // --- PROJECTS ---
  async function fetchProjects() {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false })
    if (data) setProjects(data)
  }

  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload = {
        ...projectForm,
        updated_at: new Date().toISOString()
      }
      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", editingProject.id)
        if (error) throw error
        toast.success("Project updated")
      } else {
        const { error } = await supabase.from("projects").insert([payload])
        if (error) throw error
        toast.success("Project created")
      }
      setProjectDialogOpen(false)
      fetchProjects()
    } catch (error) {
      toast.error("Failed to save project")
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (!error) {
      toast.success("Project deleted")
      fetchProjects()
    }
  }

  async function deleteQuote(id: string) {
    if (!confirm("Delete this quote?")) return
    const { error } = await supabase.from("quotes").delete().eq("id", id)
    if (!error) {
      toast.success("Quote deleted")
      fetchQuotes()
    }
  }

  // --- APPS ---
  async function fetchApps() {
    const { data } = await supabase.from("apps").select("*").order("created_at", { ascending: false })
    if (data) setApps(data)
  }

  async function handleAppSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingApp) {
        const { error } = await supabase.from("apps").update(appForm).eq("id", editingApp.id)
        if (error) throw error
        toast.success("App updated")
      } else {
        const { error } = await supabase.from("apps").insert([appForm])
        if (error) throw error
        toast.success("App created")
      }
      setAppDialogOpen(false)
      fetchApps()
    } catch (error) {
      toast.error("Failed to save app")
    }
  }

  async function deleteApp(id: string) {
    if (!confirm("Delete this app?")) return
    const { error } = await supabase.from("apps").delete().eq("id", id)
    if (!error) {
      toast.success("App deleted")
      fetchApps()
    }
  }

  // --- PRICING ---
  async function fetchPricing() {
    const { data } = await supabase.from("pricing_config").select("*").order("key")
    if (data) setPricing(data)
  }

  async function updatePrice(key: string, value: number) {
    try {
      const { error } = await supabase.from("pricing_config").update({ value }).eq("key", key)
      if (error) throw error
      toast.success("Price updated")
      fetchPricing()
    } catch (error) {
      toast.error("Failed to update price")
    }
  }

  // --- UI HELPERS ---
  const resetProjectForm = () => {
    setEditingProject(null)
    setProjectForm({
      name: "",
      description: "",
      type: "website",
      status: "pending",
      client_name: "",
      client_email: "",
      price: 0,
    })
  }

  const resetAppForm = () => {
    setEditingApp(null)
    setAppForm({
      name: "",
      thumbnail_url: "",
      url: "",
      description: "",
      download_url: "",
    })
  }

  const openAppEdit = (app: App) => {
    setEditingApp(app)
    setAppForm({
      name: app.name,
      thumbnail_url: app.thumbnail_url,
      url: app.url || "",
      description: app.description || "",
      download_url: app.download_url || "",
    })
    setAppDialogOpen(true)
  }

  const openProjectEdit = (p: Project) => {
    setEditingProject(p)
    setProjectForm({
      name: p.name,
      description: p.description,
      type: p.type as any,
      status: p.status as any,
      client_name: p.client_name,
      client_email: p.client_email,
      price: p.price,
    })
    setProjectDialogOpen(true)
  }

  const openQuoteDetails = (q: Quote) => {
    setViewingQuote(q)
    setQuoteDialogOpen(true)
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-[#060612]"><Loader2 className="animate-spin h-8 w-8 text-purple-600" /></div>
  }

  return (
    <div className="min-h-screen bg-[#060612] text-foreground cosmic-gradient relative pb-20 overflow-x-hidden">
      {/* Background Noise for texture */}
      <div className="bg-noise" />

      <main className="container mx-auto py-10 px-6 relative z-10 space-y-10">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h1 className="text-4xl font-black tracking-tight text-white text-glow-purple mb-2">
              {t.adminDashboard.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-slate-400 font-medium">Command Center Management</p>
              {profile && (
                <Badge variant="outline" className={`capitalize border-2 px-3 py-1 flex items-center gap-1.5 shadow-lg ${profile.role === 'admin'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}>
                  {profile.role === 'admin' ? <ShieldCheck className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                  {profile.role}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setCurrency('SAR')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${currency === 'SAR' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                SAR
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${currency === 'USD' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                USD
              </button>
            </div>
            <LogoutButton />
          </div>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-slate-950/60 backdrop-blur-xl p-1.5 border border-white/10 rounded-2xl lightning-shadow w-full md:w-auto h-auto flex flex-wrap md:flex-nowrap gap-1">
            <TabsTrigger value="quotes" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
              Quote Requests
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
              Active Projects
            </TabsTrigger>
            <TabsTrigger value="apps" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
              Apps Gallery
            </TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all">
              Pricing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="glass-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader className="bg-white/5 border-b border-white/10">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[140px] py-6 px-6 font-bold text-slate-300">Reference</TableHead>
                    <TableHead className="font-bold text-slate-300">Customer</TableHead>
                    <TableHead className="font-bold text-slate-300">Requested On</TableHead>
                    <TableHead className="font-bold text-slate-300">Total Est.</TableHead>
                    <TableHead className="font-bold text-slate-300">Status</TableHead>
                    <TableHead className="text-right px-6 font-bold text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotes.map(q => (
                    <TableRow key={q.id} className="hover:bg-white/5 transition-colors border-b border-white/5">
                      <TableCell className="font-mono font-black text-purple-400 px-6 py-5">
                        <span className="bg-purple-500/10 px-2 py-1 rounded-md border border-purple-500/20">{q.quote_id}</span>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-white">{q.full_name}</div>
                        <div className="text-xs text-slate-400 font-medium">{q.email}</div>
                      </TableCell>
                      <TableCell className="text-slate-300 text-sm">
                        {new Date(q.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-emerald-400 bg-emerald-400/5 px-2 py-1 rounded border border-emerald-400/20">
                          {formatPrice(q.total_price)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`px-3 py-1 font-bold uppercase text-[10px] tracking-widest ${q.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                          q.status === 'reviewed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                            q.status === 'converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                              'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}>
                          {q.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-6 space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openQuoteDetails(q)}
                          className="bg-white/5 hover:bg-purple-600 hover:text-white border border-white/10 transition-all font-bold"
                        >
                          Details
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteQuote(q.id)}
                          className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {quotes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-20 text-slate-500 italic font-medium">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-slate-800/50 flex items-center justify-center mb-2">
                            <Info className="w-6 h-6" />
                          </div>
                          No quote requests yet
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Quote Details Dialog */}
            <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
              <DialogContent className="max-w-2xl bg-[#0a0a1f] border-white/10 text-white p-0 overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <div className="cosmic-gradient absolute inset-0 opacity-50 pointer-events-none" />
                <div className="relative z-10">
                  <div className="p-8 border-b border-white/10 bg-white/5">
                    <DialogTitle className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-2xl font-black text-glow-purple">Quote Summary</span>
                        <DialogDescription className="text-sm font-mono text-purple-400 font-bold">{viewingQuote?.quote_id}</DialogDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-400">Received</div>
                        <div className="text-xs text-slate-500">{viewingQuote && new Date(viewingQuote.created_at).toLocaleString()}</div>
                      </div>
                    </DialogTitle>
                  </div>
                  {viewingQuote && (
                    <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                      <div className="grid grid-cols-2 gap-8 pb-8 border-b border-white/5">
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Client Name</Label>
                          <p className="text-lg font-bold text-white capitalize">{viewingQuote.full_name}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Client Email</Label>
                          <p className="text-lg font-bold text-purple-300">{viewingQuote.email}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Client Phone</Label>
                          <p className="text-md font-bold text-slate-200">{viewingQuote.phone || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Client Company</Label>
                          <p className="text-md font-bold text-slate-200">{viewingQuote.company || 'N/A'}</p>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-white/10 p-6 rounded-2xl lightning-shadow">
                        <Label className="text-[11px] font-black uppercase tracking-[0.2em] text-purple-400 mb-4 block">Service Metrics</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
                          {Object.entries(viewingQuote.details.inputs).map(([key, value]) => {
                            if (key === 'reservedQuoteId') return null;
                            if (typeof value === 'number' && value > 0) {
                              return (
                                <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 group transition-all">
                                  <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="font-black text-white bg-white/5 px-2 py-0.5 rounded text-xs">{value}</span>
                                </div>
                              )
                            }
                            if (typeof value === 'boolean' && value === true) {
                              return (
                                <div key={key} className="flex justify-between items-center py-2 border-b border-white/5 group">
                                  <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors capitalize font-medium">{key.replace(/([A-Z])/g, ' $1')}</span>
                                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-tighter">Included</span>
                                </div>
                              )
                            }
                            return null
                          })}
                        </div>
                      </div>

                      {viewingQuote.notes && (
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Additional Notes</Label>
                          <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5 text-slate-300 text-sm leading-relaxed italic overflow-hidden relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600/50" />
                            {viewingQuote.notes}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                          <Label className="text-xs font-bold text-slate-400">Update Status:</Label>
                          <Select value={viewingQuote.status} onValueChange={(v) => updateQuoteStatus(viewingQuote.id, v as any)}>
                            <SelectTrigger className="w-[160px] bg-white/5 border-white/10 rounded-xl font-bold h-10"><SelectValue /></SelectTrigger>
                            <SelectContent className="bg-[#0f0f2d] border-white/10 text-white rounded-xl">
                              <SelectItem value="pending" className="rounded-lg">Pending</SelectItem>
                              <SelectItem value="reviewed" className="rounded-lg">Reviewed</SelectItem>
                              <SelectItem value="converted" className="rounded-lg">Converted</SelectItem>
                              <SelectItem value="rejected" className="rounded-lg">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground italic">Estimated Total</p>
                          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatPrice(viewingQuote.total_price)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects">
            <div className="flex justify-end mb-4">
              <Button onClick={() => { resetProjectForm(); setProjectDialogOpen(true); }} className="bg-gradient-to-r from-purple-600 to-fuchsia-600">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </div>

            <div className="glass-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden overflow-x-auto">
              <Table>
                <TableHeader className="bg-white/5 border-b border-white/10">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="py-6 px-6 font-bold text-slate-300">Project Name</TableHead>
                    <TableHead className="py-6 font-bold text-slate-300">Type</TableHead>
                    <TableHead className="py-6 font-bold text-slate-300">Client</TableHead>
                    <TableHead className="py-6 font-bold text-slate-300">Status</TableHead>
                    <TableHead className="py-6 font-bold text-slate-300">Budget</TableHead>
                    <TableHead className="text-right py-6 px-6 font-bold text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map(p => (
                    <TableRow key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-all group">
                      <TableCell className="font-bold text-white px-6 py-5">{p.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-300 border-white/10 capitalize">
                          {p.type.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white">{p.client_name}</span>
                          <span className="text-xs text-slate-500">{p.client_email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`px-3 py-1 font-black uppercase tracking-tighter shadow-lg ${p.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          p.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                            'bg-slate-500/20 text-slate-400 border-slate-500/30'
                          }`}>
                          {p.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-black text-purple-400 font-mono text-lg">{formatPrice(p.price)}</TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => openProjectEdit(p)} className="hover:bg-purple-500/20 text-slate-400 hover:text-white transition-colors">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteProject(p.id)} className="hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {projects.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">No active projects yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Project Create/Edit Dialog */}
            <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
              <DialogContent className="max-w-2xl bg-[#0a0a1f] border border-white/10 text-white p-0 overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <div className="cosmic-gradient absolute inset-0 opacity-50 pointer-events-none" />
                <div className="relative z-10">
                  <div className="p-8 border-b border-white/10 bg-white/5">
                    <DialogTitle className="text-2xl font-black text-glow-purple">{editingProject ? "Edit Project" : "New Project"}</DialogTitle>
                    <DialogDescription className="text-slate-400 font-medium">Define an active project and its status.</DialogDescription>
                  </div>
                  <form onSubmit={handleProjectSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid gap-2">
                      <Label htmlFor="p-name" className="text-xs font-black uppercase tracking-widest text-slate-500">Project Name</Label>
                      <Input id="p-name" value={projectForm.name} onChange={e => setProjectForm({ ...projectForm, name: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl transition-all font-medium text-white" required />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="p-desc" className="text-xs font-black uppercase tracking-widest text-slate-500">Description</Label>
                      <Textarea id="p-desc" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl transition-all font-medium text-white min-h-[100px]" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Type</Label>
                        <Select value={projectForm.type} onValueChange={v => setProjectForm({ ...projectForm, type: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website</SelectItem>
                            <SelectItem value="web_app">Web App</SelectItem>
                            <SelectItem value="mobile_app">Mobile App</SelectItem>
                            <SelectItem value="desktop_app">Desktop App</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select value={projectForm.status} onValueChange={v => setProjectForm({ ...projectForm, status: v })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label>Client Name</Label>
                        <Input value={projectForm.client_name} onChange={e => setProjectForm({ ...projectForm, client_name: e.target.value })} required />
                      </div>
                      <div className="grid gap-2">
                        <Label>Client Email</Label>
                        <Input type="email" value={projectForm.client_email} onChange={e => setProjectForm({ ...projectForm, client_email: e.target.value })} required />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label>Project Budget ({currency})</Label>
                      <Input type="number" value={projectForm.price} onChange={e => setProjectForm({ ...projectForm, price: parseFloat(e.target.value) })} required />
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                      <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)} className="border-white/10 text-white hover:bg-white/5 rounded-xl font-bold px-6">Cancel</Button>
                      <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-8 lightning-shadow-hover transition-all">
                        {editingProject ? "Update Project" : "Create Project"}
                      </Button>
                    </div>
                  </form>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* APPS TAB */}
          <TabsContent value="apps">
            <div className="flex justify-end mb-4">
              <Dialog open={appDialogOpen} onOpenChange={setAppDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetAppForm} className="bg-gradient-to-r from-purple-600 to-fuchsia-600 shadow-md">
                    <Plus className="mr-2 h-4 w-4" /> Add App
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl bg-[#0a0a1f] border border-white/10 text-white p-0 overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                  <div className="cosmic-gradient absolute inset-0 opacity-50 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="p-8 border-b border-white/10 bg-white/5 text-center">
                      <DialogTitle className="text-2xl font-black text-glow-purple">{editingApp ? "Edit App" : "Add New App"}</DialogTitle>
                      <DialogDescription className="text-slate-400 font-medium mt-1">Manage app details for the gallery.</DialogDescription>
                    </div>
                    <form onSubmit={handleAppSubmit} className="p-8 space-y-5 max-h-[70vh] overflow-y-auto">
                      <div className="grid gap-2">
                        <Label htmlFor="app-name" className="text-xs font-black uppercase tracking-widest text-slate-500">{t.appsGallery.form.title}</Label>
                        <Input id="app-name" value={appForm.name} onChange={e => setAppForm({ ...appForm, name: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl text-white font-medium" placeholder="e.g. My Awesome App" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="app-thumb" className="text-xs font-black uppercase tracking-widest text-slate-500">{t.appsGallery.form.thumbnail}</Label>
                        <Input id="app-thumb" value={appForm.thumbnail_url} onChange={e => setAppForm({ ...appForm, thumbnail_url: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl text-white font-medium" placeholder="https://image-url.com/img.png" required />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="app-url" className="text-xs font-black uppercase tracking-widest text-slate-500">{t.appsGallery.form.url}</Label>
                        <Input id="app-url" value={appForm.url} onChange={e => setAppForm({ ...appForm, url: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl text-white font-medium" placeholder="https://demo-app.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="app-desc" className="text-xs font-black uppercase tracking-widest text-slate-500">{t.appsGallery.form.description}</Label>
                        <Textarea id="app-desc" value={appForm.description} onChange={e => setAppForm({ ...appForm, description: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl text-white font-medium min-h-[100px]" placeholder="Briefly describe what this app does..." rows={3} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="app-download" className="text-xs font-black uppercase tracking-widest text-slate-500">{t.appsGallery.form.downloadUrl}</Label>
                        <Input id="app-download" value={appForm.download_url} onChange={e => setAppForm({ ...appForm, download_url: e.target.value })} className="bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 h-12 rounded-xl text-white font-medium" placeholder="https://store.link/app" />
                      </div>
                      <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={() => setAppDialogOpen(false)} className="border-white/10 text-white hover:bg-white/5 rounded-xl font-bold px-6">{t.adminDashboard.formActions.cancel}</Button>
                        <Button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl px-8 lightning-shadow-hover transition-all">
                          {editingApp ? t.adminDashboard.formActions.submitUpdate : t.adminDashboard.formActions.submitCreate}
                        </Button>
                      </div>
                    </form>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map(app => (
                <div key={app.id} className="group glass-card border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/30 transition-all duration-500 flex flex-col">
                  <div className="aspect-video relative overflow-hidden bg-[#0a0a1f]">
                    <img src={app.thumbnail_url} alt={app.name} className="object-cover w-full h-full transition duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1f] to-transparent opacity-60" />
                    <div className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      {app.url && (
                        <Button variant="secondary" size="sm" onClick={() => window.open(app.url, '_blank')} className="bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-400 border-emerald-500/30 backdrop-blur-md rounded-xl font-bold">
                          <Eye className="h-4 w-4 mr-2" /> Preview
                        </Button>
                      )}
                      <Button variant="secondary" size="sm" onClick={() => openAppEdit(app)} className="bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md rounded-xl font-bold">
                        <Pencil className="h-4 w-4 mr-2" /> Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => deleteApp(app.id)} className="bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 border-rose-500/30 backdrop-blur-md rounded-xl font-bold">
                        <Trash2 className="h-4 w-4 mr-2" /> Delete
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 space-y-2 flex-grow">
                    <h3 className="font-black text-white text-glow-purple tracking-tight text-xl">{app.name}</h3>
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed font-medium">{app.description || "No description provided."}</p>
                  </div>
                </div>
              ))}
              {apps.length === 0 && (
                <div className="col-span-full text-center py-24 border border-dashed rounded-xl text-muted-foreground bg-muted/20">
                  <p className="text-lg font-medium">No apps in gallery</p>
                  <p className="text-sm">Click "Add App" to start showcasing your work.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* PRICING TAB */}
          <TabsContent value="pricing">
            <div className="glass-card border-white/10 p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
              <div className="cosmic-gradient absolute inset-0 opacity-30 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-10 w-1 bg-purple-600 rounded-full" />
                  <h2 className="text-3xl font-black text-white text-glow-purple tracking-tight">Standard Pricing Configuration</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {pricing.map(item => (
                    <div key={item.key} className="glass-card border-white/10 p-6 rounded-2xl lightning-shadow transition-all hover:border-purple-500/30 group">
                      <Label htmlFor={`price-${item.key}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block group-hover:text-purple-400 transition-colors">
                        {item.label}
                      </Label>
                      <div className="flex gap-2 relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 font-black text-xs">{currency}</span>
                        <Input
                          id={`price-${item.key}`}
                          type="number"
                          className="pl-14 h-12 bg-white/5 border-white/10 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl font-mono font-black text-white"
                          defaultValue={item.value}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value)
                            if (val !== item.value) updatePrice(item.key, val)
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
