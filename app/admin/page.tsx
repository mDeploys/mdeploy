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
import { Pencil, Trash2, Plus, Loader2, ShieldCheck, ShieldAlert } from "lucide-react"
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
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-purple-600" /></div>
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            {t.adminDashboard.title}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-slate-400">Manage your platform data and submissions</p>
            {profile && (
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${profile.role === 'admin'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                {profile.role === 'admin' ? <ShieldCheck className="h-3 w-3" /> : <ShieldAlert className="h-3 w-3" />}
                {profile.role}
              </span>
            )}
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-900/50 p-1 border border-white/5 rounded-xl">
          <TabsTrigger value="quotes" className="rounded-lg">Quote Requests</TabsTrigger>
          <TabsTrigger value="projects" className="rounded-lg">Active Projects</TabsTrigger>
          <TabsTrigger value="apps" className="rounded-lg">Apps Gallery</TabsTrigger>
          <TabsTrigger value="pricing" className="rounded-lg">Pricing</TabsTrigger>
        </TabsList>

        {/* QUOTES TAB */}
        <TabsContent value="quotes">
          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[120px]">Reference</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Requested On</TableHead>
                  <TableHead>Total Est.</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotes.map(q => (
                  <TableRow key={q.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-mono font-bold text-purple-600 dark:text-purple-400">{q.quote_id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{q.full_name}</div>
                      <div className="text-xs text-muted-foreground">{q.email}</div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(q.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-semibold">${q.total_price}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${q.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          q.status === 'reviewed' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            q.status === 'converted' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              'bg-red-100 text-red-700'
                        }`}>
                        {q.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button variant="outline" size="sm" onClick={() => openQuoteDetails(q)}>Details</Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteQuote(q.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {quotes.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">No quote requests yet</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Quote Details Dialog */}
          <Dialog open={quoteDialogOpen} onOpenChange={setQuoteDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Quote Details: {viewingQuote?.quote_id}</span>
                  <span className="text-sm font-normal text-muted-foreground">{viewingQuote && new Date(viewingQuote.created_at).toLocaleString()}</span>
                </DialogTitle>
              </DialogHeader>
              {viewingQuote && (
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Client Name</Label>
                      <p className="font-medium">{viewingQuote.full_name}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Client Email</Label>
                      <p className="font-medium">{viewingQuote.email}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Client Phone</Label>
                      <p className="font-medium">{viewingQuote.phone || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Client Company</Label>
                      <p className="font-medium">{viewingQuote.company || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg border">
                    <Label className="text-xs font-bold uppercase tracking-wider mb-2 block">Service Breakdown</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                      {Object.entries(viewingQuote.details.inputs).map(([key, value]) => {
                        if (typeof value === 'number' && value > 0) {
                          return <div key={key} className="flex justify-between border-b pb-1">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="font-bold">{value}</span>
                          </div>
                        }
                        if (typeof value === 'boolean' && value === true) {
                          return <div key={key} className="flex justify-between border-b pb-1">
                            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-green-600 font-bold">Yes</span>
                          </div>
                        }
                        return null
                      })}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Additional Notes</Label>
                    <p className="text-sm bg-muted p-2 rounded italic whitespace-pre-wrap">{viewingQuote.notes || "No extra notes provided."}</p>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Label>Update Status:</Label>
                      <Select value={viewingQuote.status} onValueChange={(v) => updateQuoteStatus(viewingQuote.id, v as any)}>
                        <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="reviewed">Reviewed</SelectItem>
                          <SelectItem value="converted">Converted</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground italic">Estimated Total</p>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">${viewingQuote.total_price}</p>
                    </div>
                  </div>
                </div>
              )}
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

          <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map(p => (
                  <TableRow key={p.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell className="capitalize text-xs font-medium px-2 inline-flex items-center h-full">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border">{p.type.replace('_', ' ')}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{p.client_name}</div>
                      <div className="text-xs text-muted-foreground">{p.client_email}</div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${p.status === 'in_progress' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30' :
                          p.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                            'bg-slate-100 text-slate-700'
                        }`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600 dark:text-green-400">${p.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openProjectEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteProject(p.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button>
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
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingProject ? "Edit Project" : "New Project"}</DialogTitle>
                <DialogDescription>Define an active project and its status.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleProjectSubmit} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="p-name">Project Name</Label>
                  <Input id="p-name" value={projectForm.name} onChange={e => setProjectForm({ ...projectForm, name: e.target.value })} required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="p-desc">Description</Label>
                  <Textarea id="p-desc" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
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
                  <Label>Project Budget (SAR)</Label>
                  <Input type="number" value={projectForm.price} onChange={e => setProjectForm({ ...projectForm, price: parseFloat(e.target.value) })} required />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Save Project</Button>
                </DialogFooter>
              </form>
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
              <DialogContent className="max-w-xl">
                <DialogHeader>
                  <DialogTitle>{editingApp ? "Edit App" : "Add New App"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAppSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="app-name">{t.appsGallery.form.title}</Label>
                    <Input id="app-name" value={appForm.name} onChange={e => setAppForm({ ...appForm, name: e.target.value })} placeholder="e.g. My Awesome App" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-thumb">{t.appsGallery.form.thumbnail}</Label>
                    <Input id="app-thumb" value={appForm.thumbnail_url} onChange={e => setAppForm({ ...appForm, thumbnail_url: e.target.value })} placeholder="https://image-url.com/img.png" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-url">{t.appsGallery.form.url}</Label>
                    <Input id="app-url" value={appForm.url} onChange={e => setAppForm({ ...appForm, url: e.target.value })} placeholder="https://demo-app.com" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-desc">{t.appsGallery.form.description}</Label>
                    <Textarea id="app-desc" value={appForm.description} onChange={e => setAppForm({ ...appForm, description: e.target.value })} placeholder="Briefly describe what this app does..." rows={3} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-download">{t.appsGallery.form.downloadUrl}</Label>
                    <Input id="app-download" value={appForm.download_url} onChange={e => setAppForm({ ...appForm, download_url: e.target.value })} placeholder="https://store.link/app" />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setAppDialogOpen(false)}>{t.adminDashboard.formActions.cancel}</Button>
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">{editingApp ? t.adminDashboard.formActions.submitUpdate : t.adminDashboard.formActions.submitCreate}</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map(app => (
              <div key={app.id} className="group border rounded-xl overflow-hidden bg-card text-card-foreground shadow-sm hover:shadow-md transition-all">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img src={app.thumbnail_url} alt={app.name} className="object-cover w-full h-full transition group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="secondary" size="sm" onClick={() => openAppEdit(app)}><Pencil className="h-4 w-4 mr-2" /> Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteApp(app.id)}><Trash2 className="h-4 w-4 mr-2" /> Delete</Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold truncate text-lg">{app.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{app.description || "No description provided."}</p>
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
          <div className="border rounded-xl p-8 bg-card shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-purple-600 dark:text-purple-400">
              <h2 className="text-2xl font-bold">Standard Pricing Configuration</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricing.map(item => (
                <div key={item.key} className="space-y-3 p-4 border rounded-lg bg-muted text-card-foreground">
                  <Label htmlFor={`price-${item.key}`} className="font-bold text-sm block">{item.label}</Label>
                  <div className="flex gap-2 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">SAR</span>
                    <Input
                      id={`price-${item.key}`}
                      type="number"
                      className="pl-12 font-mono font-semibold"
                      defaultValue={item.value}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value)
                        if (val !== item.value) updatePrice(item.key, val)
                      }}
                    />
                  </div>
                </div>
              ))}
              {pricing.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
                  No pricing configuration found.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
