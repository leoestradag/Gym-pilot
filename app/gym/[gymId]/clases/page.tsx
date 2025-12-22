"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowLeft, Calendar, MapPin, Loader2 } from "lucide-react"
import Link from "next/link"

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Principiante":
    case "General":
      return "bg-green-100 text-green-800"
    case "Intermedio":
      return "bg-yellow-100 text-yellow-800"
    case "Avanzado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ClasesPage() {
  const params = useParams()
  const gymId = params.gymId as string
  const [gym, setGym] = useState<any>(null)
  const [classes, setClasses] = useState<any[]>([])
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
            
            // Cargar clases del gimnasio
            const classesResponse = await fetch(`/api/public/gym/${gymId}/classes`)
            if (classesResponse.ok) {
              const classesData = await classesResponse.json()
              setClasses(classesData)
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
        <span className="ml-2 text-muted-foreground">Cargando clases...</span>
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

  // Agrupar clases por día para el horario semanal
  const classesByDay: { [key: string]: any[] } = {}
  classes.forEach((cls) => {
    const day = cls.day
    if (!classesByDay[day]) {
      classesByDay[day] = []
    }
    classesByDay[day].push(cls)
  })

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

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
              <h1 className="text-3xl font-bold">Clases Grupales - {gym.name}</h1>
              <p className="text-muted-foreground">Descubre nuestras clases y reserva tu lugar</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Clases Grupales</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a nuestras clases dirigidas por instructores certificados
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
          {classes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No hay clases disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {classes.map((clase) => (
                <Card key={clase.id} className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{clase.name}</CardTitle>
                      <Badge className={getDifficultyColor(clase.difficulty)}>
                        {clase.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {clase.time} ({clase.duration} min)
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {clase.capacity}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Instructor: {clase.instructor}</h4>
                      <p className="text-sm text-muted-foreground">{clase.description || "Clase grupal dirigida por instructor certificado."}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Reservar Clase</Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Horario Semanal</h2>
            <p className="text-muted-foreground">Consulta nuestros horarios de clases</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-7">
            {daysOfWeek.map((day) => (
              <Card key={day} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {classesByDay[day] && classesByDay[day].length > 0 ? (
                      classesByDay[day].map((cls) => (
                        <div key={cls.id} className="p-2 bg-primary/10 rounded">
                          {cls.name} {cls.time}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-xs">Sin clases</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes preguntas sobre nuestras clases?</h2>
          <p className="text-muted-foreground mb-8">
            Contáctanos para más información sobre horarios, reservas y clases especiales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Reservar Clase
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Consultar Disponibilidad
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
