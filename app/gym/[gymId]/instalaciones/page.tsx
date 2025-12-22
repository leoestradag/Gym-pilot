"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Wifi, Car, Dumbbell, Heart, Shield, Users, Loader2 } from "lucide-react"
import Link from "next/link"

const iconMap: { [key: string]: any } = {
  Dumbbell: Dumbbell,
  Heart: Heart,
  Shield: Shield,
  Users: Users,
}

export default function InstalacionesPage() {
  const params = useParams()
  const gymId = params.gymId as string
  const [gym, setGym] = useState<any>(null)
  const [facilities, setFacilities] = useState<any[]>([])
  const [amenities, setAmenities] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        // Buscar gimnasio
        const gymResponse = await fetch(`/api/gyms`)
        if (gymResponse.ok) {
          const gyms = await gymResponse.json()
          const foundGym = gyms.find((g: any) => 
            g.slug === gymId || 
            g.slug === gymId.replace(/-/g, " ") ||
            g.slug === gymId.replace(/ /g, "-") ||
            g.id === parseInt(gymId)
          )
          
          if (foundGym) {
            setGym(foundGym)
            
            // Cargar instalaciones y amenidades
            const facilitiesResponse = await fetch(`/api/public/gym/${gymId}/facilities`)
            if (facilitiesResponse.ok) {
              const data = await facilitiesResponse.json()
              setFacilities(data.facilities || [])
              setAmenities(data.amenities || [])
            }
          }
        }
      } catch (error) {
        console.error("Error loading gym data", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    if (gymId) {
      loadData()
    }
  }, [gymId])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando instalaciones...</span>
      </div>
    )
  }

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gimnasio no encontrado</h1>
          <p className="text-muted-foreground mb-4">
            No se encontró el gimnasio con el identificador: {gymId}
          </p>
          <Link href="/gimnasios">
            <Button>Ver todos los gimnasios</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/gym/${gym.slug || gymId}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Gimnasio
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Nuestras Instalaciones - {gym.name}</h1>
              <p className="text-muted-foreground">Conoce nuestras instalaciones de primera clase</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Nuestras Instalaciones</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Espacios diseñados para tu comodidad y rendimiento
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{gym.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{gym.hours}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {facilities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No hay instalaciones disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2">
              {facilities.map((facility) => {
                const IconComponent = facility.icon ? iconMap[facility.icon] || Dumbbell : Dumbbell
                return (
                  <Card key={facility.id} className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                    {facility.image && (
                      <img src={facility.image} alt={facility.name} className="w-full h-64 object-cover" />
                    )}
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="text-primary">
                          <IconComponent className="h-8 w-8" />
                        </div>
                        <CardTitle className="text-2xl">{facility.name}</CardTitle>
                      </div>
                      <p className="text-muted-foreground">{facility.description}</p>
                    </CardHeader>
                    <CardContent>
                      {facility.features && facility.features.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="font-semibold">Equipamiento incluido:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {facility.features.map((feature: string, index: number) => (
                              <div key={index} className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Amenidades Incluidas</h2>
            <p className="text-muted-foreground">Servicios adicionales para tu comodidad</p>
          </div>
          
          {amenities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No hay amenidades disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {amenities.map((amenity) => {
                const IconComponent = amenity.icon ? iconMap[amenity.icon] || Dumbbell : Dumbbell
                return (
                  <Card key={amenity.id} className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                    {amenity.image && (
                      <img src={amenity.image} alt={amenity.name} className="w-full h-48 object-cover" />
                    )}
                    <CardContent className="pt-6">
                      <div className="text-primary mb-4 flex justify-center">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold mb-2 text-center">{amenity.name}</h3>
                      <p className="text-sm text-muted-foreground text-center">{amenity.description || ""}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres conocer nuestras instalaciones?</h2>
          <p className="text-muted-foreground mb-8">
            Agenda una visita guiada y conoce todo lo que tenemos para ofrecerte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MapPin className="h-5 w-5" />
              Agendar Visita
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Clock className="h-5 w-5" />
              Consultar Horarios
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
