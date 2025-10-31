"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  ArrowLeft, 
  Brain, 
  Weight, 
  Ruler, 
  Calendar, 
  Sparkles,
  Dumbbell,
  Heart,
  Activity,
  Users,
  Zap,
  Clock,
  CheckCircle,
  X,
  Target,
  Timer,
  Repeat,
  Play,
  UtensilsCrossed,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

interface UserData {
  weight: number | null
  height: number | null
  age: number | null
}

interface Exercise {
  name: string
  sets: number | string
  reps: string
  rest: string
  description: string
  equipment: string
}

interface DayData {
  title: string
  icon: any
  color: string
  exercises: Exercise[]
}

interface Meal {
  name: string
  time: string
  description: string
  calories: number
}

interface WeeklyDiet {
  week: number
  dailyCalories: number
  macronutrients: {
    protein: number
    carbs: number
    fats: number
  }
  meals: {
    [key: string]: Meal[]
  }
}

export default function CrearRutinaPage() {
  const [weight, setWeight] = useState([70])
  const [height, setHeight] = useState([175])
  const [age, setAge] = useState([25])
  const [goal, setGoal] = useState<string>("")
  const [customGoal, setCustomGoal] = useState<string>("")
  const [allergies, setAllergies] = useState<string>("")
  const [currentWeek, setCurrentWeek] = useState(1)
  const [routineGenerated, setRoutineGenerated] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [completedDays, setCompletedDays] = useState<{[key: string]: boolean}>({
    lunes: false,
    martes: false,
    miércoles: false,
    jueves: false,
    viernes: false,
    sábado: false,
    domingo: false
  })

  const weeklyWorkoutData: {[key: string]: DayData} = {
    "lunes": {
      title: "PECHO Y TRÍCEPS",
      icon: Dumbbell,
      color: "primary",
      exercises: [
        {
          name: "Press banca",
          sets: 4,
          reps: "8-10",
          rest: "2-3 min",
          description: "Acostado en banco, baja la barra hasta el pecho y empuja hacia arriba",
          equipment: "Banco plano + barra + discos"
        },
        {
          name: "Aperturas con mancuernas",
          sets: 3,
          reps: "12-15",
          rest: "1-2 min",
          description: "Acostado en banco inclinado, abre los brazos hasta el pecho",
          equipment: "Banco inclinado + mancuernas"
        },
        {
          name: "Fondos en paralelas",
          sets: 3,
          reps: "8-12",
          rest: "1-2 min",
          description: "Apoya las manos en las barras paralelas y baja el cuerpo",
          equipment: "Barras paralelas"
        },
        {
          name: "Extensión de tríceps",
          sets: 3,
          reps: "10-12",
          rest: "1-2 min",
          description: "Sentado o de pie, extiende los brazos con mancuerna por encima de la cabeza",
          equipment: "Mancuerna"
        }
      ]
    },
    "martes": {
      title: "ESPALDA Y BÍCEPS",
      icon: Heart,
      color: "accent",
      exercises: [
        {
          name: "Dominadas/Remo con barra",
          sets: 4,
          reps: "6-8",
          rest: "2-3 min",
          description: "Tira de tu cuerpo hacia arriba hasta que el mentón pase la barra",
          equipment: "Barra de dominadas"
        },
        {
          name: "Jalón al pecho",
          sets: 3,
          reps: "10-12",
          rest: "2 min",
          description: "Sentado en polea, tira hacia abajo hasta el pecho",
          equipment: "Máquina de polea"
        },
        {
          name: "Curl de bíceps",
          sets: 3,
          reps: "12-15",
          rest: "1-2 min",
          description: "De pie, flexiona los brazos llevando las mancuernas hacia los hombros",
          equipment: "Mancuernas"
        },
        {
          name: "Martillo con mancuernas",
          sets: 3,
          reps: "10-12",
          rest: "1-2 min",
          description: "Curl con agarre neutro, manteniendo las mancuernas paralelas",
          equipment: "Mancuernas"
        }
      ]
    },
    "miércoles": {
      title: "PIERNAS",
      icon: Activity,
      color: "green-500",
      exercises: [
        {
          name: "Sentadillas",
          sets: 4,
          reps: "12-15",
          rest: "2-3 min",
          description: "Pies al ancho de hombros, baja como si te sentaras en una silla",
          equipment: "Barra + discos (opcional)"
        },
        {
          name: "Peso muerto",
          sets: 4,
          reps: "8-10",
          rest: "3 min",
          description: "Levanta la barra desde el suelo manteniendo la espalda recta",
          equipment: "Barra + discos"
        },
        {
          name: "Prensa de piernas",
          sets: 3,
          reps: "15-20",
          rest: "2 min",
          description: "Sentado en la máquina, empuja el peso con las piernas",
          equipment: "Máquina de prensa"
        },
        {
          name: "Gemelos",
          sets: 4,
          reps: "15-20",
          rest: "1-2 min",
          description: "De pie, eleva los talones lo más alto posible",
          equipment: "Máquina de gemelos o peso libre"
        }
      ]
    },
    "jueves": {
      title: "HOMBROS Y CORE",
      icon: Users,
      color: "orange-500",
      exercises: [
        {
          name: "Press militar",
          sets: 4,
          reps: "8-10",
          rest: "2-3 min",
          description: "De pie o sentado, presiona la barra por encima de la cabeza",
          equipment: "Barra + discos"
        },
        {
          name: "Elevaciones laterales",
          sets: 3,
          reps: "12-15",
          rest: "1-2 min",
          description: "Con mancuernas, eleva los brazos lateralmente hasta la altura de los hombros",
          equipment: "Mancuernas"
        },
        {
          name: "Plancha abdominal",
          sets: 3,
          reps: "30-45 seg",
          rest: "1 min",
          description: "Mantén posición de flexión apoyado en antebrazos",
          equipment: "Solo peso corporal"
        },
        {
          name: "Crunches",
          sets: 3,
          reps: "20-25",
          rest: "1 min",
          description: "Acostado, levanta el torso hacia las rodillas",
          equipment: "Solo peso corporal"
        }
      ]
    },
    "viernes": {
      title: "CARDIO Y FUNCIONAL",
      icon: Zap,
      color: "purple-500",
      exercises: [
        {
          name: "Cardio moderado",
          sets: 1,
          reps: "30 min",
          rest: "0",
          description: "Mantén ritmo constante en cinta, bici o elíptica",
          equipment: "Cinta, bici o elíptica"
        },
        {
          name: "Burpees",
          sets: 3,
          reps: "10-15",
          rest: "1-2 min",
          description: "Flexión + salto + flexión completa del cuerpo",
          equipment: "Solo peso corporal"
        },
        {
          name: "Mountain climbers",
          sets: 3,
          reps: "20-30",
          rest: "1 min",
          description: "En posición de plancha, alterna las rodillas hacia el pecho",
          equipment: "Solo peso corporal"
        },
        {
          name: "Estiramientos",
          sets: 1,
          reps: "10-15 min",
          rest: "0",
          description: "Estira todos los grupos musculares trabajados",
          equipment: "Colchoneta"
        }
      ]
    },
    "sábado": {
      title: "ENTRENAMIENTO LIBRE",
      icon: Clock,
      color: "blue-500",
      exercises: [
        {
          name: "Ejercicios de preferencia",
          sets: "Variable",
          reps: "Variable",
          rest: "Variable",
          description: "Realiza los ejercicios que más te gusten",
          equipment: "Variable"
        },
        {
          name: "Actividades recreativas",
          sets: 1,
          reps: "30-60 min",
          rest: "Variable",
          description: "Natación, caminata, deportes, etc.",
          equipment: "Variable"
        },
        {
          name: "Yoga o Pilates",
          sets: 1,
          reps: "45-60 min",
          rest: "0",
          description: "Mejora flexibilidad y relajación",
          equipment: "Colchoneta"
        }
      ]
    },
    "domingo": {
      title: "DESCANSO",
      icon: Heart,
      color: "gray-500",
      exercises: [
        {
          name: "Recuperación activa",
          sets: 1,
          reps: "20-30 min",
          rest: "0",
          description: "Caminata ligera o estiramientos suaves",
          equipment: "Ninguno"
        },
        {
          name: "Hidratación extra",
          sets: 1,
          reps: "3-4 litros",
          rest: "0",
          description: "Bebe más agua de lo normal para recuperación",
          equipment: "Agua"
        }
      ]
    }
  }

  const toggleDayCompleted = (day: string) => {
    setCompletedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  const getProgressStats = () => {
    const completedCount = Object.values(completedDays).filter(Boolean).length
    const totalDays = 7
    const targetDays = 5
    const completionPercentage = Math.round((completedCount / totalDays) * 100)
    
    return {
      completedCount,
      totalDays,
      targetDays,
      completionPercentage
    }
  }

  const calculateBMR = () => {
    // Fórmula de Harris-Benedict (aproximada)
    const weightKg = weight[0]
    const heightCm = height[0]
    const ageYears = age[0]
    
    // BMR base (aproximado para hombres, se puede mejorar con género)
    const bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears)
    
    // TDEE (Total Daily Energy Expenditure) - multiplicador de actividad moderada
    const tdee = bmr * 1.55
    
    return { bmr, tdee }
  }

  const containsAllergen = (foodName: string, allergens: string): boolean => {
    if (!allergens || allergens.trim() === "") return false
    
    const allergenList = allergens.toLowerCase().split(/[,;]/).map(a => a.trim())
    const foodLower = foodName.toLowerCase()
    
    return allergenList.some(allergen => foodLower.includes(allergen))
  }

  const filterMealsByAllergens = (meals: { name: string; calories: number }[], allergens: string) => {
    return meals.filter(meal => !containsAllergen(meal.name, allergens))
  }

  const generateWeeklyDiet = (week: number): WeeklyDiet => {
    const { tdee } = calculateBMR()
    const userGoal = goal || "definir"
    
    // Ajustar calorías según objetivo y semana
    let baseCalories = tdee
    
    if (userGoal === "bajar-peso") {
      // Déficit calórico: semana 1-2 déficit moderado, semana 3+ déficit más agresivo
      baseCalories = week <= 2 ? tdee - 300 : tdee - 500
    } else if (userGoal === "subir-peso") {
      // Superávit calórico: semana 1-2 moderado, semana 3+ más agresivo
      baseCalories = week <= 2 ? tdee + 300 : tdee + 500
    } else if (userGoal === "definir") {
      // Déficit ligero para definir
      baseCalories = week <= 2 ? tdee - 200 : tdee - 300
    } else {
      // Para "otro", mantener balanceado
      baseCalories = tdee
    }
    
    // Variar ligeramente según semana para evitar meseta
    const weeklyVariation = week % 2 === 0 ? 50 : -50
    const dailyCalories = Math.round(baseCalories + weeklyVariation)
    
    // Calcular macronutrientes
    let protein, carbs, fats
    
    if (userGoal === "bajar-peso") {
      protein = Math.round((dailyCalories * 0.35) / 4) // 35% proteína
      carbs = Math.round((dailyCalories * 0.35) / 4) // 35% carbohidratos
      fats = Math.round((dailyCalories * 0.30) / 9) // 30% grasas
    } else if (userGoal === "subir-peso") {
      protein = Math.round((dailyCalories * 0.30) / 4) // 30% proteína
      carbs = Math.round((dailyCalories * 0.45) / 4) // 45% carbohidratos
      fats = Math.round((dailyCalories * 0.25) / 9) // 25% grasas
    } else {
      // Definir u otro
      protein = Math.round((dailyCalories * 0.30) / 4) // 30% proteína
      carbs = Math.round((dailyCalories * 0.40) / 4) // 40% carbohidratos
      fats = Math.round((dailyCalories * 0.30) / 9) // 30% grasas
    }
    
    // Generar menús por día
    const meals: {[key: string]: Meal[]} = {}
    const days = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]
    
    const mealTemplates = {
      bajarPeso: {
        desayuno: [
          { name: "Avena con frutas y yogur griego", calories: 350 },
          { name: "Tostadas integrales con huevo y aguacate", calories: 320 },
          { name: "Batido de proteína con espinacas", calories: 280 }
        ],
        almuerzo: [
          { name: "Pechuga de pollo a la plancha con quinoa", calories: 450 },
          { name: "Salmón al horno con verduras al vapor", calories: 420 },
          { name: "Ensalada de atún con legumbres", calories: 380 }
        ],
        cena: [
          { name: "Pescado blanco con espárragos", calories: 350 },
          { name: "Tortilla de claras con vegetales", calories: 280 },
          { name: "Sopa de verduras con pollo", calories: 320 }
        ],
        snacks: [
          { name: "Yogur griego con frutos secos", calories: 150 },
          { name: "Manzana con mantequilla de almendras", calories: 180 },
          { name: "Barra de proteína", calories: 200 }
        ]
      },
      subirPeso: {
        desayuno: [
          { name: "Pan integral con mantequilla de maní y plátano", calories: 550 },
          { name: "Avena con proteína y frutos secos", calories: 600 },
          { name: "Huevos revueltos con aguacate y pan", calories: 580 }
        ],
        almuerzo: [
          { name: "Arroz con pollo y frijoles", calories: 650 },
          { name: "Pasta integral con salmón y verduras", calories: 680 },
          { name: "Batata con carne molida y vegetales", calories: 620 }
        ],
        cena: [
          { name: "Pechuga de pollo con arroz y aguacate", calories: 600 },
          { name: "Atún con patata al horno", calories: 580 },
          { name: "Carne a la plancha con pasta", calories: 620 }
        ],
        snacks: [
          { name: "Batido de proteína con avena", calories: 350 },
          { name: "Frutos secos y frutas", calories: 400 },
          { name: "Sándwich de pollo", calories: 450 }
        ]
      },
      definir: {
        desayuno: [
          { name: "Avena con proteína en polvo", calories: 400 },
          { name: "Tostadas con huevo, aguacate y tomate", calories: 380 },
          { name: "Yogur griego con granola y frutas", calories: 420 }
        ],
        almuerzo: [
          { name: "Pechuga de pollo con arroz integral", calories: 500 },
          { name: "Salmón con camote y brócoli", calories: 480 },
          { name: "Ensalada de pollo con quinoa", calories: 460 }
        ],
        cena: [
          { name: "Pescado con verduras al vapor", calories: 380 },
          { name: "Pollo a la plancha con ensalada", calories: 360 },
          { name: "Tofu salteado con vegetales", calories: 350 }
        ],
        snacks: [
          { name: "Yogur griego con frutas", calories: 200 },
          { name: "Batido de proteína", calories: 220 },
          { name: "Frutos secos (porción controlada)", calories: 180 }
        ]
      }
    }
    
    const selectedTemplate = userGoal === "bajar-peso" ? mealTemplates.bajarPeso :
                             userGoal === "subir-peso" ? mealTemplates.subirPeso :
                             mealTemplates.definir
    
    // Filtrar alimentos según alergias
    const filteredDesayuno = filterMealsByAllergens(selectedTemplate.desayuno, allergies)
    const filteredAlmuerzo = filterMealsByAllergens(selectedTemplate.almuerzo, allergies)
    const filteredCena = filterMealsByAllergens(selectedTemplate.cena, allergies)
    const filteredSnacks = filterMealsByAllergens(selectedTemplate.snacks, allergies)
    
    // Asegurar que hay al menos una opción disponible
    const safeDesayuno = filteredDesayuno.length > 0 ? filteredDesayuno : [{ name: "Opción alternativa disponible", calories: 350 }]
    const safeAlmuerzo = filteredAlmuerzo.length > 0 ? filteredAlmuerzo : [{ name: "Opción alternativa disponible", calories: 450 }]
    const safeCena = filteredCena.length > 0 ? filteredCena : [{ name: "Opción alternativa disponible", calories: 350 }]
    const safeSnacks = filteredSnacks.length > 0 ? filteredSnacks : [{ name: "Opción alternativa disponible", calories: 200 }]
    
    days.forEach((day, dayIndex) => {
      const dayMeals: Meal[] = []
      
      // Desayuno
      const breakfast = safeDesayuno[(week + dayIndex) % safeDesayuno.length]
      dayMeals.push({
        name: breakfast.name,
        time: "08:00",
        description: breakfast.name,
        calories: breakfast.calories
      })
      
      // Almuerzo
      const lunch = safeAlmuerzo[(week + dayIndex) % safeAlmuerzo.length]
      dayMeals.push({
        name: lunch.name,
        time: "13:00",
        description: lunch.name,
        calories: lunch.calories
      })
      
      // Snack (opcional según calorías)
      if (dailyCalories > 2000) {
        const snack = safeSnacks[(week + dayIndex) % safeSnacks.length]
        dayMeals.push({
          name: snack.name,
          time: "16:00",
          description: snack.name,
          calories: snack.calories
        })
      }
      
      // Cena
      const dinner = safeCena[(week + dayIndex) % safeCena.length]
      dayMeals.push({
        name: dinner.name,
        time: "20:00",
        description: dinner.name,
        calories: dinner.calories
      })
      
      meals[day] = dayMeals
    })
    
    return {
      week,
      dailyCalories,
      macronutrients: { protein, carbs, fats },
      meals
    }
  }

  const handleGenerateRoutine = () => {
    setRoutineGenerated(true)
    // Scroll suave hacia el calendario
    setTimeout(() => {
      const calendarElement = document.getElementById('rutina-calendario')
      if (calendarElement) {
        calendarElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const stats = getProgressStats()
  const dayNames: {[key: string]: string} = {
    lunes: "LUNES",
    martes: "MARTES",
    miércoles: "MIÉRCOLES",
    jueves: "JUEVES",
    viernes: "VIERNES",
    sábado: "SÁBADO",
    domingo: "DOMINGO"
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

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Formulario */}
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

            {/* Objetivo */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Objetivo
              </Label>
              <RadioGroup value={goal} onValueChange={setGoal} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="definir" id="definir" />
                  <Label htmlFor="definir" className="cursor-pointer font-normal">
                    Definir
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="subir-peso" id="subir-peso" />
                  <Label htmlFor="subir-peso" className="cursor-pointer font-normal">
                    Subir de peso
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bajar-peso" id="bajar-peso" />
                  <Label htmlFor="bajar-peso" className="cursor-pointer font-normal">
                    Bajar de peso
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="otro" id="otro" />
                  <Label htmlFor="otro" className="cursor-pointer font-normal">
                    Otro
                  </Label>
                </div>
              </RadioGroup>
              {goal === "otro" && (
                <div className="mt-4 space-y-2">
                  <Label htmlFor="custom-goal" className="text-sm text-muted-foreground">
                    Describe tu objetivo personalizado
                  </Label>
                  <Input
                    id="custom-goal"
                    placeholder="Ej: Mejorar resistencia, aumentar masa muscular..."
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Alergias o inconvenientes */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center gap-2">
                <X className="h-5 w-5 text-primary" />
                Alergias o inconvenientes
              </Label>
              <Input
                id="allergies"
                placeholder="Ej: Nuez, mariscos, lactosa, gluten..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Lista los alimentos o ingredientes que debes evitar. Estos serán excluidos de tu dieta.
              </p>
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
            </div>
          </CardContent>
        </Card>

        {/* Calendario y Progreso - Solo se muestra después de generar */}
        {routineGenerated && (
          <div id="rutina-calendario" className="mt-12 space-y-8">
            {/* Dieta Semana a Semana */}
            {goal && (
              <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <UtensilsCrossed className="h-5 w-5 text-primary" />
                      Dieta Semana a Semana
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
                        disabled={currentWeek === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm font-medium px-2">
                        Semana {currentWeek}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentWeek(currentWeek + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Plan nutricional personalizado basado en tus datos y objetivo
                  </p>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const diet = generateWeeklyDiet(currentWeek)
                    const dayNames: {[key: string]: string} = {
                      lunes: "Lunes",
                      martes: "Martes",
                      miércoles: "Miércoles",
                      jueves: "Jueves",
                      viernes: "Viernes",
                      sábado: "Sábado",
                      domingo: "Domingo"
                    }
                    
                    return (
                      <div className="space-y-6">
                        {/* Resumen de calorías y macronutrientes */}
                        <div className="grid gap-4 md:grid-cols-4 p-4 bg-primary/5 rounded-lg">
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Calorías Diarias</div>
                            <div className="text-2xl font-bold text-primary">{diet.dailyCalories}</div>
                            <div className="text-xs text-muted-foreground">kcal</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Proteína</div>
                            <div className="text-2xl font-bold text-primary">{diet.macronutrients.protein}g</div>
                            <div className="text-xs text-muted-foreground">{(diet.macronutrients.protein * 4 / diet.dailyCalories * 100).toFixed(0)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Carbohidratos</div>
                            <div className="text-2xl font-bold text-primary">{diet.macronutrients.carbs}g</div>
                            <div className="text-xs text-muted-foreground">{(diet.macronutrients.carbs * 4 / diet.dailyCalories * 100).toFixed(0)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-muted-foreground">Grasas</div>
                            <div className="text-2xl font-bold text-primary">{diet.macronutrients.fats}g</div>
                            <div className="text-xs text-muted-foreground">{(diet.macronutrients.fats * 9 / diet.dailyCalories * 100).toFixed(0)}%</div>
                          </div>
                        </div>

                        {/* Menú semanal */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          {Object.entries(diet.meals).map(([day, meals]) => (
                            <Card key={day} className="border border-border/50">
                              <CardHeader className="pb-3">
                                <CardTitle className="text-base">{dayNames[day]}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-3">
                                {meals.map((meal, index) => (
                                  <div key={index} className="border-b border-border/30 pb-2 last:border-0 last:pb-0">
                                    <div className="flex items-start justify-between">
                                      <div className="flex-1">
                                        <div className="text-sm font-medium">{meal.name}</div>
                                        <div className="text-xs text-muted-foreground">{meal.time}</div>
                                      </div>
                                      <Badge variant="outline" className="text-xs">
                                        {meal.calories} kcal
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                                <div className="pt-2 text-xs text-muted-foreground">
                                  Total: {meals.reduce((sum, m) => sum + m.calories, 0)} kcal
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}

            {/* Progreso */}
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Tu Progreso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center gap-3">
                  {(() => {
                    const size = 160
                    const strokeWidth = 18
                    const radius = (size - strokeWidth) / 2
                    const circumference = 2 * Math.PI * radius
                    const progress = Math.max(0, Math.min(100, stats.completionPercentage))
                    const offset = circumference * (1 - progress / 100)
                    const color = progress < 40 ? '#ef4444' : progress < 70 ? '#f59e0b' : '#22c55e'

                    return (
                      <div className="relative" style={{ width: size, height: size }}>
                        <svg width={size} height={size} className="-rotate-90">
                          <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke="#9ca3af"
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            opacity={0.35}
                          />
                          <circle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            style={{ transition: 'stroke-dashoffset 600ms ease, stroke 300ms ease' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-extrabold" style={{ color }}>{progress}%</div>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Días completados</div>
                    <div className="text-base font-semibold">{stats.completedCount} / {stats.totalDays}</div>
                    <div className="text-xs text-muted-foreground">Objetivo semanal: {stats.targetDays} días</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calendario Semanal */}
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Calendario Semanal
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Plan de entrenamiento por días de la semana
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Object.entries(weeklyWorkoutData).map(([day, dayData]) => {
                    const IconComponent = dayData.icon
                    const isCompleted = completedDays[day]

                    const colorClasses: {[key: string]: {bg: string, hover: string, text: string, border: string}} = {
                      lunes: { bg: 'bg-primary/5', hover: 'hover:bg-primary/10', text: 'text-primary', border: 'border-primary' },
                      martes: { bg: 'bg-accent/5', hover: 'hover:bg-accent/10', text: 'text-accent', border: 'border-accent' },
                      miércoles: { bg: 'bg-green-500/5', hover: 'hover:bg-green-500/10', text: 'text-green-500', border: 'border-green-500' },
                      jueves: { bg: 'bg-orange-500/5', hover: 'hover:bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500' },
                      viernes: { bg: 'bg-purple-500/5', hover: 'hover:bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500' },
                      sábado: { bg: 'bg-blue-500/5', hover: 'hover:bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500' },
                      domingo: { bg: 'bg-gray-500/5', hover: 'hover:bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500' }
                    }
                    const dayColors = colorClasses[day]

                    return (
                      <div
                        key={day}
                        className={`border border-border/50 rounded-lg p-4 cursor-pointer ${dayColors.hover} transition-colors ${
                          isCompleted ? 'bg-green-500/10 border-green-500/50' : dayColors.bg
                        }`}
                        onClick={() => setSelectedDay(day)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`h-5 w-5 ${dayColors.text}`} />
                            <span className="font-semibold">{dayNames[day]}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleDayCompleted(day)
                            }}
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                              isCompleted 
                                ? 'bg-green-500 border-green-500 text-white' 
                                : `${dayColors.border} ${dayColors.hover}`
                            }`}
                          >
                            {isCompleted && <CheckCircle className="h-4 w-4" />}
                          </button>
                        </div>
                        <div className="text-sm font-medium mb-2">{dayData.title}</div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          {dayData.exercises.slice(0, 4).map((exercise, idx) => (
                            <div key={idx}>• {exercise.name}</div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-primary font-medium">
                          Click para ver detalles →
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal de Detalles del Día */}
        {selectedDay && (
          <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  {(() => {
                    const dayData = weeklyWorkoutData[selectedDay]
                    const IconComponent = dayData.icon
                    const colorMap: {[key: string]: string} = {
                      lunes: 'text-primary',
                      martes: 'text-accent',
                      miércoles: 'text-green-500',
                      jueves: 'text-orange-500',
                      viernes: 'text-purple-500',
                      sábado: 'text-blue-500',
                      domingo: 'text-gray-500'
                    }
                    return (
                      <>
                        <IconComponent className={`h-6 w-6 ${colorMap[selectedDay] || 'text-primary'}`} />
                        <div>
                          <div className="text-xl font-bold">{dayNames[selectedDay]}</div>
                          <p className="text-sm text-muted-foreground">{dayData.title}</p>
                        </div>
                      </>
                    )
                  })()}
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 mt-4">
                {weeklyWorkoutData[selectedDay].exercises.map((exercise, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Play className="h-5 w-5 text-primary" />
                        {exercise.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-2">
                          <Repeat className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Series</div>
                            <div className="text-lg font-bold text-primary">{exercise.sets}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Repeticiones</div>
                            <div className="text-lg font-bold text-primary">{exercise.reps}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Timer className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="text-sm font-medium">Descanso</div>
                            <div className="text-lg font-bold text-primary">{exercise.rest}</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 pt-2 border-t border-border/50">
                        <p className="text-sm text-muted-foreground">{exercise.description}</p>
                        <Badge variant="outline" className="text-xs">
                          {exercise.equipment}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}