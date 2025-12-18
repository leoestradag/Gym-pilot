"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Building2, MapPin, ArrowRight, Plus, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Gym = {
  id: number
  name: string
  location: string
  image?: string | null
  slug?: string | null
}

const OWNER_PASSWORD = "tessalpowner"

export default function SelectGymPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [gyms, setGyms] = useState<Gym[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    email: "",
    hours: "",
    image: "",
    slug: "",
  })
  const [isCreating, setIsCreating] = useState(false)

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

  const handleSelectGym = (gymId: number) => {
    console.log("Selecting gym:", gymId)
    // Usar window.location.href para navegación más confiable
    if (typeof window !== 'undefined') {
      window.location.href = `/admin/gym/${gymId}/verify`
    } else {
      router.push(`/admin/gym/${gymId}/verify`)
    }
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === OWNER_PASSWORD) {
      setIsPasswordDialogOpen(false)
      setIsCreateDialogOpen(true)
      setPassword("")
    } else {
      toast({
        title: "Contraseña incorrecta",
        description: "La contraseña no es válida",
        variant: "destructive",
      })
      setPassword("")
    }
  }

  const handleCreateGym = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)

    try {
      const response = await fetch("/api/gyms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear el gimnasio")
      }

      const newGym = await response.json()

      toast({
        title: "Gimnasio creado",
        description: `El gimnasio "${newGym.name}" ha sido creado exitosamente`,
      })

      setIsCreateDialogOpen(false)
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
        description: error instanceof Error ? error.message : "No se pudo crear el gimnasio",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold mb-2">Selecciona tu Gimnasio</h1>
            <p className="text-muted-foreground">
              Elige el gimnasio para acceder a su panel administrativo
            </p>
          </div>
          <Button
            onClick={() => setIsPasswordDialogOpen(true)}
            className="gap-2"
            variant="outline"
          >
            <Plus className="h-4 w-4" />
            Agregar nuevo gym
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando gimnasios...</p>
          </div>
        ) : gyms.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No hay gimnasios disponibles</p>
              <Link href="/">
                <Button variant="outline">Volver al inicio</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gyms.map((gym) => (
              <Card
                key={gym.id}
                className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all"
              >
                {gym.image && (
                  <img src={gym.image} alt={gym.name} className="w-full h-32 object-cover rounded-t-lg" />
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{gym.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{gym.location}</span>
                  </div>
                  <Button 
                    className="w-full gap-2"
                    type="button"
                    onClick={() => {
                      console.log("Navigating to:", `/admin/gym/${gym.id}/verify`)
                      window.location.href = `/admin/gym/${gym.id}/verify`
                    }}
                  >
                    Seleccionar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="ghost">Volver al inicio</Button>
          </Link>
        </div>
      </div>

      {/* Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Lock className="h-5 w-5 text-primary" />
              </div>
              <DialogTitle>Verificación Requerida</DialogTitle>
            </div>
            <DialogDescription>
              Ingresa la contraseña de propietario para crear un nuevo gimnasio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa la contraseña"
                required
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsPasswordDialogOpen(false)
                  setPassword("")
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Verificar</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Gym Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nuevo Gimnasio</DialogTitle>
            <DialogDescription>
              Completa la información del gimnasio
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateGym} className="space-y-4">
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  })
                }
                placeholder="tessalp-centro"
              />
              <p className="text-xs text-muted-foreground">
                Se usará en la URL: /gym/tessalp-centro (se generará automáticamente si se deja vacío)
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
                  setIsCreateDialogOpen(false)
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
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "Creando..." : "Crear Gimnasio"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

