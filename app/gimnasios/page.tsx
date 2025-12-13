"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Clock, 
  Phone,
  Mail,
  ArrowLeft,
  Loader2
} from "lucide-react"
import Link from "next/link"

type Gym = {
  id: number
  name: string
  location: string
  phone: string
  email: string
  hours: string
  image?: string | null
  slug?: string | null
}

export default function GymDetailsPage() {
  const [gyms, setGyms] = useState<Gym[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadGyms()
  }, [])

  const loadGyms = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/gyms")
      if (response.ok) {
        const data = await response.json()
        setGyms(data || [])
      } else {
        console.error("Error loading gyms")
        setGyms([])
      }
    } catch (error) {
      console.error("Error loading gyms", error)
      setGyms([])
    } finally {
      setIsLoading(false)
    }
  }

  const getGymImage = (gym: Gym) => {
    if (gym.image) return gym.image
    return "/modern-gym-interior.png"
  }

  const getGymLink = (gym: Gym) => {
    if (gym.slug) return `/gym/${gym.slug}`
    return `/gym/${gym.id}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Detalles de Nuestros Gimnasios</h1>
              <p className="text-muted-foreground">Conoce todo lo que ofrecemos en cada ubicación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gym Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Cargando gimnasios...</span>
          </div>
        ) : gyms.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No hay gimnasios disponibles</h2>
              <p className="text-muted-foreground mb-6">
                Aún no se han registrado gimnasios en el sistema
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-12">
            {gyms.map((gym) => (
              <Card key={gym.id} className="border-border/50 bg-card/80 backdrop-blur overflow-hidden">
                {/* Gym Header */}
                <div className="relative">
                  <img 
                    src={getGymImage(gym)} 
                    alt={gym.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-3xl font-bold text-white">{gym.name}</h2>
                        <p className="text-white/80 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {gym.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-8">
                  {/* Basic Info */}
                  <div className="grid gap-8 md:grid-cols-3 mb-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        Ubicación
                      </h3>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">{gym.location}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        Horarios
                      </h3>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">{gym.hours}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        Contacto
                      </h3>
                      <div className="space-y-2">
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          {gym.phone}
                        </p>
                        <p className="text-muted-foreground flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          {gym.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-6 border-t border-border/50">
                    <Link href={getGymLink(gym)}>
                      <Button size="lg" className="gap-2">
                        Ver Gimnasio Completo
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
