"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Star, Zap, Target, Users, Crown, Lock } from "lucide-react"
import Link from "next/link"

export function GymCoachPreview() {
  const [isHovered, setIsHovered] = useState(false)

  const features = [
    {
      icon: <Target className="h-5 w-5" />,
      title: "Rutinas Personalizadas",
      description: "IA que crea rutinas específicas para tus objetivos"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "20 Day Challenges",
      description: "Transformaciones intensivas con seguimiento diario"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Coaching 24/7",
      description: "Tu entrenador personal disponible siempre"
    }
  ]

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-primary/20 backdrop-blur relative overflow-hidden shadow-2xl">
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 shadow-lg">
            <Crown className="h-3 w-3 mr-1" />
            PREMIUM
          </Badge>
        </div>

        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Gym Coach AI
              </CardTitle>
              <p className="text-muted-foreground">Tu entrenador personal inteligente</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9/5 (2,847 usuarios)</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Description */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">
              🚀 Transforma tu cuerpo con IA de última generación
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nuestro <strong>Gym Coach AI</strong> es el primer entrenador personal inteligente que se adapta 
              perfectamente a tus objetivos, nivel de fitness y disponibilidad. Crea rutinas personalizadas, 
              te motiva diariamente y te guía hacia tu mejor versión.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                <div className="text-primary">{feature.icon}</div>
                <div>
                  <h4 className="font-semibold mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo Chat Preview */}
          <div className="relative">
            <div className={`transition-all duration-300 ${isHovered ? 'blur-sm' : 'blur-none'}`}>
              <div className="bg-muted/20 rounded-lg p-4 space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-background border border-border rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">¡Hola! Soy tu Gym Coach AI. Puedo crear rutinas personalizadas para ti. ¿Cuál es tu objetivo principal?</p>
                  </div>
                </div>
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">Quiero hacer un 20 day challenge para perder peso</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-background border border-border rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">¡Perfecto! Te voy a crear un plan de 20 días intensivo. Aquí tienes tu rutina personalizada...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-lg flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="text-center">
                <Lock className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Funcionalidad Premium</p>
                <p className="text-xs text-muted-foreground">Desbloquea con tu membresía</p>
              </div>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-3xl font-bold text-primary">$29</span>
              <span className="text-muted-foreground">/mes</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                -50% OFF
              </Badge>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Desbloquear Gym Coach AI
                </Button>
              </Link>
              <Link href="/auth">
                <Button variant="outline" size="lg">
                  Probar Gratis 7 Días
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-foreground">
              ✅ Sin compromiso • ✅ Cancela cuando quieras • ✅ Acceso inmediato
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
