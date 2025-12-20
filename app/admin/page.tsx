"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, type Project, type App, type PricingItem, getSession, isSupabaseConfigured } from "@/lib/supabase"
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
import { Pencil, Trash2, Plus, Loader2 } from "lucide-react"
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
  const [projects, setProjects] = useState<Project[]>([])
  const [apps, setApps] = useState<App[]>([])
  const [pricing, setPricing] = useState<PricingItem[]>([])

  // --- UI STATES ---
  const [activeTab, setActiveTab] = useState("projects")

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
  })

  useEffect(() => {
    const init = async () => {
      if (!isSupabaseConfigured) {
        toast.error("Supabase not configured")
        setLoading(false)
        return
      }
      const { data } = await getSession()
      if (!data.session) {
        router.replace("/admin/login")
        return
      }
      await loadAllData()
      setLoading(false)
    }
    init()
  }, [router])

  async function loadAllData() {
    await Promise.all([fetchProjects(), fetchApps(), fetchPricing()])
  }

  // --- PROJECTS ---
  async function fetchProjects() {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false })
    if (data) setProjects(data)
  }

  async function handleProjectSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      if (editingProject) {
        const { error } = await supabase
          .from("projects")
          .update({ ...projectForm, updated_at: new Date().toISOString() })
          .eq("id", editingProject.id)
        if (error) throw error
        toast.success("Project updated")
      } else {
        const { error } = await supabase.from("projects").insert([projectForm])
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
    setAppForm({ name: "", thumbnail_url: "" })
  }

  const openAppEdit = (app: App) => {
    setEditingApp(app)
    setAppForm({ name: app.name, thumbnail_url: app.thumbnail_url })
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

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>
  }

  return (
    <div className="container mx-auto px-4 pt-32 pb-24 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{t.adminDashboard.title}</h1>
        <LogoutButton />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="apps">Apps Gallery</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Configuration</TabsTrigger>
        </TabsList>

        {/* PROJECTS TAB */}
        <TabsContent value="projects">
          <div className="flex justify-end mb-4">
            <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetProjectForm} className="bg-gradient-to-r from-purple-600 to-fuchsia-600">
                  <Plus className="mr-2 h-4 w-4" /> New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProject ? "Edit Project" : "New Project"}</DialogTitle>
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
                  <div className="grid gap-2">
                    <Label>Client Name</Label>
                    <Input value={projectForm.client_name} onChange={e => setProjectForm({ ...projectForm, client_name: e.target.value })} required />
                  </div>
                  <div className="grid gap-2">
                    <Label>Client Email</Label>
                    <Input type="email" value={projectForm.client_email} onChange={e => setProjectForm({ ...projectForm, client_email: e.target.value })} required />
                  </div>
                  <div className="grid gap-2">
                    <Label>Price</Label>
                    <Input type="number" value={projectForm.price} onChange={e => setProjectForm({ ...projectForm, price: parseFloat(e.target.value) })} required />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setProjectDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map(p => (
                  <TableRow key={p.id}>
                    <TableCell>{p.name}</TableCell>
                    <TableCell className="capitalize">{p.type.replace('_', ' ')}</TableCell>
                    <TableCell>{p.client_name}</TableCell>
                    <TableCell className="capitalize">{p.status.replace('_', ' ')}</TableCell>
                    <TableCell>${p.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openProjectEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteProject(p.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                    </TableCell>
                  </TableRow>
                ))}
                {projects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No projects found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* APPS TAB */}
        <TabsContent value="apps">
          <div className="flex justify-end mb-4">
            <Dialog open={appDialogOpen} onOpenChange={setAppDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetAppForm} className="bg-gradient-to-r from-purple-600 to-fuchsia-600">
                  <Plus className="mr-2 h-4 w-4" /> Add App
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingApp ? "Edit App" : "Add New App"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAppSubmit} className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="app-name">App Name</Label>
                    <Input id="app-name" value={appForm.name} onChange={e => setAppForm({ ...appForm, name: e.target.value })} required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="app-thumb">Thumbnail URL</Label>
                    <Input id="app-thumb" value={appForm.thumbnail_url} onChange={e => setAppForm({ ...appForm, thumbnail_url: e.target.value })} placeholder="https://..." required />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setAppDialogOpen(false)}>Cancel</Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map(app => (
              <div key={app.id} className="border rounded-lg overflow-hidden bg-card text-card-foreground shadow-sm">
                <div className="aspect-video bg-muted relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={app.thumbnail_url} alt={app.name} className="object-cover w-full h-full" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="font-semibold truncate">{app.name}</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => openAppEdit(app)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteApp(app.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              </div>
            ))}
            {apps.length === 0 && (
              <div className="col-span-full text-center py-12 border border-dashed rounded-lg text-muted-foreground">
                No apps in gallery
              </div>
            )}
          </div>
        </TabsContent>

        {/* PRICING TAB */}
        <TabsContent value="pricing">
          <div className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-6">Service Pricing Configuration</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {pricing.map(item => (
                <div key={item.key} className="grid gap-2">
                  <Label htmlFor={`price-${item.key}`}>{item.label}</Label>
                  <div className="flex gap-2">
                    <Input
                      id={`price-${item.key}`}
                      type="number"
                      defaultValue={item.value}
                      onBlur={(e) => {
                        const val = parseFloat(e.target.value)
                        if (val !== item.value) updatePrice(item.key, val)
                      }}
                    />
                    <div className="flex items-center text-sm text-muted-foreground bg-muted px-3 rounded-md border">
                      SAR
                    </div>
                  </div>
                </div>
              ))}
              {pricing.length === 0 && (
                <div className="col-span-full text-muted-foreground">
                  No pricing configuration found. Run the database seed script.
                </div>
              )}
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  )
}
