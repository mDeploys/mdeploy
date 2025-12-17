"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase, type Project, getSession, isSupabaseConfigured } from "@/lib/supabase"
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
import { Pencil, Trash2, Plus } from "lucide-react"
import { LogoutButton } from "./logout-button"
import { toast } from "sonner"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState<{
    name: string
    description: string
    type: "website" | "web_app" | "mobile_app" | "desktop_app"
    status: "pending" | "in_progress" | "completed" | "cancelled"
    client_name: string
    client_email: string
    price: number
  }>({
    name: "",
    description: "",
    type: "website",
    status: "pending",
    client_name: "",
    client_email: "",
    price: 0,
  })
  const { language } = useLanguage()
  const t = translations[language]
  const router = useRouter()
  const authRequiredMessage = t.adminDashboard.toasts.authRequired
  const loadErrorMessage = t.adminDashboard.toasts.loadError
  const configMissingMessage = t.adminDashboard.toasts.configMissing

  useEffect(() => {
    const verifySessionAndLoad = async () => {
      try {
        if (!isSupabaseConfigured) {
          toast.error(configMissingMessage)
          setLoading(false)
          return
        }
        const { data } = await getSession()
        if (!data.session) {
          toast.error(authRequiredMessage)
          router.replace("/admin/login")
          return
        }
        fetchProjects()
      } catch (error) {
        console.error("Error verifying session:", error)
        toast.error(loadErrorMessage)
        setLoading(false)
      }
    }

    verifySessionAndLoad()
  }, [router, authRequiredMessage, loadErrorMessage])

  async function fetchProjects() {
    if (!isSupabaseConfigured) {
      toast.error(configMissingMessage)
      return
    }
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error("Error fetching projects:", error)
      toast.error(loadErrorMessage)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from("projects")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingProject.id)

      if (error) throw error
        toast.success(t.adminDashboard.toasts.updateSuccess)
      } else {
        // Create new project
        const { error } = await supabase.from("projects").insert([formData])

        if (error) throw error
        toast.success(t.adminDashboard.toasts.createSuccess)
      }

      setDialogOpen(false)
      resetForm()
      fetchProjects()
    } catch (error) {
      console.error("Error saving project:", error)
      toast.error(t.adminDashboard.toasts.saveError)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm(t.adminDashboard.toasts.deleteConfirm)) return

    try {
      const { error } = await supabase.from("projects").delete().eq("id", id)

      if (error) throw error
      toast.success(t.adminDashboard.toasts.deleteSuccess)
      fetchProjects()
    } catch (error) {
      console.error("Error deleting project:", error)
      toast.error(t.adminDashboard.toasts.deleteError)
    }
  }

  function openEditDialog(project: Project) {
    setEditingProject(project)
    setFormData({
      name: project.name,
      description: project.description,
      type: project.type,
      status: project.status,
      client_name: project.client_name,
      client_email: project.client_email,
      price: project.price,
    })
    setDialogOpen(true)
  }

  function resetForm() {
    setEditingProject(null)
    setFormData({
      name: "",
      description: "",
      type: "website",
      status: "pending",
      client_name: "",
      client_email: "",
      price: 0,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
        <p className="text-lg">{t.adminDashboard.loading}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">{t.adminDashboard.title}</h1>
        <div className="flex items-center gap-3">
          <LogoutButton />
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={resetForm}
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                {t.adminDashboard.newProject}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? t.adminDashboard.dialogTitles.edit : t.adminDashboard.dialogTitles.create}
                </DialogTitle>
                <DialogDescription>
                  {editingProject
                    ? t.adminDashboard.dialogDescriptions.edit
                    : t.adminDashboard.dialogDescriptions.create}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">{t.adminDashboard.formLabels.name}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">{t.adminDashboard.formLabels.description}</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">{t.adminDashboard.formLabels.type}</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">{t.adminDashboard.typeOptions.website}</SelectItem>
                          <SelectItem value="web_app">{t.adminDashboard.typeOptions.web_app}</SelectItem>
                          <SelectItem value="mobile_app">{t.adminDashboard.typeOptions.mobile_app}</SelectItem>
                          <SelectItem value="desktop_app">{t.adminDashboard.typeOptions.desktop_app}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="status">{t.adminDashboard.formLabels.status}</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: any) =>
                          setFormData({ ...formData, status: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">{t.adminDashboard.statusOptions.pending}</SelectItem>
                          <SelectItem value="in_progress">{t.adminDashboard.statusOptions.in_progress}</SelectItem>
                          <SelectItem value="completed">{t.adminDashboard.statusOptions.completed}</SelectItem>
                          <SelectItem value="cancelled">{t.adminDashboard.statusOptions.cancelled}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client_name">{t.adminDashboard.formLabels.clientName}</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) =>
                        setFormData({ ...formData, client_name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client_email">{t.adminDashboard.formLabels.clientEmail}</Label>
                    <Input
                      id="client_email"
                      type="email"
                      value={formData.client_email}
                      onChange={(e) =>
                        setFormData({ ...formData, client_email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="price">{t.adminDashboard.formLabels.price}</Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: parseFloat(e.target.value) })
                      }
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    {t.adminDashboard.formActions.cancel}
                  </Button>
                  <Button type="submit">
                    {editingProject ? t.adminDashboard.formActions.submitUpdate : t.adminDashboard.formActions.submitCreate}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {t.adminDashboard.empty}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.adminDashboard.table.name}</TableHead>
                <TableHead>{t.adminDashboard.table.type}</TableHead>
                <TableHead>{t.adminDashboard.table.client}</TableHead>
                <TableHead>{t.adminDashboard.table.status}</TableHead>
                <TableHead>{t.adminDashboard.table.price}</TableHead>
                <TableHead>{t.adminDashboard.table.created}</TableHead>
                <TableHead className="text-end">{t.adminDashboard.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell className="capitalize">
                    {t.adminDashboard.typeOptions[project.type]}
                  </TableCell>
                  <TableCell>{project.client_name}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : project.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : project.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {t.adminDashboard.statusOptions[project.status]}
                    </span>
                  </TableCell>
                  <TableCell>${project.price.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(project.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-end">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(project)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(project.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
