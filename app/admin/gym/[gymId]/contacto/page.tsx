"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, Phone, Mail, Clock, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type ContactInfo = {
  location: string
  phone: string
  email: string
  hours: string
}

export default function ContactPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const gymId = params.gymId as string

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    location: "",
    phone: "",
    email: "",
    hours: "",
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadContactInfo()
  }, [])

  const loadContactInfo = async () => {
    try {
      const response = await fetch(`/api/gyms/${gymId}`)
      if (response.ok) {
        const data = await response.json()
        setContactInfo({
          location: data.location || "",
          phone: data.phone || "",
          email: data.email || "",
          hours: data.hours || "",
        })
      }
    } catch (error) {
      console.error("Error loading contact info", error)
      toast({
        title: "Error",
        description: "No se pudo cargar la información de contacto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const response = await fetch(`/api/gyms/${gymId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactInfo),
      })

      if (!response.ok) {
        throw new Error("Error al guardar")
      }

      toast({
        title: "Información actualizada",
        description: "Los cambios se han guardado exitosamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la información",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/admin/gym/${gymId}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Información de Contacto</h1>
              <p className="text-sm text-muted-foreground">Actualiza la información de contacto de tu gimnasio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando información...</p>
          </div>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Datos de Contacto</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    value={contactInfo.location}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, location: e.target.value })
                    }
                    placeholder="Av. Principal 123, Centro"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Teléfono
                    </Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, phone: e.target.value })
                      }
                      placeholder="+52 (555) 123-4567"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo({ ...contactInfo, email: e.target.value })
                      }
                      placeholder="centro@tessalpgyms.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Horarios Generales
                  </Label>
                  <Textarea
                    id="hours"
                    value={contactInfo.hours}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, hours: e.target.value })
                    }
                    placeholder="Lunes a Viernes: 5:00 AM - 11:00 PM"
                    rows={3}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Este es un texto general. Para configurar horarios detallados por día, usa la sección de Horarios.
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Link href={`/admin/gym/${gymId}`}>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </Link>
                  <Button type="submit" disabled={isSaving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSaving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


