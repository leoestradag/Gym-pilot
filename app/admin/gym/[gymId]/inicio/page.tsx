"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Home, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function HomepagePage() {
  const params = useParams()
  const { toast } = useToast()
  const gymId = params.gymId as string

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [gymSlug, setGymSlug] = useState<string>("")
  const [formData, setFormData] = useState({
    history: "",
    statsYears: 5,
    statsMembers: 500,
    statsTrainers: 15,
  })

  useEffect(() => {
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
    setIsLoading(false)
  }, [gymId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Por ahora, solo mostramos un mensaje ya que los campos aún no están en la BD
      toast({
        title: "Funcionalidad en desarrollo",
        description: "Esta funcionalidad estará disponible próximamente",
      })
    } catch (error) {
      console.error("Error saving homepage data:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar la información",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando información...</p>
          </div>
        </div>
      </div>
    )
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
                <h1 className="text-2xl font-bold text-foreground">Página Principal</h1>
                <p className="text-sm text-muted-foreground">Edita la información de la sección "Conócenos"</p>
              </div>
            </div>
            <div className="flex gap-2">
              {gymSlug && (
                <Link href={`/gym/${gymSlug}`} target="_blank">
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Ver Página Pública
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Nuestra Historia</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="history">Historia del Gimnasio</Label>
                <Textarea
                  id="history"
                  value={formData.history}
                  onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                  placeholder="Escribe la historia de tu gimnasio. Este texto aparecerá en la sección 'Conócenos' de tu página pública."
                  rows={8}
                />
                <p className="text-xs text-muted-foreground">
                  Puedes escribir múltiples párrafos. Cada párrafo se mostrará separado.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="statsYears">Años de Experiencia</Label>
                  <Input
                    id="statsYears"
                    type="number"
                    min={0}
                    value={formData.statsYears}
                    onChange={(e) => setFormData({ ...formData, statsYears: Number(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se mostrará como "{formData.statsYears}+ años de experiencia"
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="statsMembers">Miembros Activos</Label>
                  <Input
                    id="statsMembers"
                    type="number"
                    min={0}
                    value={formData.statsMembers}
                    onChange={(e) => setFormData({ ...formData, statsMembers: Number(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se mostrará como "{formData.statsMembers}+ miembros activos"
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="statsTrainers">Entrenadores Certificados</Label>
                  <Input
                    id="statsTrainers"
                    type="number"
                    min={0}
                    value={formData.statsTrainers}
                    onChange={(e) => setFormData({ ...formData, statsTrainers: Number(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Se mostrará como "{formData.statsTrainers}+ entrenadores certificados"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2">
            <Link href={`/admin/gym/${gymId}`}>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

