"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ArrowLeft, Brain, Weight, Ruler, Calendar, Sparkles } from "lucide-react"
import Link from "next/link"

export default function CrearRutinaPage() {
  const router = useRouter()
  const [weight, setWeight] = useState([70])
  const [height, setHeight] = useState([175])
  const [age, setAge] = useState([25])

  const handleGenerateRoutine = () => {
    // Guardar datos en localStorage
    const userData = {
      weight: weight[0],
      height: height[0],
      age: age[0]
    }
    
    localStorage.setItem('user-routine-data', JSON.stringify(userData))
    
    // Redirigir a gym-coach con los datos
    router.push('/gym-coach')
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
                Volver al Inicio
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Brain className="h-8 w-8 text-primary" />
                Crea tu Rutina con IA
              </h1>
              <p className="text-muted-foreground">Diseña un plan de entrenamiento personalizado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Configura tu Perfil</CardTitle>
            <CardDescription className="text-base">
              Ajusta los siguientes datos para crear una rutina 100% personalizada para ti
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Peso */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Weight className="h-5 w-5 text-primary" />
                  Peso
                </Label>
                <div className="text-2xl font-bold text-primary">
                  {weight[0]} <span className="text-base font-normal text-muted-foreground">kg</span>
                </div>
              </div>
              <Slider
                value={weight}
                onValueChange={setWeight}
                min={40}
                max={150}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40 kg</span>
                <span>150 kg</span>
              </div>
            </div>

            {/* Estatura */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-primary" />
                  Estatura
                </Label>
                <div className="text-2xl font-bold text-primary">
                  {height[0]} <span className="text-base font-normal text-muted-foreground">cm</span>
                </div>
              </div>
              <Slider
                value={height}
                onValueChange={setHeight}
                min={140}
                max={220}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>140 cm</span>
                <span>220 cm</span>
              </div>
            </div>

            {/* Edad */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Edad
                </Label>
                <div className="text-2xl font-bold text-primary">
                  {age[0]} <span className="text-base font-normal text-muted-foreground">años</span>
                </div>
              </div>
              <Slider
                value={age}
                onValueChange={setAge}
                min={14}
                max={80}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>14 años</span>
                <span>80 años</span>
              </div>
            </div>

            {/* Botón de generar */}
            <div className="pt-6">
              <Button
                onClick={handleGenerateRoutine}
                size="lg"
                className="w-full text-lg py-6 gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Generar mi Rutina Personalizada
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                Al hacer clic, serás redirigido al Gym Coach AI con tus datos configurados
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card className="border border-border/50 bg-card/50">
            <CardContent className="pt-6 text-center">
              <Weight className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Rutina Personalizada</h3>
              <p className="text-xs text-muted-foreground">
                Basada en tus características físicas
              </p>
            </CardContent>
          </Card>
          <Card className="border border-border/50 bg-card/50">
            <CardContent className="pt-6 text-center">
              <Ruler className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Plan Semanal</h3>
              <p className="text-xs text-muted-foreground">
                Distribución de ejercicios por días
              </p>
            </CardContent>
          </Card>
          <Card className="border border-border/50 bg-card/50">
            <CardContent className="pt-6 text-center">
              <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Progresión Inteligente</h3>
              <p className="text-xs text-muted-foreground">
                Ajustes automáticos semana a semana
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
