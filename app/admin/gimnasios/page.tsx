"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Edit, Building2, MapPin, Phone, Mail, Clock, ExternalLink, Calendar, CreditCard, Dumbbell, Settings } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

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

export default function MyGymPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [gym, setGym] = useState<Gym | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
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
    loadCurrentGym()
  }, [])

  const loadCurrentGym = async () => {
    try {
      const response = await fetch("/api/gym/current")
      if (response.ok) {
        const data = await response.json()
        if (data.gym) {
          setGym(data.gym)
          setFormData({
            name: data.gym.name,
            location: data.gym.location,
            phone: data.gym.phone,
            email: data.gym.email,
            hours: data.gym.hours,
            image: data.gym.image || "",
            slug: data.gym.slug || "",
          })
        } else {
          toast({
            title: "No hay gimnasio",
            description: "No se encontró un gimnasio asociado a tu cuenta",
            variant: "destructive",
          })
        }
      } else {
        const errorData = await response.json()
        if (response.status === 401) {
          // No hay sesión, redirigir a selección de gimnasio
          router.push("/admin/gym/select")
        } else {
          toast({
            title: "Error",
            description: errorData.error || "No se pudo cargar el gimnasio",
            variant: "destructive",
          })
        }
      }
    } catch (error) {
      console.error("Error loading gym", error)
      toast({
        title: "Error",
        description: "No se pudo cargar el gimnasio",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!gym) return

    try {
      const response = await fetch(`/api/gyms/${gym.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Error al actualizar")

      toast({
        title: "Gimnasio actualizado",
        description: "Los cambios se han guardado exitosamente",
      })

      setIsDialogOpen(false)
      loadCurrentGym()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el gimnasio",
        variant: "destructive",
      })
    }
  }

  const handleEdit = () => {
    if (gym) {
      setIsDialogOpen(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Mi Gimnasio</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando información del gimnasio...</p>
          </div>
        ) : !gym ? (
          <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No se encontró información del gimnasio</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Gym Info Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
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
                      <CardTitle className="text-2xl">{gym.name}</CardTitle>
                      {gym.slug && (
                        <Badge variant="secondary" className="mt-1">
                          {gym.slug}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEdit}
                      className="gap-2"
                    >
                      <Edit className="h-4 w-4" />
                      Editar Información
                    </Button>
                    <Link href={`/gym/${gym.slug || gym.id}`} target="_blank">
                      <Button variant="outline" size="sm" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Ver Página Pública
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{gym.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{gym.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{gym.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{gym.hours}</span>
                </div>
              </CardContent>
            </Card>

            {/* Management Sections */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link href={`/admin/gym/${gym.id}/instalaciones`}>
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Dumbbell className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Instalaciones</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Gestiona las áreas y equipamiento de tu gimnasio</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/admin/gym/${gym.id}/membresias`}>
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CreditCard className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Planes de Membresía</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Edita precios y características de tus planes</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/admin/gym/${gym.id}/horarios`}>
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Horarios</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Configura los horarios de operación</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/admin/gym/${gym.id}/contacto`}>
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Información de Contacto</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Actualiza dirección, teléfono y email</p>
                  </CardContent>
                </Card>
              </Link>

              <Link href={`/admin/gym/${gym.id}/configuracion`}>
                <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Settings className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">Configuración</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Cambia contraseña y configuración general</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
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
              Editar Información del Gimnasio
            </DialogTitle>
            <DialogDescription>
              Actualiza la información básica de tu gimnasio
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
                Actualizar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

