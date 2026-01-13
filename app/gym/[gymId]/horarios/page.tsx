"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, MapPin, Phone, Mail, Calendar, Users, Loader2 } from "lucide-react"
import Link from "next/link"

export default function HorariosPage() {
  const params = useParams()
  const gymId = params.gymId as string
  const [gym, setGym] = useState<any>(null)
  const [schedules, setSchedules] = useState<any[]>([])
  const [classesByDay, setClassesByDay] = useState<{ [key: string]: any[] }>({})
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
            
            // Cargar horarios y clases
            const schedulesResponse = await fetch(`/api/public/gym/${gymId}/schedules`)
            if (schedulesResponse.ok) {
              const data = await schedulesResponse.json()
              setSchedules(data.schedules || [])
              setClassesByDay(data.classesByDay || {})
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
        <span className="ml-2 text-muted-foreground">Cargando horarios...</span>
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

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  const dayMap: { [key: string]: string } = {
    lunes: "Lunes",
    martes: "Martes",
    miercoles: "Miércoles",
    jueves: "Jueves",
    viernes: "Viernes",
    sabado: "Sábado",
    domingo: "Domingo",
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
              <h1 className="text-3xl font-bold">Horarios - {gym.name}</h1>
              <p className="text-muted-foreground">Consulta nuestros horarios de clases y servicios</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-primary font-medium mb-2">{gym.name}</p>
          <h2 className="text-4xl font-bold mb-4">Horarios de Clases</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Planifica tu entrenamiento con nuestros horarios semanales
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Horario Semanal</h2>
            <p className="text-muted-foreground">Todas nuestras clases y horarios de la semana</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
            {daysOfWeek.map((day) => (
              <Card key={day} className="border-2 border-border/60 bg-card/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-center text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {classesByDay[day] && classesByDay[day].length > 0 ? (
                    classesByDay[day].map((clase, index) => (
                      <div key={index} className="p-3 bg-primary/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm">{clase.class}</span>
                          <Badge variant="secondary" className="text-xs">
                            {clase.capacity}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {clase.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {clase.instructor}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-xs text-center py-4">Sin clases</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Horarios del Gimnasio</h2>
            <p className="text-muted-foreground">Horarios de atención y servicios</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {schedules.length > 0 ? (
              schedules.map((schedule) => {
                const dayName = dayMap[schedule.dayOfWeek.toLowerCase()] || schedule.dayOfWeek
                return (
                  <Card key={schedule.id} className="border-2 border-border/60 bg-card/90 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-lg">{dayName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {schedule.isClosed ? (
                        <p className="text-muted-foreground">Cerrado</p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-semibold">
                            {schedule.openTime} - {schedule.closeTime}
                          </span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground text-lg">No hay horarios configurados.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-muted-foreground mb-8">
            Contáctanos para consultas sobre horarios especiales o cambios en el calendario
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Phone className="h-5 w-5" />
              {gym.phone}
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              {gym.email}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
