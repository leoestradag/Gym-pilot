"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, ArrowLeft, Dumbbell, Heart, Shield, Users, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Facility = {
  id: number
  name: string
  description: string
  image?: string | null
  features: string[]
  icon?: string | null
  order: number
}

const iconOptions = [
  { value: "Dumbbell", label: "Pesas", icon: Dumbbell },
  { value: "Heart", label: "Cardio", icon: Heart },
  { value: "Shield", label: "Funcional", icon: Shield },
  { value: "Users", label: "Yoga/Estudio", icon: Users },
]

export default function FacilitiesPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const gymId = params.gymId as string

  const [facilities, setFacilities] = useState<Facility[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null)
  const [gymSlug, setGymSlug] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    features: "",
    icon: "",
    order: 0,
  })

  useEffect(() => {
    loadFacilities()
    // Cargar slug del gimnasio
    const loadGymSlug = async () => {
      try {
        const response = await fetch("/api/gym/current")
        if (response.ok) {
          const data = await response.json()
          if (data.gym?.slug) {
            setGymSlug(data.gym.slug)
          }
        }
      } catch (error) {
        console.error("Error loading gym slug", error)
      }
    }
    loadGymSlug()
  }, [gymId])

  const loadFacilities = async () => {
    try {
      const response = await fetch(`/api/gym/${gymId}/facilities`)
      if (response.ok) {
        const data = await response.json()
        setFacilities(data)
      }
    } catch (error) {
      console.error("Error loading facilities", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las instalaciones",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const featuresArray = formData.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)

    const facilityData = {
      ...formData,
      features: featuresArray,
      order: Number(formData.order),
    }

    try {
      if (editingFacility) {
        // Update
        const response = await fetch(`/api/gym/${gymId}/facilities/${editingFacility.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(facilityData),
        })

        if (!response.ok) throw new Error("Error al actualizar")

        toast({
          title: "Instalación actualizada",
          description: "Los cambios se han guardado exitosamente",
        })
      } else {
        // Create
        const response = await fetch(`/api/gym/${gymId}/facilities`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(facilityData),
        })

        if (!response.ok) throw new Error("Error al crear")

        toast({
          title: "Instalación creada",
          description: "La instalación se ha agregado exitosamente",
        })
      }

      setIsDialogOpen(false)
      setEditingFacility(null)
      setFormData({
        name: "",
        description: "",
        image: "",
        features: "",
        icon: "",
        order: 0,
      })
      loadFacilities()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la instalación",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (facility: Facility) => {
    setEditingFacility(facility)
    setFormData({
      name: facility.name,
      description: facility.description,
      image: facility.image || "",
      features: facility.features.join("\n"),
      icon: facility.icon || "",
      order: facility.order,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta instalación?")) return

    try {
      const response = await fetch(`/api/gym/${gymId}/facilities/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Error al eliminar")

      toast({
        title: "Instalación eliminada",
        description: "La instalación se ha eliminado exitosamente",
      })
      loadFacilities()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar la instalación",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/admin/gym/${gymId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Instalaciones</h1>
                <p className="text-sm text-muted-foreground">Gestiona las áreas de tu gimnasio</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gymSlug && (
                <Link href={`/gym/${gymSlug}/instalaciones`} target="_blank">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ver Página Pública
                  </Button>
                </Link>
              )}
              <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva Instalación
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando instalaciones...</p>
          </div>
        ) : facilities.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No hay instalaciones configuradas</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primera Instalación
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {facilities.map((facility) => {
              const IconComponent = iconOptions.find((opt) => opt.value === facility.icon)?.icon || Dumbbell
              return (
                <Card key={facility.id} className="border-border/50 bg-card/50 backdrop-blur">
                  {facility.image && (
                    <img src={facility.image} alt={facility.name} className="w-full h-48 object-cover" />
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle>{facility.name}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(facility)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(facility.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">{facility.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Equipamiento incluido:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {facility.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setEditingFacility(null)
          setFormData({
            name: "",
            description: "",
            image: "",
            features: "",
            icon: "",
            order: 0,
          })
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingFacility ? "Editar Instalación" : "Nueva Instalación"}
            </DialogTitle>
            <DialogDescription>
              Completa la información de la instalación
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Área de Pesas"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción de la instalación"
                required
                rows={3}
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

            <div className="space-y-2">
              <Label htmlFor="icon">Icono</Label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="">Seleccionar icono</option>
                {iconOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Equipamiento (uno por línea)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Bancos ajustables&#10;Máquinas de cable&#10;Racks de sentadillas"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Orden de visualización</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                min={0}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingFacility(null)
                  setFormData({
                    name: "",
                    description: "",
                    image: "",
                    features: "",
                    icon: "",
                    order: 0,
                  })
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingFacility ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}


