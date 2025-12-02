"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Building2, MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type Gym = {
  id: number
  name: string
  location: string
  phone: string
  email: string
  hours: string
  image?: string | null
  slug?: string | null
  adminCode?: string | null
}

export default function GymsPage() {
  const { toast } = useToast()
  const [gyms, setGyms] = useState<Gym[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingGym, setEditingGym] = useState<Gym | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    hours: "",
    image: "",
    slug: "",
  })

  useEffect(() => {
    loadGyms()
  }, [])

  const loadGyms = async () => {
    try {
      const response = await fetch("/api/gyms")
      if (response.ok) {
        const data = await response.json()
        setGyms(data)
      }
    } catch (error) {
      console.error("Error loading gyms", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los gimnasios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingGym) {
        const response = await fetch(`/api/gyms/${editingGym.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error("Error al actualizar")

        toast({
          title: "Gimnasio actualizado",
          description: "Los cambios se han guardado exitosamente",
        })
      } else {
        const response = await fetch("/api/gyms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!response.ok) throw new Error("Error al crear")

        toast({
          title: "Gimnasio creado",
          description: "El gimnasio se ha agregado exitosamente",
        })
      }

      setIsDialogOpen(false)
      setEditingGym(null)
      setFormData({
        name: "",
        location: "",
        phone: "",
        email: "",
        hours: "",
        image: "",
        slug: "",
      })
      loadGyms()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el gimnasio",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (gym: Gym) => {
    setEditingGym(gym)
    setFormData({
      name: gym.name,
      location: gym.location,
      phone: gym.phone,
      email: gym.email,
      hours: gym.hours,
      image: gym.image || "",
      slug: gym.slug || "",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Gimnasios</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Nuevo Gimnasio
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando gimnasios...</p>
          </div>
        ) : gyms.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No hay gimnasios registrados</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Gimnasio
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {gyms.map((gym) => (
              <Card key={gym.id} className="border-border/50 bg-card/50 backdrop-blur">
                {gym.image && (
                  <img src={gym.image} alt={gym.name} className="w-full h-48 object-cover rounded-t-lg" />
                )}
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{gym.name}</CardTitle>
                        {gym.slug && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {gym.slug}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(gym)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{gym.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{gym.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{gym.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span className="truncate text-xs">{gym.hours}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Link href={`/gym/${gym.slug || gym.id}`} target="_blank" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Ver Página
                      </Button>
                    </Link>
                    {gym.adminCode && (
                      <Link href={`/admin/gym/login`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          Panel Admin
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setEditingGym(null)
          setFormData({
            name: "",
            location: "",
            phone: "",
            email: "",
            hours: "",
            image: "",
            slug: "",
          })
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingGym ? "Editar Gimnasio" : "Nuevo Gimnasio"}
            </DialogTitle>
            <DialogDescription>
              Completa la información del gimnasio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre del Gimnasio</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Tessalp Centro"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug (URL amigable)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                placeholder="tessalp-centro"
              />
              <p className="text-xs text-muted-foreground">
                Se usará en la URL: /gym/tessalp-centro
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Av. Principal 123, Centro"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+52 (555) 123-4567"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="centro@tessalpgyms.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hours">Horarios</Label>
              <Input
                id="hours"
                value={formData.hours}
                onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                placeholder="Lunes a Viernes: 5:00 AM - 11:00 PM"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/modern-gym-interior.png"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingGym(null)
                  setFormData({
                    name: "",
                    location: "",
                    phone: "",
                    email: "",
                    hours: "",
                    image: "",
                    slug: "",
                  })
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingGym ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

