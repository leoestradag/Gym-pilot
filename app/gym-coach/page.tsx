"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { 
  Bot, 
  Send, 
  User, 
  Crown, 
  Zap, 
  Target, 
  Calendar,
  Dumbbell,
  Clock,
  CheckCircle,
  ArrowLeft,
  Home,
  MessageSquare,
  Sparkles,
  Camera,
  Upload,
  Weight,
  Ruler,
  Calendar as CalendarIcon,
  Image as ImageIcon,
  ArrowDown,
  Heart,
  Users,
  Activity,
  X,
  Timer,
  Repeat,
  Play
} from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

interface UserData {
  weight: number | null
  height: number | null
  age: number | null
  photo: string | null
  goals: string[]
  experience: string
  availableTime: number
}

export default function GymCoachPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "¡Hola! Soy tu Gym Coach AI personalizado. Para crear la rutina perfecta para ti, necesito conocer algunos datos básicos. ¿Podrías compartir conmigo tu peso, estatura, edad y una foto de tu cuerpo? Con esta información podré diseñar un plan de entrenamiento 100% personalizado para tus objetivos.",
      timestamp: "10:30 AM"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    weight: null,
    height: null,
    age: null,
    photo: null,
    goals: [],
    experience: "",
    availableTime: 0
  })
  const [showDataForm, setShowDataForm] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [isSavingData, setIsSavingData] = useState(false)
  const [showScrollButton, setShowScrollButton] = useState(false)
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
  const [allDaysCompleted, setAllDaysCompleted] = useState(false)
  const [resetTimer, setResetTimer] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Detectar cuando se completan todos los días y manejar el reset automático
  useEffect(() => {
    const completedCount = Object.values(completedDays).filter(Boolean).length
    const totalDays = 7
    
    if (completedCount === totalDays && !allDaysCompleted) {
      setAllDaysCompleted(true)
      setShowCelebration(true)
      
      // Iniciar timer de 3 minutos (180 segundos)
      setResetTimer(180)
      
      // Mostrar celebración por 2 segundos
      setTimeout(() => {
        setShowCelebration(false)
      }, 2000)
    }
  }, [completedDays, allDaysCompleted])

  // Timer countdown separado
  useEffect(() => {
    if (resetTimer !== null && resetTimer > 0) {
      const countdown = setInterval(() => {
        setResetTimer(prev => {
          if (prev === null || prev <= 1) {
            // Reiniciar todo cuando llegue a 0
            setCompletedDays({
              lunes: false,
              martes: false,
              miércoles: false,
              jueves: false,
              viernes: false,
              sábado: false,
              domingo: false
            })
            setAllDaysCompleted(false)
            setResetTimer(null)
            return null
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(countdown)
    }
  }, [resetTimer])

  // Función para manejar el toggle de días completados
  const toggleDayCompleted = (day: string) => {
    setCompletedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }))
  }

  // Función para formatear el tiempo del countdown
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Calcular progreso basado en objetivo
  const getProgressStats = () => {
    const completedCount = Object.values(completedDays).filter(Boolean).length
    const totalDays = 7
    const completionPercentage = Math.round((completedCount / totalDays) * 100)
    
    // Determinar objetivo basado en BMI si está disponible
    let targetDays = 5 // Objetivo por defecto
    if (userData.weight && userData.height && userData.age) {
      const bmi = userData.weight / Math.pow(userData.height / 100, 2)
      if (bmi < 18.5) {
        targetDays = 4 // Ganar masa - menos cardio
      } else if (bmi > 25) {
        targetDays = 6 // Perder peso - más entrenamiento
      } else {
        targetDays = 5 // Mantenimiento
      }
    }

    return {
      completedCount,
      totalDays,
      targetDays,
      completionPercentage,
      isOnTrack: completedCount >= targetDays
    }
  }

  // Datos detallados de cada día de entrenamiento
  const weeklyWorkoutData = {
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
          description: "Acostado en banco, abre los brazos con mancuernas hasta sentir el estiramiento",
          equipment: "Banco plano + mancuernas"
        },
        {
          name: "Fondos en paralelas",
          sets: 3,
          reps: "8-12",
          rest: "2 min",
          description: "Suspéndete en las barras paralelas y baja el cuerpo flexionando los brazos",
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

  const quickActions = [
    {
      id: "routine",
      title: "Crear Rutina",
      description: "Diseña una rutina personalizada",
      icon: <Target className="h-5 w-5" />,
      prompt: "Quiero crear una rutina de ejercicios personalizada"
    },
    {
      id: "75hard",
      title: "75 Hard Challenge",
      description: "75 días de disciplina extrema",
      icon: <Calendar className="h-5 w-5" />,
      prompt: "Quiero empezar el 75 Hard Challenge - 75 días de disciplina extrema"
    },
    {
      id: "30shred",
      title: "30 Day Shred",
      description: "Transformación en 30 días",
      icon: <Zap className="h-5 w-5" />,
      prompt: "Quiero empezar el 30 Day Shred - Transformación en 30 días"
    },
    {
      id: "nutrition",
      title: "Consejos Nutrición",
      description: "Obtén tips de alimentación",
      icon: <Dumbbell className="h-5 w-5" />,
      prompt: "Dame consejos de nutrición para mi entrenamiento"
    }
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simular respuesta del AI
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: "ai",
        content: generateAIResponse(input),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  // Función para verificar si la pregunta es sobre fitness/gym
  const isFitnessRelated = (input: string): boolean => {
    const fitnessKeywords = [
      'ejercicio', 'entrenar', 'gym', 'gimnasio', 'pesas', 'cardio', 'rutina', 'musculo', 'músculo',
      'fuerza', 'resistencia', 'flexibilidad', 'peso', 'adelgazar', 'engordar', 'definir', 'volumen',
      'suplementos', 'creatina',
      'sentadilla', 'squats', 'press', 'dominadas', 'pull ups', 'flexiones', 'plancha', 'burpees', 'squat', 'deadlift',
      'bench', 'curl', 'extension', 'pulldown', 'row', 'shoulder', 'tricep', 'bicep', 'core',
      'abdomen', 'abdominales', 'espalda', 'pecho', 'hombros', 'brazos', 'piernas', 'glúteos',
      'fitness', 'workout', 'training', 'bodybuilding', 'crossfit', 'yoga', 'pilates', 'spinning',
      'motivación', 'motivar', 'desánimo', 'cansado', 'flojo', 'perezoso', 'lesión', 'dolor', 
      'lastimado', 'molestia', 'injury', 'técnica', 'forma', 'repeticiones', 'series', 'kg', 'kilos',
      'estatura', 'altura', 'edad', 'años', 'foto', 'cuerpo', 'análisis', 'bmi', 'índice',
      'mantener', 'mantenimiento', 'estable', 'no cambiar', 'como estoy',
      'duda', 'pregunta', 'ayuda', 'no sé', 'cómo', 'qué', 'explícame', 'enseña', 'técnicas', 'planes',
      'cálculos', 'estrategias', 'principiante', 'intermedio', 'avanzado', 'nivel', 'experiencia',
      'objetivo', 'meta', 'resultado', 'progreso', 'mejorar', 'cambiar', 'transformar', 'salud',
      'bienestar', 'actividad', 'deporte', 'deportista', 'atleta', 'hipertrofia', 'cutting', 'bulking',
      'masa', 'ganar', 'perder', 'adelgazar', 'bajar', 'quemar', 'grasa', 'definir', 'mantener',
      'primera vez', 'principiante', 'nunca he ido', 'nuevo', 'empezar', 'comenzar', 'máquina', 'maquina',
      'aparato', 'equipo', 'cómo usar', 'como usar', 'peso', 'carga', 'cuánto peso', 'cuanto peso',
      'kg', 'kilos', 'pesas', 'discos', 'press banca', 'leg press', 'pulldown', 'lat pulldown',
      'smith', 'hack squat', 'prensa', 'extensión', 'curl', 'press', 'remo', 'tirón',
      'crear rutina', 'nueva rutina', 'plan de entrenamiento', 'rutina personalizada', 'entrenamiento personalizado',
      'motivación para entrenar', 'motivar para entrenar', 'necesito motivación', 'motivación hoy',
      'motivación para el gym', 'motivar para el gym', 'motivación para ir al gym'
    ]
    
    const lowerInput = input.toLowerCase()
    return fitnessKeywords.some(keyword => lowerInput.includes(keyword))
  }

  // Función para generar rutina personalizada con datos específicos
  const generatePersonalizedRoutineWithData = (data: UserData): string => {
    const currentWeight = data.weight
    const currentHeight = data.height
    const currentAge = data.age

    if (!currentWeight || !currentHeight || !currentAge) {
      return "Primero necesito que completes tus datos básicos (peso, estatura, edad) para poder crear una rutina personalizada."
    }

    const bmi = currentWeight / Math.pow(currentHeight / 100, 2)
    let routine = ""

    // Análisis personalizado basado en BMI y edad
    routine += `🎯 **RUTINA PERSONALIZADA PARA TI**\n\n`
    routine += `📊 **Tu Perfil:**\n`
    routine += `• Peso: ${currentWeight} kg\n`
    routine += `• Estatura: ${currentHeight} cm\n`
    routine += `• Edad: ${currentAge} años\n`
    routine += `• BMI: ${bmi.toFixed(1)}\n\n`

    if (bmi < 18.5) {
      routine += "📈 **OBJETIVO: GANAR MASA MUSCULAR**\n"
      routine += "Basándome en tu BMI (bajo peso), te recomiendo:\n\n"
      
      routine += "**🏋️‍♂️ DÍA 1 - TREN SUPERIOR**\n"
      routine += "• Press banca: 4 series x 8-10 reps\n"
      routine += "• Dominadas: 4 series x 6-8 reps\n"
      routine += "• Press militar: 3 series x 8-10 reps\n"
      routine += "• Curl bíceps: 3 series x 10-12 reps\n\n"
      
      routine += "**🏋️‍♂️ DÍA 2 - TREN INFERIOR**\n"
      routine += "• Sentadillas: 4 series x 8-10 reps\n"
      routine += "• Peso muerto: 4 series x 6-8 reps\n"
      routine += "• Prensa: 3 series x 10-12 reps\n"
      routine += "• Gemelos: 4 series x 15-20 reps\n\n"
      
    } else if (bmi > 25) {
      routine += "🔥 **OBJETIVO: PERDER PESO**\n"
      routine += "Basándome en tu BMI (sobrepeso), te recomiendo:\n\n"
      
      routine += "**🏃‍♂️ DÍA 1 - CARDIO + FUERZA**\n"
      routine += "• 20 min cardio moderado (cinta, bici)\n"
      routine += "• Sentadillas: 4 series x 15-20 reps\n"
      routine += "• Flexiones: 3 series x 10-15 reps\n"
      routine += "• Plancha: 3 series x 30-45 seg\n"
      routine += "• Burpees: 3 series x 8-12 reps\n\n"
      
      routine += "**🏃‍♂️ DÍA 2 - HIIT + CORE**\n"
      routine += "• 15 min HIIT (30 seg trabajo, 30 seg descanso)\n"
      routine += "• Mountain climbers: 3 series x 20 reps\n"
      routine += "• Russian twists: 3 series x 20 reps\n"
      routine += "• Leg raises: 3 series x 15 reps\n\n"
      
    } else {
      routine += "💪 **OBJETIVO: MANTENIMIENTO Y DEFINICIÓN**\n"
      routine += "Basándome en tu BMI (normal), te recomiendo:\n\n"
      
      routine += "**🏋️‍♂️ DÍA 1 - TREN SUPERIOR**\n"
      routine += "• Press banca: 3 series x 10-12 reps\n"
      routine += "• Remo con barra: 3 series x 10-12 reps\n"
      routine += "• Press hombros: 3 series x 10-12 reps\n"
      routine += "• Curl bíceps: 3 series x 12-15 reps\n"
      routine += "• Tríceps: 3 series x 12-15 reps\n\n"
      
      routine += "**🏋️‍♂️ DÍA 2 - TREN INFERIOR**\n"
      routine += "• Sentadillas: 3 series x 12-15 reps\n"
      routine += "• Zancadas: 3 series x 12 cada pierna\n"
      routine += "• Hip thrust: 3 series x 12-15 reps\n"
      routine += "• Calf raises: 4 series x 15-20 reps\n\n"
    }


    // Recomendaciones específicas por edad
    if (currentAge < 25) {
      routine += `🎯 **RECOMENDACIONES PARA TU EDAD (${currentAge} años)**\n`
      routine += "• Puedes entrenar con mayor intensidad\n"
      routine += "• Recuperación más rápida entre sesiones\n"
      routine += "• Enfoque en técnica y progresión\n\n"
    } else if (currentAge > 40) {
      routine += `🎯 **RECOMENDACIONES PARA TU EDAD (${currentAge} años)**\n`
      routine += "• Calentamiento más extenso (10-15 min)\n"
      routine += "• Enfoque en movilidad y flexibilidad\n"
      routine += "• Descanso adecuado entre series\n\n"
    }

    routine += "📅 **FRECUENCIA:** 4-5 días por semana\n"
    routine += "⏱️ **DURACIÓN:** 60-90 minutos por sesión\n"
    routine += "🎯 **PROGRESIÓN:** Aumenta peso cada 2 semanas\n\n"
    routine += "💪 **¡Tu rutina personalizada está lista!**"

    return routine
  }

  // Función para generar rutina personalizada (usa el estado actual)
  const generatePersonalizedRoutine = (): string => {
    return generatePersonalizedRoutineWithData(userData)
  }

  // Función para extraer datos del usuario del texto
  const extractUserData = (input: string): { weight?: number, height?: number, age?: number } => {
    const data: { weight?: number, height?: number, age?: number } = {}
    
    // Extraer peso - patrones más flexibles
    const weightPatterns = [
      /peso\s*(\d+)/i,
      /(\d+)\s*kilos?/i,
      /(\d+)\s*kg/i,
      /peso\s*(\d+)\s*kilos?/i,
      /peso\s*(\d+)\s*kg/i
    ]
    
    for (const pattern of weightPatterns) {
      const match = input.match(pattern)
      if (match) {
        data.weight = parseInt(match[1])
        break
      }
    }
    
    // Extraer estatura - patrones más flexibles
    const heightPatterns = [
      /mido\s*(\d+)/i,
      /(\d+)\s*cm/i,
      /(\d+)\s*centímetros?/i,
      /estatura\s*(\d+)/i,
      /altura\s*(\d+)/i,
      /mido\s*(\d+)\s*cm/i
    ]
    
    for (const pattern of heightPatterns) {
      const match = input.match(pattern)
      if (match) {
        data.height = parseInt(match[1])
        break
      }
    }
    
    // Extraer edad - patrones más flexibles
    const agePatterns = [
      /tengo\s*(\d+)/i,
      /(\d+)\s*años?/i,
      /edad\s*(\d+)/i,
      /tengo\s*(\d+)\s*años?/i,
      /edad\s*(\d+)\s*años?/i
    ]
    
    for (const pattern of agePatterns) {
      const match = input.match(pattern)
      if (match) {
        data.age = parseInt(match[1])
        break
      }
    }
    
    return data
  }

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    // Extraer datos del usuario si están en el mensaje
    const extractedData = extractUserData(userInput)
    console.log('Extracted data:', extractedData)
    console.log('User input:', userInput)
    
    if (extractedData.weight || extractedData.height || extractedData.age) {
      // Actualizar datos del usuario inmediatamente
      const newUserData = {
        ...userData,
        ...(extractedData.weight && { weight: extractedData.weight }),
        ...(extractedData.height && { height: extractedData.height }),
        ...(extractedData.age && { age: extractedData.age })
      }
      
      console.log('New user data:', newUserData)
      
      // Actualizar el estado
      setUserData(newUserData)
      
      // Generar rutina personalizada con los datos actualizados
      return generatePersonalizedRoutineWithData(newUserData)
    }

    // Respuestas específicas para confirmaciones y respuestas cortas
    if (lowerInput === 'si' || lowerInput === 'sí' || lowerInput === 'yes' || lowerInput === 'ok' || lowerInput === 'okay') {
      // Verificar el contexto del último mensaje del AI
      const lastAIMessage = messages.filter(msg => msg.type === 'ai').pop()
      if (lastAIMessage) {
        const lastContent = lastAIMessage.content.toLowerCase()
        
        if (lastContent.includes('motivación') || lastContent.includes('motivar')) {
          return `¡Perfecto! 💪 Te voy a crear un plan de motivación personalizado para ti.\n\n**🔥 PLAN DE MOTIVACIÓN PERSONALIZADO:**\n\n**📅 ESTRUCTURA SEMANAL:**\n• **Lunes:** Día de metas - Establece 3 objetivos pequeños\n• **Miércoles:** Día de progreso - Revisa tus avances\n• **Viernes:** Día de celebración - Recompénsate por tus logros\n• **Domingo:** Día de reflexión - Evalúa la semana\n\n**💪 TÉCNICAS MOTIVACIONALES:**\n• 🎯 **Regla del 2%:** Mejora solo 2% cada día\n• 📱 **Tracking diario:** Anota 1 logro por día\n• 🎵 **Playlist energética:** 3 canciones que te motiven\n• 📸 **Fotos de progreso:** 1 foto cada 3 días\n• 👥 **Compañero de entrenamiento:** Busca un partner\n\n**🧠 MINDSET DIARIO:**\n• Mañana: "Hoy voy a ser mejor que ayer"\n• Tarde: "Estoy más fuerte que hace 1 hora"\n• Noche: "Mañana seré mejor que hoy"\n\n**🎯 RETO DE 7 DÍAS:**\nCada día haz 1 cosa que te acerque a tu objetivo. ¿Empezamos hoy?`
        }
        
        if (lastContent.includes('rutina') || lastContent.includes('ejercicio')) {
          if (userData.weight && userData.height && userData.age) {
            return generatePersonalizedRoutine()
          } else {
            return `¡Excelente! 💪 Para crear tu rutina personalizada, necesito algunos datos básicos.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n\nCon esta información podré diseñar un plan 100% adaptado a ti. ¿Te parece bien?`
          }
        }
        
        if (lastContent.includes('peso') || lastContent.includes('adelgazar')) {
          if (userData.weight && userData.height && userData.age) {
            return generatePersonalizedRoutine()
          } else {
            return `¡Perfecto! 🔥 Para tu plan de pérdida de peso, necesito conocer tu perfil físico.\n\n📊 **¿Podrías decirme?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n\nCon estos datos podré crear un plan específico para ti. ¿Empezamos?`
          }
        }
      }
      
      return `¡Perfecto! 😊 ¿En qué más puedo ayudarte? Puedo ayudarte con rutinas, motivación, técnicas de ejercicios o cualquier duda sobre fitness.`
    }

    // Respuestas amigables para saludos
    if (lowerInput.includes('hola') || lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('buenos días') || lowerInput.includes('buenas tardes') || lowerInput.includes('buenas noches')) {
      if (userData.weight && userData.height && userData.age) {
        return `¡Hola! 👋 Me da mucho gusto saludarte. Veo que ya tienes tus datos personales completos (Peso: ${userData.weight}kg, Estatura: ${userData.height}cm, Edad: ${userData.age} años). ¡Perfecto! 🎉\n\n🎯 **¿En qué puedo ayudarte hoy?**\n\n• 💪 **Crear una rutina personalizada** - Basada en tus datos físicos\n• 🏃‍♂️ **Plan de pérdida de peso** - Cardio y fuerza\n• 💪 **Ganar masa muscular** - Hipertrofia y fuerza\n• 📸 **Análisis corporal** - Sube una foto para evaluación\n• 🎯 **20 Day Challenge** - Reto personalizado\n• 🏋️‍♂️ **Técnicas de ejercicios** - Aprende la forma correcta\n\n¿Cuál de estas opciones te interesa más?`
      } else {
        return `¡Hola! 👋 Me da mucho gusto saludarte. Soy tu Gym Coach AI personalizado y estoy aquí para ayudarte a alcanzar tus objetivos fitness.\n\n🎯 **¿En qué puedo ayudarte hoy?**\n\n• 💪 **Crear una rutina personalizada** - Basada en tus datos físicos\n• 🏃‍♂️ **Plan de pérdida de peso** - Cardio y fuerza\n• 💪 **Ganar masa muscular** - Hipertrofia y fuerza\n• 📸 **Análisis corporal** - Sube una foto para evaluación\n• 🎯 **20 Day Challenge** - Reto personalizado\n• 🏋️‍♂️ **Técnicas de ejercicios** - Aprende la forma correcta\n\n¿Cuál de estas opciones te interesa más?`
      }
    }

    // Respuestas para preguntas generales
    if (lowerInput.includes('cómo estás') || lowerInput.includes('qué tal') || lowerInput.includes('cómo te va')) {
      return `¡Excelente! 😊 Estoy muy bien y listo para ayudarte con tu fitness. Me encanta trabajar con personas que quieren mejorar su salud y condición física.\n\n¿Hay algo específico en lo que pueda ayudarte hoy? Puedo crear rutinas, enseñar técnicas de ejercicios o ayudarte con cualquier duda sobre entrenamiento.`
    }

    // Respuestas para preguntas sobre qué puede hacer
    if (lowerInput.includes('qué puedes hacer') || lowerInput.includes('qué haces') || lowerInput.includes('ayudar') || lowerInput.includes('funciones')) {
      return `¡Genial pregunta! 🚀 Como tu Gym Coach AI, puedo ayudarte con:\n\n**🏋️‍♂️ ENTRENAMIENTO:**\n• Crear rutinas personalizadas según tu peso, estatura y edad\n• Diseñar planes de pérdida de peso o ganancia muscular\n• Adaptar ejercicios a tu nivel de experiencia\n• Crear retos de 20 días personalizados\n• Enseñar técnicas correctas de ejercicios\n\n**📊 ANÁLISIS:**\n• Evaluar tu composición corporal con foto\n• Calcular tu BMI y estado físico\n• Recomendar intensidad de entrenamiento\n• Progresión de pesos y repeticiones\n\n**💪 MOTIVACIÓN:**\n• Consejos para mantener la disciplina\n• Estrategias para superar el desánimo\n• Planes de seguimiento de progreso\n\n¿Con cuál de estas áreas te gustaría empezar?`
    }

    // Verificar si es sobre fitness
    if (!isFitnessRelated(userInput)) {
      return `¡Hola! 😊 Me da mucho gusto que me escribas. Aunque me encanta conversar contigo, me especializo únicamente en temas de fitness, gimnasio y ejercicios.\n\n🎯 **¿En qué puedo ayudarte con tu fitness?**\n\n• 💪 Crear una rutina personalizada\n• 🏃‍♂️ Plan para perder peso\n• 💪 Ganar masa muscular\n• 🏋️‍♂️ Técnicas de ejercicios\n• 📸 Análisis de tu composición corporal\n\n¿Hay algo específico sobre tu entrenamiento en lo que pueda ayudarte?`
    }


    // Respuestas para despedidas
    if (lowerInput.includes('adiós') || lowerInput.includes('bye') || lowerInput.includes('hasta luego') || lowerInput.includes('nos vemos')) {
      return `¡Hasta luego! 👋 Ha sido un placer ayudarte. Recuerda que estoy aquí siempre que necesites consejos de fitness, rutinas personalizadas o motivación.\n\n💪 **¡Sigue entrenando y alcanzando tus objetivos!**\n\n¡Nos vemos pronto!`
    }

    // Respuestas para cuando el usuario está satisfecho con la rutina
    if (lowerInput.includes('me gusta') || lowerInput.includes('me encanta') || lowerInput.includes('está genial') ||
        lowerInput.includes('perfecto') || lowerInput.includes('excelente') || lowerInput.includes('muy bien') ||
        lowerInput.includes('gracias') || lowerInput.includes('thanks') || lowerInput.includes('thank you') ||
        lowerInput.includes('ok') || lowerInput.includes('okay') || lowerInput.includes('genial') ||
        lowerInput.includes('bueno') || lowerInput.includes('vale') || lowerInput.includes('bien') ||
        lowerInput.includes('está bien') || lowerInput.includes('muchas gracias') || 
        lowerInput.includes('thank you so much') || lowerInput.includes('te agradezco') ||
        lowerInput.includes('mil gracias') || lowerInput.includes('gracias por todo') ||
        lowerInput.includes('se agradece') || lowerInput.includes('appreciate it') ||
        lowerInput.includes('thanks a lot') || lowerInput.includes('thank you very much')) {
      return `¡Me alegra que te guste! 🎉 ¡Estoy aquí para lo que necesites! 💪`
    }

    // Respuestas para motivación (prioridad alta)
    if (lowerInput.includes('motivación') || lowerInput.includes('motivar') || lowerInput.includes('desánimo') || 
        lowerInput.includes('cansado') || lowerInput.includes('flojo') || lowerInput.includes('perezoso') ||
        lowerInput.includes('motivación para entrenar') || lowerInput.includes('motivar para entrenar') ||
        lowerInput.includes('necesito motivación') || lowerInput.includes('motivación hoy') ||
        lowerInput.includes('motivación para el gym') || lowerInput.includes('motivar para el gym')) {
      return `¡Entiendo perfectamente! 💪 Todos pasamos por momentos difíciles. Te voy a ayudar a recuperar esa motivación.\n\n**🔥 CONSEJOS PARA MOTIVARTE:**\n• 🎯 Establece metas pequeñas y alcanzables\n• 📱 Haz seguimiento de tu progreso\n• 👥 Entrena con un compañero\n• 🎵 Crea una playlist motivacional\n• 📸 Toma fotos de tu progreso\n\n**💪 RECUERDA:**\n"La disciplina es el puente entre tus metas y tus logros."\n\n¿Quieres que creemos un plan específico para mantener tu motivación?`
    }

    // Respuestas para preguntas específicas sobre planes
    if (lowerInput.includes('plan') || lowerInput.includes('plán') || lowerInput.includes('programa')) {
      if (lowerInput.includes('motivación') || lowerInput.includes('motivar')) {
        return `¡Perfecto! 💪 Te voy a crear un plan de motivación personalizado para ti.\n\n**🔥 PLAN DE MOTIVACIÓN PERSONALIZADO:**\n\n**📅 ESTRUCTURA SEMANAL:**\n• **Lunes:** Día de metas - Establece 3 objetivos pequeños\n• **Miércoles:** Día de progreso - Revisa tus avances\n• **Viernes:** Día de celebración - Recompénsate por tus logros\n• **Domingo:** Día de reflexión - Evalúa la semana\n\n**💪 TÉCNICAS MOTIVACIONALES:**\n• 🎯 **Regla del 2%:** Mejora solo 2% cada día\n• 📱 **Tracking diario:** Anota 1 logro por día\n• 🎵 **Playlist energética:** 3 canciones que te motiven\n• 📸 **Fotos de progreso:** 1 foto cada 3 días\n• 👥 **Compañero de entrenamiento:** Busca un partner\n\n**🧠 MINDSET DIARIO:**\n• Mañana: "Hoy voy a ser mejor que ayer"\n• Tarde: "Estoy más fuerte que hace 1 hora"\n• Noche: "Mañana seré mejor que hoy"\n\n**🎯 RETO DE 7 DÍAS:**\nCada día haz 1 cosa que te acerque a tu objetivo. ¿Empezamos hoy?`
      }
      
      if (lowerInput.includes('entrenamiento') || lowerInput.includes('ejercicio') || lowerInput.includes('rutina')) {
        if (userData.weight && userData.height && userData.age) {
          return generatePersonalizedRoutine()
        } else {
          return `¡Excelente! 💪 Para crear tu plan de entrenamiento personalizado, necesito algunos datos básicos.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n\nCon esta información podré diseñar un plan 100% adaptado a ti. ¿Te parece bien?`
        }
      }
      
      return `¡Perfecto! 📋 Puedo ayudarte a crear diferentes tipos de planes:\n\n• 💪 **Plan de entrenamiento** - Rutinas personalizadas\n• 🔥 **Plan de motivación** - Estrategias para mantenerte motivado\n• 🏃‍♂️ **Plan de pérdida de peso** - Cardio y fuerza\n• 💪 **Plan de ganancia muscular** - Hipertrofia\n• 🎯 **Plan de 20 días** - Reto personalizado\n\n¿Qué tipo de plan te interesa más?`
    }

    // Respuestas específicas para retos populares
    if (lowerInput.includes('75 hard challenge') || lowerInput.includes('75 hard') || lowerInput.includes('75 días')) {
      return `¡EXCELENTE! 🔥 El 75 Hard Challenge es uno de los retos más intensos y transformadores que existen. Te explico todo:\n\n**💪 ¿QUÉ ES EL 75 HARD?**\nEs un reto de 75 días de disciplina extrema que transforma tu mentalidad y cuerpo.\n\n**📋 REGLAS OBLIGATORIAS (75 DÍAS CONSECUTIVOS):**\n• 🏃‍♂️ **2 entrenamientos de 45 min** (separados por 3+ horas)\n• 📖 **Leer 10 páginas** de un libro de desarrollo personal\n• 📸 **1 foto de progreso** diaria\n• 💧 **1 galón de agua** (3.8 litros)\n• 🥗 **Dieta estricta** (sin cheat meals)\n• 📱 **Sin alcohol** durante todo el reto\n\n**⚠️ IMPORTANTE:**\n• Si fallas 1 día, EMPIEZAS DE NUEVO desde el día 1\n• No hay excusas, no hay excepciones\n• Es un reto mental más que físico\n\n**🎯 BENEFICIOS:**\n• Disciplina extrema\n• Confianza inquebrantable\n• Transformación física\n• Mentalidad de acero\n\n¿Estás listo para el reto más difícil de tu vida? 💪`
    }

    if (lowerInput.includes('30 day shred') || lowerInput.includes('30 shred') || lowerInput.includes('transformación en 30 días')) {
      return `¡PERFECTO! ⚡ El 30 Day Shred es ideal para una transformación rápida y efectiva. Te explico todo:\n\n**🔥 ¿QUÉ ES EL 30 DAY SHRED?**\nUn programa de 30 días diseñado para quemar grasa, tonificar músculos y transformar tu cuerpo.\n\n**📅 ESTRUCTURA DEL PROGRAMA:**\n• **Días 1-10:** Fase de adaptación (cardio + fuerza básica)\n• **Días 11-20:** Fase de intensificación (HIIT + pesas)\n• **Días 21-30:** Fase de definición (circuitos + cardio intenso)\n\n**💪 RUTINA DIARIA (45-60 min):**\n• 🏃‍♂️ **Cardio:** 20-30 min (cinta, elíptica, bicicleta)\n• 🏋️‍♂️ **Fuerza:** 20-25 min (circuitos de 3-4 ejercicios)\n• 🧘‍♀️ **Estiramientos:** 5-10 min\n\n**🥗 PLAN NUTRICIONAL:**\n• **Desayuno:** Proteína + carbohidratos complejos\n• **Almuerzo:** Proteína + vegetales + grasa saludable\n• **Cena:** Proteína + vegetales\n• **Snacks:** Frutas, nueces, yogurt griego\n\n**📊 PROGRESIÓN SEMANAL:**\n• **Semana 1:** Adaptación (intensidad 60%)\n• **Semana 2:** Intensificación (intensidad 75%)\n• **Semana 3:** Máximo esfuerzo (intensidad 90%)\n• **Semana 4:** Definición final (intensidad 100%)\n\n**🎯 RESULTADOS ESPERADOS:**\n• Pérdida de 3-5 kg de grasa\n• Tonificación muscular visible\n• Aumento de energía\n• Mejora de resistencia\n\n¿Estás listo para tu transformación de 30 días? 💪`
    }

    // Respuestas específicas basadas en el input
    if (lowerInput.includes('rutina') || lowerInput.includes('ejercicio') || lowerInput.includes('entrenar') ||
        lowerInput.includes('crear rutina') || lowerInput.includes('nueva rutina') || lowerInput.includes('plan de entrenamiento')) {
      if (userData.weight && userData.height && userData.age) {
        // Usuario ya tiene datos, generar rutina automáticamente
        return generatePersonalizedRoutine()
      } else {
        return `¡Perfecto! Me encanta que quieras empezar una rutina. 💪 Para crear la rutina perfecta para ti, necesito conocer algunos datos básicos.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré diseñar un plan 100% personalizado para tus objetivos. ¿Te parece bien?`
      }
    }

    if (lowerInput.includes('peso') || lowerInput.includes('adelgazar') || lowerInput.includes('perder')) {
      if (userData.weight && userData.height && userData.age) {
        // Usuario ya tiene datos, generar rutina de pérdida de peso automáticamente
        return generatePersonalizedRoutine()
      } else {
        return `¡Excelente objetivo! 🔥 Perder peso de forma saludable es una meta muy importante. Para ayudarte de la mejor manera, necesito conocer tu perfil físico.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré crear un plan personalizado que incluya:\n• 🏃‍♂️ Rutina de cardio y fuerza\n• 🥗 Plan nutricional específico\n• 📅 Cronograma de entrenamiento\n• 🎯 Metas realistas y alcanzables\n\n¿Te parece bien empezar con estos datos?`
      }
    }

    if (lowerInput.includes('masa') || lowerInput.includes('muscular') || lowerInput.includes('ganar')) {
      if (userData.weight && userData.height && userData.age) {
        // Usuario ya tiene datos, generar rutina de ganancia muscular automáticamente
        return generatePersonalizedRoutine()
      } else {
        return `¡Fantástico! 💪 Ganar masa muscular es un objetivo increíble. Me encanta ayudarte a construir un cuerpo más fuerte y definido.\n\n📊 **Para crear tu plan de hipertrofia, necesito:**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Tu nivel de experiencia (principiante/intermedio/avanzado)\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré diseñar:\n• 🏋️‍♂️ Rutina de fuerza e hipertrofia\n• 🥩 Plan nutricional para ganancia muscular\n• 📈 Progresión de pesos y repeticiones\n• 🎯 Ejercicios específicos para tus objetivos\n\n¿Empezamos con tus datos básicos?`
      }
    }


    // Respuestas para ejercicios específicos
    if (lowerInput.includes('sentadillas') || lowerInput.includes('squats')) {
      return `¡Excelente ejercicio! 🦵 Las sentadillas son fundamentales para el desarrollo de las piernas.\n\n**💪 TÉCNICA CORRECTA:**\n• Pies al ancho de hombros\n• Baja como si te sentaras en una silla\n• Mantén la espalda recta\n• Empuja con los talones al subir\n\n**📊 PROGRESIÓN:**\n• Principiante: 3 series x 10-15 reps\n• Intermedio: 4 series x 12-20 reps\n• Avanzado: 5 series x 15-25 reps\n\n¿Quieres que te ayude con más ejercicios de piernas?`
    }

    if (lowerInput.includes('press banca') || lowerInput.includes('bench press') || lowerInput.includes('pecho')) {
      return `¡Genial! 💪 El press banca es el rey de los ejercicios de pecho.\n\n**💪 TÉCNICA CORRECTA:**\n• Acostado en banco plano\n• Agarre ligeramente más ancho que los hombros\n• Baja la barra hasta el pecho\n• Empuja hacia arriba con control\n\n**📊 PROGRESIÓN:**\n• Principiante: 3 series x 8-10 reps\n• Intermedio: 4 series x 6-8 reps\n• Avanzado: 5 series x 4-6 reps\n\n¿Te interesa saber sobre otros ejercicios de pecho?`
    }

    if (lowerInput.includes('dominadas') || lowerInput.includes('pull ups') || lowerInput.includes('espalda')) {
      return `¡Perfecto! 🏋️ Las dominadas son excelentes para la espalda.\n\n**💪 TÉCNICA CORRECTA:**\n• Agarre más ancho que los hombros\n• Cuelga completamente estirado\n• Tira hacia arriba hasta que el mentón pase la barra\n• Baja con control\n\n**📊 PROGRESIÓN:**\n• Principiante: 3 series x 3-5 reps\n• Intermedio: 4 series x 6-8 reps\n• Avanzado: 5 series x 8-12 reps\n\n¿Quieres más ejercicios de espalda?`
    }


    // Respuestas para lesiones
    if (lowerInput.includes('lesión') || lowerInput.includes('dolor') || lowerInput.includes('lastimado') || 
        lowerInput.includes('molestia') || lowerInput.includes('injury')) {
      return `⚠️ **IMPORTANTE:** Si tienes una lesión, te recomiendo consultar con un médico o fisioterapeuta antes de continuar entrenando.\n\n**🩺 MIENTRAS TANTO:**\n• 🧘‍♂️ Enfócate en ejercicios de movilidad\n• 🏃‍♂️ Mantén el cardio de bajo impacto\n• 💪 Trabaja otras partes del cuerpo\n• 🥗 Mantén una buena nutrición\n\n**💡 CONSEJO:**\nLa prevención es mejor que la curación. Siempre calienta bien y usa la técnica correcta.\n\n¿Hay alguna zona específica que te molesta?`
    }

    // Respuestas para principiantes
    if (lowerInput.includes('primera vez') || lowerInput.includes('principiante') || lowerInput.includes('nunca he ido') || 
        lowerInput.includes('nuevo') || lowerInput.includes('empezar') || lowerInput.includes('comenzar')) {
      return `¡Excelente! 🎉 Me encanta que quieras empezar en el gimnasio. Te voy a ayudar a dar tus primeros pasos de manera segura y efectiva.\n\n**🏋️‍♂️ GUÍA PARA PRINCIPIANTES:**\n\n**📋 ANTES DE EMPEZAR:**\n• 🎯 Establece objetivos realistas\n• 📅 Planifica 2-3 días por semana\n• ⏰ Sesiones de 30-45 minutos\n• 💧 Hidrátate bien\n\n**💪 PRIMEROS EJERCICIOS:**\n• Sentadillas (sin peso)\n• Flexiones (en rodillas si es necesario)\n• Plancha (10-30 segundos)\n• Caminar en cinta\n\n**⚠️ CONSEJOS IMPORTANTES:**\n• Siempre calienta 5-10 minutos\n• Aprende la técnica antes de agregar peso\n• No te compares con otros\n• Escucha a tu cuerpo\n\n¿Te gustaría que te enseñe cómo usar alguna máquina específica?`
    }

    // Respuestas específicas para máquinas comunes
    if (lowerInput.includes('press banca') || lowerInput.includes('bench press')) {
      return `¡Excelente! 💪 El press banca es fundamental para el pecho. Te explico cómo usarlo correctamente:\n\n**🏋️‍♂️ PRESS BANCA (MÁQUINA):**\n• Siéntate con la espalda recta contra el respaldo\n• Agarra las manijas al ancho de los hombros\n• Empuja hacia adelante con control\n• Regresa lentamente hasta el pecho\n• Mantén los hombros estables\n\n**💪 PRESS BANCA (BARRA):**\n• Acostado en banco plano\n• Agarre ligeramente más ancho que los hombros\n• Baja la barra hasta el pecho\n• Empuja hacia arriba con control\n• Mantén los pies en el suelo\n\n**⚠️ CONSEJOS IMPORTANTES:**\n• Comienza con peso ligero\n• Aprende la técnica antes de aumentar peso\n• No rebotes la barra en el pecho\n• Mantén la espalda recta\n\n¿Quieres saber sobre otros ejercicios de pecho?`
    }

    if (lowerInput.includes('leg press') || lowerInput.includes('prensa')) {
      return `¡Perfecto! 🦵 La leg press es excelente para las piernas. Te explico cómo usarla:\n\n**🦵 LEG PRESS:**\n• Siéntate con la espalda completamente apoyada\n• Coloca los pies al ancho de los hombros\n• Empuja las piernas hacia adelante\n• Flexiona las rodillas controladamente\n• Mantén los pies planos en la plataforma\n\n**⚠️ CONSEJOS DE SEGURIDAD:**\n• No bloquees las rodillas completamente\n• Mantén la espalda recta contra el respaldo\n• Comienza con peso ligero\n• Controla el movimiento en ambas direcciones\n\n**🎯 VARIACIONES:**\n• Pies altos: trabaja más glúteos\n• Pies bajos: trabaja más cuádriceps\n• Pies juntos: trabaja más la parte interna\n\n¿Te interesa saber sobre otros ejercicios de piernas?`
    }

    if (lowerInput.includes('pulldown') || lowerInput.includes('lat pulldown')) {
      return `¡Genial! 🏋️‍♂️ El pulldown es perfecto para la espalda. Te explico cómo usarlo:\n\n**🏋️‍♂️ PULLDOWN (LAT PULLDOWN):**\n• Siéntate con los muslos bajo las almohadillas\n• Agarra la barra más ancho que los hombros\n• Tira hacia abajo hasta el pecho\n• Regresa controladamente\n• Mantén el pecho hacia arriba\n\n**⚠️ CONSEJOS IMPORTANTES:**\n• No uses el impulso del cuerpo\n• Mantén los hombros hacia abajo\n• Controla el movimiento en ambas direcciones\n• Comienza con peso ligero\n\n**🎯 VARIACIONES:**\n• Agarre ancho: trabaja más la espalda\n• Agarre estrecho: trabaja más los bíceps\n• Agarre por detrás: variación avanzada\n\n¿Quieres saber sobre otros ejercicios de espalda?`
    }

    if (lowerInput.includes('smith') || lowerInput.includes('máquina smith')) {
      return `¡Excelente! 🏋️‍♂️ La máquina Smith es muy versátil y segura. Te explico cómo usarla:\n\n**🏋️‍♂️ MÁQUINA SMITH:**\n• Barra guiada que se mueve en un plano fijo\n• Más segura que la barra libre\n• Ideal para principiantes\n• Permite enfocarte en la técnica\n\n**💪 EJERCICIOS COMUNES:**\n• Sentadillas en Smith\n• Press banca en Smith\n• Remo en Smith\n• Press militar en Smith\n\n**⚠️ CONSEJOS IMPORTANTES:**\n• Ajusta la altura de la barra\n• Desbloquea la barra antes de empezar\n• Mantén la técnica correcta\n• Bloquea la barra al terminar\n\n**✅ VENTAJAS:**\n• Más segura para principiantes\n• Permite enfocarte en la técnica\n• Menos riesgo de lesión\n• Ideal para aprender movimientos\n\n¿Te interesa saber sobre algún ejercicio específico en Smith?`
    }

    // Respuestas para máquinas del gimnasio (genérica)
    if (lowerInput.includes('máquina') || lowerInput.includes('maquina') || lowerInput.includes('aparato') || 
        lowerInput.includes('equipo') || lowerInput.includes('cómo usar') || lowerInput.includes('como usar')) {
      return `¡Perfecto! 🏋️‍♂️ Te voy a enseñar cómo usar las máquinas más comunes del gimnasio de manera segura.\n\n**🔧 MÁQUINAS BÁSICAS:**\n\n**💪 PRESS BANCA (MÁQUINA):**\n• Siéntate con la espalda recta\n• Agarra las manijas al ancho de los hombros\n• Empuja hacia adelante con control\n• Regresa lentamente\n\n**🦵 LEG PRESS:**\n• Siéntate con la espalda apoyada\n• Coloca los pies al ancho de hombros\n• Empuja las piernas hacia adelante\n• Flexiona las rodillas controladamente\n\n**🏋️‍♂️ PULLDOWN (LAT PULLDOWN):**\n• Siéntate con los muslos bajo las almohadillas\n• Agarra la barra más ancho que los hombros\n• Tira hacia abajo hasta el pecho\n• Regresa controladamente\n\n**⚠️ CONSEJOS DE SEGURIDAD:**\n• Ajusta el asiento a tu altura\n• Comienza con peso ligero\n• Pide ayuda si no estás seguro\n• Mantén la técnica correcta\n\n¿Hay alguna máquina específica que te interese aprender?`
    }

    // Respuestas para pesos y cargas
    if (lowerInput.includes('peso') || lowerInput.includes('carga') || lowerInput.includes('cuánto peso') || 
        lowerInput.includes('cuanto peso') || lowerInput.includes('kg') || lowerInput.includes('kilos') ||
        lowerInput.includes('pesas') || lowerInput.includes('discos')) {
      return `¡Excelente pregunta! 🏋️‍♂️ Elegir el peso correcto es fundamental para progresar de manera segura.\n\n**📊 CÓMO ELEGIR EL PESO CORRECTO:**\n\n**🎯 REGLA GENERAL:**\n• Debes poder hacer 8-12 repeticiones con buena técnica\n• Las últimas 2-3 repeticiones deben ser difíciles\n• Si puedes hacer más de 15 reps, aumenta el peso\n• Si no puedes hacer 6 reps, reduce el peso\n\n**💪 POR TIPO DE EJERCICIO:**\n• **Ejercicios grandes:** 70-80% de tu máximo\n• **Ejercicios pequeños:** 60-70% de tu máximo\n• **Aislamiento:** 50-60% de tu máximo\n\n**📈 PROGRESIÓN:**\n• Semana 1-2: Aprende la técnica\n• Semana 3-4: Aumenta 2-5 kg\n• Cada mes: Revisa y ajusta\n\n**⚠️ SEÑALES DE PESO CORRECTO:**\n✅ Últimas reps son desafiantes pero controladas\n✅ Puedes mantener buena técnica\n✅ No sientes dolor en articulaciones\n❌ No puedes completar el rango de movimiento\n❌ Técnica se deteriora\n\n¿En qué ejercicio específico necesitas ayuda con el peso?`
    }

    // Respuestas para dudas o preguntas adicionales
    if (lowerInput.includes('duda') || lowerInput.includes('pregunta') || lowerInput.includes('ayuda') ||
        lowerInput.includes('no sé') || lowerInput.includes('cómo') || lowerInput.includes('qué') ||
        lowerInput.includes('explícame') || lowerInput.includes('enseña')) {
      return `¡Por supuesto! 😊 Pregúntame lo que necesites sobre fitness. Estoy aquí para ayudarte con:\n\n• 💪 Técnicas de ejercicios\n• 🏋️‍♂️ Rutinas de fuerza\n• 🎯 Estrategias de entrenamiento\n• 🏃‍♂️ Planes de cardio\n• 📊 Progresión de pesos\n• 💪 Ejercicios específicos\n• 🔧 Uso de máquinas\n• 🎯 Guías para principiantes\n\n¿Sobre qué tema específico te gustaría saber más?`
    }

    // Respuesta genérica para preguntas de fitness
    const fitnessResponses = [
      `¡Excelente pregunta! 😊 Me encanta que te enfoques en tu fitness. Para darte la mejor respuesta personalizada, necesito conocer algunos datos básicos.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré crear un plan 100% adaptado a ti. ¿Te parece bien?`,
      `¡Me encanta tu enfoque en la salud física! 💪 Para personalizar mi consejo y crear algo específico para ti, necesito conocer tu perfil.\n\n📊 **¿Podrías decirme?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nAsí podré darte recomendaciones exactas para tus objetivos. ¿Empezamos?`,
      `¡Genial pregunta sobre fitness! 🚀 Para ayudarte de la mejor manera y crear algo personalizado, necesito conocer tus datos básicos.\n\n📊 **¿Podrías compartir?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré diseñar un plan perfecto para ti. ¿Te parece bien?`
    ]
    
    return fitnessResponses[Math.floor(Math.random() * fitnessResponses.length)]
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
  }

  // Función para manejar la carga de foto
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPhotoPreview(result)
        setUserData(prev => ({ ...prev, photo: result }))
        
        // Enviar mensaje al chat sobre la foto
        const photoMessage = {
          id: Date.now(),
          type: "user" as const,
          content: `📸 He subido una foto de mi cuerpo para análisis`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, photoMessage])
        
        // Respuesta del AI sobre la foto
        setTimeout(() => {
          const aiResponse = {
            id: Date.now() + 1,
            type: "ai" as const,
            content: `¡Excelente! 📸 He recibido tu foto corporal. Estoy analizando tu composición corporal para crear recomendaciones más precisas.\n\nBasándome en tu imagen, puedo ver tu estructura física y adaptar mejor tu rutina. ¿Tienes algún objetivo específico en mente? ¿Perder peso, ganar masa muscular, o definir?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          setMessages(prev => [...prev, aiResponse])
        }, 1500)
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para actualizar datos del usuario
  const updateUserData = (field: keyof UserData, value: any) => {
    setUserData(prev => ({ ...prev, [field]: value }))
  }

  // Función para enviar datos del usuario
  const submitUserData = () => {
    if (userData.weight && userData.height && userData.age) {
      setIsSavingData(true)
      
      // Simular un pequeño delay para mostrar el estado de carga
      setTimeout(() => {
        // Mensaje de confirmación de datos
        const confirmationMessage = {
          id: Date.now(),
          type: "ai" as const,
          content: `¡Perfecto! He recibido tus datos:\n\n📊 **Tu Perfil:**\n• Peso: ${userData.weight} kg\n• Estatura: ${userData.height} cm\n• Edad: ${userData.age} años\n\n${userData.photo ? '📸 También he analizado tu foto corporal.\n\n' : ''}Ahora puedo crear rutinas 100% personalizadas para ti.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        
        // Generar rutina personalizada automáticamente
        const routineMessage = {
          id: Date.now() + 1,
          type: "ai" as const,
          content: generatePersonalizedRoutine(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        
        setMessages(prev => [...prev, confirmationMessage, routineMessage])
        setShowDataForm(false)
        setIsSavingData(false)
      }, 1000)
    }
  }

  // Función para verificar si el usuario está cerca del final del chat
  const isNearBottom = () => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (!messagesContainer) return true
    
    const { scrollTop, scrollHeight, clientHeight } = messagesContainer
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    return distanceFromBottom < 100 // Si está a menos de 100px del final
  }

  // Auto scroll solo si el usuario está cerca del final
  const scrollToBottom = () => {
    if (isNearBottom()) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    // Solo hacer scroll automático si el usuario está viendo los mensajes más recientes
    scrollToBottom()
  }, [messages, isTyping])

  // Listener para detectar scroll del usuario
  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentElement
    if (!messagesContainer) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight
      
      // Mostrar botón si no está cerca del final
      setShowScrollButton(distanceFromBottom > 100)
    }

    messagesContainer.addEventListener('scroll', handleScroll)
    return () => messagesContainer.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* User Avatar */}
      <div className="fixed top-6 right-6 z-50">
        <UserAvatar />
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Gym Coach AI</h1>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500 text-white text-xs">
                      <Crown className="h-3 w-3 mr-1" />
                      Premium Activo
                    </Badge>
                    <span className="text-xs text-muted-foreground">En línea</span>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur h-[600px] flex flex-col">
              <CardHeader className="border-b border-border/50 flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Chat con tu Coach
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tu entrenador personal AI está listo para ayudarte
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 min-h-0 relative">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 min-h-0">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-4 break-words ${
                          message.type === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {message.type === "ai" && (
                            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          {message.type === "user" && (
                            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm leading-relaxed break-words">{message.content}</p>
                            <p className="text-xs opacity-70 mt-2">{message.timestamp}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Floating scroll to bottom button */}
                {showScrollButton && (
                  <Button
                    onClick={() => {
                      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
                      setShowScrollButton(false)
                    }}
                    className="absolute bottom-20 right-4 z-10 rounded-full w-12 h-12 shadow-lg"
                    size="sm"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                )}

                {/* Input */}
                <div className="border-t border-border/50 p-4 flex-shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="chat-photo-upload"
                    />
                    <label htmlFor="chat-photo-upload">
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </label>
                    <Button type="submit" size="sm" className="gap-2">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Calendar */}
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur mt-8">
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
                  {/* Lunes */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-primary/10 transition-colors ${
                      completedDays.lunes ? 'bg-green-500/10 border-green-500/50' : 'bg-primary/5'
                    }`}
                    onClick={() => setSelectedDay("lunes")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="h-5 w-5 text-primary" />
                        <span className="font-semibold">LUNES</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("lunes")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.lunes 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-primary hover:bg-primary/10'
                        }`}
                      >
                        {completedDays.lunes && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">PECHO Y TRÍCEPS</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Press banca (máquina/barra)</div>
                      <div>• Aperturas con mancuernas</div>
                      <div>• Fondos en paralelas</div>
                      <div>• Extensión de tríceps</div>
                    </div>
                    <div className="mt-3 text-xs text-primary font-medium">
                      Click para ver detalles →
                    </div>
                  </div>

                  {/* Martes */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-accent/10 transition-colors ${
                      completedDays.martes ? 'bg-green-500/10 border-green-500/50' : 'bg-accent/5'
                    }`}
                    onClick={() => setSelectedDay("martes")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-accent" />
                        <span className="font-semibold">MARTES</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("martes")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.martes 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-accent hover:bg-accent/10'
                        }`}
                      >
                        {completedDays.martes && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">ESPALDA Y BÍCEPS</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Dominadas/Remo con barra</div>
                      <div>• Jalón al pecho (polea)</div>
                      <div>• Curl de bíceps</div>
                      <div>• Martillo con mancuernas</div>
                    </div>
                    <div className="mt-3 text-xs text-accent font-medium">
                      Click para ver detalles →
                    </div>
                  </div>

                  {/* Miércoles */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-green-500/10 transition-colors ${
                      completedDays.miércoles ? 'bg-green-500/10 border-green-500/50' : 'bg-green-500/5'
                    }`}
                    onClick={() => setSelectedDay("miércoles")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-green-500" />
                        <span className="font-semibold">MIÉRCOLES</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("miércoles")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.miércoles 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-green-500 hover:bg-green-500/10'
                        }`}
                      >
                        {completedDays.miércoles && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">PIERNAS</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Sentadillas (máquina/peso libre)</div>
                      <div>• Peso muerto</div>
                      <div>• Prensa de piernas</div>
                      <div>• Gemelos (máquina)</div>
                    </div>
                    <div className="mt-3 text-xs text-green-500 font-medium">
                      Click para ver detalles →
                    </div>
                  </div>

                  {/* Jueves */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-orange-500/10 transition-colors ${
                      completedDays.jueves ? 'bg-green-500/10 border-green-500/50' : 'bg-orange-500/5'
                    }`}
                    onClick={() => setSelectedDay("jueves")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-500" />
                        <span className="font-semibold">JUEVES</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("jueves")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.jueves 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-orange-500 hover:bg-orange-500/10'
                        }`}
                      >
                        {completedDays.jueves && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">HOMBROS Y CORE</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Press militar (máquina/barra)</div>
                      <div>• Elevaciones laterales</div>
                      <div>• Plancha abdominal</div>
                      <div>• Crunches y abdominales</div>
                    </div>
                    <div className="mt-3 text-xs text-orange-500 font-medium">
                      Click para ver detalles →
                    </div>
                  </div>

                  {/* Viernes */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-purple-500/10 transition-colors ${
                      completedDays.viernes ? 'bg-green-500/10 border-green-500/50' : 'bg-purple-500/5'
                    }`}
                    onClick={() => setSelectedDay("viernes")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-purple-500" />
                        <span className="font-semibold">VIERNES</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("viernes")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.viernes 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-purple-500 hover:bg-purple-500/10'
                        }`}
                      >
                        {completedDays.viernes && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">CARDIO Y FUNCIONAL</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• 30 min cardio (cinta/bici)</div>
                      <div>• Burpees y mountain climbers</div>
                      <div>• Circuito funcional</div>
                      <div>• Estiramientos</div>
                    </div>
                    <div className="mt-3 text-xs text-purple-500 font-medium">
                      Click para ver detalles →
                    </div>
                  </div>

                  {/* Sábado */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-blue-500/10 transition-colors ${
                      completedDays.sábado ? 'bg-green-500/10 border-green-500/50' : 'bg-blue-500/5'
                    }`}
                    onClick={() => setSelectedDay("sábado")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="font-semibold">SÁBADO</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("sábado")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.sábado 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-blue-500 hover:bg-blue-500/10'
                        }`}
                      >
                        {completedDays.sábado && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">ENTRENAMIENTO LIBRE</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Ejercicios de tu preferencia</div>
                      <div>• Actividades recreativas</div>
                      <div>• Yoga o pilates</div>
                      <div>• Descanso activo</div>
                    </div>
                    <div className="mt-3 text-xs text-blue-500 font-medium">
                      Click para ver detalles →
                    </div>
                  </div>

                  {/* Domingo */}
                  <div 
                    className={`border border-border/50 rounded-lg p-4 cursor-pointer hover:bg-gray-500/10 transition-colors ${
                      completedDays.domingo ? 'bg-green-500/10 border-green-500/50' : 'bg-gray-500/5'
                    }`}
                    onClick={() => setSelectedDay("domingo")}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Heart className="h-5 w-5 text-gray-500" />
                        <span className="font-semibold">DOMINGO</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleDayCompleted("domingo")
                        }}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedDays.domingo 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-500 hover:bg-gray-500/10'
                        }`}
                      >
                        {completedDays.domingo && <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="text-sm font-medium mb-2">DESCANSO</div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Día de recuperación</div>
                      <div>• Estiramientos suaves</div>
                      <div>• Caminata ligera</div>
                      <div>• Hidratación extra</div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500 font-medium">
                      Click para ver detalles →
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* User Data Form */}
            {showDataForm && (
              <Card className="border-2 border-primary/60 bg-card/95 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Datos Personales
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Completa tus datos para rutinas personalizadas
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center gap-2">
                        <Weight className="h-4 w-4" />
                        Peso (kg)
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="70"
                        value={userData.weight || ""}
                        onChange={(e) => updateUserData('weight', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="height" className="flex items-center gap-2">
                        <Ruler className="h-4 w-4" />
                        Estatura (cm)
                      </Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="175"
                        value={userData.height || ""}
                        onChange={(e) => updateUserData('height', parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age" className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4" />
                      Edad
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={userData.age || ""}
                      onChange={(e) => updateUserData('age', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Foto de tu cuerpo (opcional)
                    </Label>
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload">
                        <Button variant="outline" className="gap-2" asChild>
                          <span>
                            <Upload className="h-4 w-4" />
                            Subir Foto
                          </span>
                        </Button>
                      </label>
                      {photoPreview && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-primary/50">
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>

                  {(!userData.weight || !userData.height || !userData.age) && (
                    <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                      ⚠️ Completa todos los campos obligatorios para guardar tus datos
                    </div>
                  )}
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={submitUserData} 
                      className="flex-1"
                      disabled={isSavingData || !userData.weight || !userData.height || !userData.age}
                    >
                      {isSavingData ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Guardando...
                        </>
                      ) : (
                        "Guardar Datos"
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowDataForm(false)}
                      disabled={isSavingData}
                    >
                      Cancelar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Acciones Rápidas
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Haz clic para enviar preguntas comunes
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto p-4"
                  onClick={() => setShowDataForm(true)}
                >
                  <div className="text-primary"><User className="h-5 w-5" /></div>
                  <div className="text-left">
                    <div className="font-medium">Completar Perfil</div>
                    <div className="text-xs text-muted-foreground">Agrega tus datos para rutinas personalizadas</div>
                  </div>
                </Button>
                {quickActions.map((action) => (
                  <Button
                    key={action.id}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto p-4"
                    onClick={() => handleQuickAction(action.prompt)}
                  >
                    <div className="text-primary">{action.icon}</div>
                    <div className="text-left">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Funciones Premium
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Rutinas personalizadas</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Seguimiento de progreso</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Consejos nutricionales</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Motivación 24/7</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Retos personalizados</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Tu Progreso
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(() => {
                  const stats = getProgressStats()
                  return (
                    <>
                      {/* Notificación de celebración */}
                      {showCelebration && (
                        <div className="text-center p-4 bg-green-500/10 border border-green-500/50 rounded-lg mb-4">
                          <div className="text-2xl mb-2">🎉</div>
                          <div className="text-lg font-bold text-green-500">¡Semana Completada!</div>
                          <div className="text-sm text-muted-foreground">
                            Has completado todos los días de entrenamiento
                          </div>
                        </div>
                      )}

                      {/* Countdown timer */}
                      {resetTimer !== null && (
                        <div className="text-center p-4 bg-orange-500/10 border border-orange-500/50 rounded-lg mb-4">
                          <div className="text-lg font-bold text-orange-500">
                            Reinicio en: {formatTime(resetTimer)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            El progreso se reiniciará automáticamente
                          </div>
                        </div>
                      )}

                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.completedCount}</div>
                        <div className="text-sm text-muted-foreground">Días completados</div>
                        <div className="text-xs text-muted-foreground">de {stats.totalDays} esta semana</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{stats.completionPercentage}%</div>
                        <div className="text-sm text-muted-foreground">Progreso semanal</div>
                        <div className="text-xs text-muted-foreground">Objetivo: {stats.targetDays} días</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${stats.isOnTrack ? 'text-green-500' : 'text-orange-500'}`}>
                          {stats.isOnTrack ? '🎯' : '📈'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stats.isOnTrack ? '¡En el camino!' : 'Sigue así'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {stats.isOnTrack 
                            ? 'Cumpliendo tu objetivo' 
                            : `${stats.targetDays - stats.completedCount} días más para tu objetivo`
                          }
                        </div>
                      </div>
                    </>
                  )
                })()}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>

      {/* Modal de Detalles del Día */}
      {selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border/50 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {(() => {
                  const dayData = weeklyWorkoutData[selectedDay as keyof typeof weeklyWorkoutData]
                  const IconComponent = dayData.icon
                  return (
                    <>
                      <IconComponent className={`h-6 w-6 text-${dayData.color}`} />
                      <div>
                        <h2 className="text-xl font-bold">{selectedDay.toUpperCase()}</h2>
                        <p className="text-sm text-muted-foreground">{dayData.title}</p>
                      </div>
                    </>
                  )
                })()}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDay(null)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid gap-6">
                {weeklyWorkoutData[selectedDay as keyof typeof weeklyWorkoutData].exercises.map((exercise, index) => (
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
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Descripción del ejercicio:</div>
                        <p className="text-sm text-muted-foreground">{exercise.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Equipamiento necesario:</div>
                        <p className="text-sm text-muted-foreground">{exercise.equipment}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
