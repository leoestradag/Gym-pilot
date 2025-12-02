"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Star, ArrowRight, Dumbbell, Brain, Wand2 } from "lucide-react"
import Link from "next/link"
import { GymCoachPreview } from "@/components/gym-coach-preview"
import { UserAvatar } from "@/components/user-avatar"

type Gym = {
  id: number
  name: string
  location: string
  image?: string | null
  slug?: string | null
}

export default function LandingPage() {
  const [gyms, setGyms] = useState<Gym[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-background">
      {/* User Avatar */}
      <div className="fixed top-6 right-6 z-50">
        <UserAvatar />
      </div>

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/20" />
        <img
          src="/people-training-in-modern-gym.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Dumbbell className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              Gym<span className="text-primary">Pilot</span>
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground/60 mb-6 uppercase tracking-wider">
            Powered by Tessalps Gym Efficiency
          </p>
          <p className="text-2xl md:text-3xl font-bold text-primary mb-12 text-balance">
            ¡Tu mejor versión te está esperando!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gimnasios">
              <Button size="lg" className="text-lg px-8 py-6 gap-2">
                Entrena con nosotros
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 gap-2 bg-transparent">
                Crear Cuenta
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gym Selection Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Elige tu gimnasio</h2>
            <p className="text-xl text-muted-foreground text-balance">Encuentra la ubicación más cercana a ti</p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Cargando gimnasios...</p>
            </div>
          ) : gyms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No hay gimnasios disponibles en este momento</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {gyms.map((gym) => (
                <Card
                  key={gym.id}
                  className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden hover:border-primary/70 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                >
                  <img
                    src={gym.image || "/modern-gym-interior.png"}
                    alt={gym.name}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-2xl">{gym.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-base">
                      <MapPin className="h-4 w-4" />
                      {gym.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Link href={`/gym/${gym.slug || gym.id}`} className="block">
                      <Button className="w-full gap-2">
                        Ver más información
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gym Coach AI Preview Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/15 via-accent/10 to-primary/25">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🚀 Descubre Gym Coach AI</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Tu entrenador personal inteligente que revolucionará tu forma de entrenar
            </p>
          </div>
          
          <GymCoachPreview />
        </div>
      </section>

      {/* Crea tu rutina con AI */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl">Crea tu rutina con AI</CardTitle>
              <CardDescription className="text-base">
                Diseña un plan de entrenamiento personalizado en segundos con nuestra ayuda de IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <Wand2 className="h-4 w-4 text-primary" />
                    Rutinas a tu medida
                  </div>
                  <p className="text-sm text-muted-foreground">Basadas en tu peso, estatura, edad y objetivo.</p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <Wand2 className="h-4 w-4 text-primary" />
                    Progresión inteligente
                  </div>
                  <p className="text-sm text-muted-foreground">Ajustes automáticos semana a semana.</p>
                </div>
                <div className="p-4 rounded-lg border border-border/50 bg-background/50">
                  <div className="flex items-center gap-2 font-medium mb-1">
                    <Wand2 className="h-4 w-4 text-primary" />
                    Guía de ejercicios
                  </div>
                  <p className="text-sm text-muted-foreground">Técnica, series, repeticiones y descanso.</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/crear-rutina">
                  <Button size="lg" className="gap-2">
                    Comenzar ahora
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    Crear cuenta gratis
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Eres dueño de un gimnasio?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Accede a nuestro panel administrativo para gestionar tu gimnasio
          </p>
          <Link href="/admin/gym/select">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Acceder al Panel Administrativo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
