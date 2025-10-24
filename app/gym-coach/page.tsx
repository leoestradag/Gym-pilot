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
  Activity
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
  const [showScrollButton, setShowScrollButton] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    {
      id: "routine",
      title: "Crear Rutina",
      description: "Diseña una rutina personalizada",
      icon: <Target className="h-5 w-5" />,
      prompt: "Quiero crear una rutina de ejercicios personalizada"
    },
    {
      id: "challenge",
      title: "20 Day Challenge",
      description: "Inicia un reto de 20 días",
      icon: <Calendar className="h-5 w-5" />,
      prompt: "Quiero empezar un reto de 20 días"
    },
    {
      id: "nutrition",
      title: "Consejos Nutrición",
      description: "Obtén tips de alimentación",
      icon: <Dumbbell className="h-5 w-5" />,
      prompt: "Dame consejos de nutrición para mi entrenamiento"
    },
    {
      id: "motivation",
      title: "Motivación",
      description: "Recibe palabras de aliento",
      icon: <Sparkles className="h-5 w-5" />,
      prompt: "Necesito motivación para entrenar hoy"
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
      'proteína', 'carbohidratos', 'calorías', 'dieta', 'nutrición', 'suplementos', 'creatina',
      'sentadilla', 'press', 'dominadas', 'flexiones', 'plancha', 'burpees', 'squat', 'deadlift',
      'bench', 'curl', 'extension', 'pulldown', 'row', 'shoulder', 'tricep', 'bicep', 'core',
      'abdomen', 'abdominales', 'espalda', 'pecho', 'hombros', 'brazos', 'piernas', 'glúteos',
      'fitness', 'workout', 'training', 'bodybuilding', 'crossfit', 'yoga', 'pilates', 'spinning'
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

    // Recomendaciones nutricionales personalizadas
    routine += "🥗 **PLAN NUTRICIONAL PERSONALIZADO**\n"
    routine += `• Calorías diarias: ${Math.round(currentWeight * 25)} kcal\n`
    routine += `• Proteínas: ${Math.round(currentWeight * 1.6)}g por día\n`
    routine += `• Carbohidratos: ${Math.round(currentWeight * 3)}g por día\n`
    routine += `• Grasas: ${Math.round(currentWeight * 0.8)}g por día\n`
    routine += "• Hidratación: 3-4 litros de agua diarios\n"
    routine += "• Comer cada 3-4 horas\n\n"

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

    // Respuestas amigables para saludos
    if (lowerInput.includes('hola') || lowerInput.includes('hi') || lowerInput.includes('hello') || lowerInput.includes('buenos días') || lowerInput.includes('buenas tardes') || lowerInput.includes('buenas noches')) {
      return `¡Hola! 👋 Me da mucho gusto saludarte. Soy tu Gym Coach AI personalizado y estoy aquí para ayudarte a alcanzar tus objetivos fitness.\n\n🎯 **¿En qué puedo ayudarte hoy?**\n\n• 💪 **Crear una rutina personalizada** - Basada en tus datos físicos\n• 🏃‍♂️ **Plan de pérdida de peso** - Cardio y alimentación\n• 💪 **Ganar masa muscular** - Hipertrofia y fuerza\n• 🥗 **Consejos nutricionales** - Alimentación para tus objetivos\n• 📸 **Análisis corporal** - Sube una foto para evaluación\n• 🎯 **20 Day Challenge** - Reto personalizado\n\n¿Cuál de estas opciones te interesa más?`
    }

    // Respuestas para preguntas generales
    if (lowerInput.includes('cómo estás') || lowerInput.includes('qué tal') || lowerInput.includes('cómo te va')) {
      return `¡Excelente! 😊 Estoy muy bien y listo para ayudarte con tu fitness. Me encanta trabajar con personas que quieren mejorar su salud y condición física.\n\n¿Hay algo específico en lo que pueda ayudarte hoy? Puedo crear rutinas, dar consejos nutricionales o ayudarte con cualquier duda sobre entrenamiento.`
    }

    // Respuestas para preguntas sobre qué puede hacer
    if (lowerInput.includes('qué puedes hacer') || lowerInput.includes('qué haces') || lowerInput.includes('ayudar') || lowerInput.includes('funciones')) {
      return `¡Genial pregunta! 🚀 Como tu Gym Coach AI, puedo ayudarte con:\n\n**🏋️‍♂️ ENTRENAMIENTO:**\n• Crear rutinas personalizadas según tu peso, estatura y edad\n• Diseñar planes de pérdida de peso o ganancia muscular\n• Adaptar ejercicios a tu nivel de experiencia\n• Crear retos de 20 días personalizados\n\n**🥗 NUTRICIÓN:**\n• Calcular tus calorías diarias necesarias\n• Recomendar macronutrientes (proteínas, carbohidratos, grasas)\n• Sugerir horarios de comida\n• Crear planes alimenticios\n\n**📊 ANÁLISIS:**\n• Evaluar tu composición corporal con foto\n• Calcular tu BMI y estado físico\n• Recomendar intensidad de entrenamiento\n\n¿Con cuál de estas áreas te gustaría empezar?`
    }

    // Verificar si es sobre fitness
    if (!isFitnessRelated(userInput)) {
      return `¡Hola! 😊 Me da mucho gusto que me escribas. Aunque me encanta conversar contigo, me especializo únicamente en temas de fitness, gimnasio, ejercicios y nutrición deportiva.\n\n🎯 **¿En qué puedo ayudarte con tu fitness?**\n\n• 💪 Crear una rutina personalizada\n• 🏃‍♂️ Plan para perder peso\n• 💪 Ganar masa muscular\n• 🥗 Consejos nutricionales\n• 📸 Análisis de tu composición corporal\n\n¿Hay algo específico sobre tu entrenamiento en lo que pueda ayudarte?`
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

    // Respuestas específicas basadas en el input
    if (lowerInput.includes('rutina') || lowerInput.includes('ejercicio') || lowerInput.includes('entrenar')) {
      if (userData.weight && userData.height && userData.age) {
        return generatePersonalizedRoutine()
      } else {
        return `¡Perfecto! Me encanta que quieras empezar una rutina. 💪 Para crear la rutina perfecta para ti, necesito conocer algunos datos básicos.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré diseñar un plan 100% personalizado para tus objetivos. ¿Te parece bien?`
      }
    }

    if (lowerInput.includes('peso') || lowerInput.includes('adelgazar') || lowerInput.includes('perder')) {
      return `¡Excelente objetivo! 🔥 Perder peso de forma saludable es una meta muy importante. Para ayudarte de la mejor manera, necesito conocer tu perfil físico.\n\n📊 **¿Podrías compartir conmigo?**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré crear un plan personalizado que incluya:\n• 🏃‍♂️ Rutina de cardio y fuerza\n• 🥗 Plan nutricional específico\n• 📅 Cronograma de entrenamiento\n• 🎯 Metas realistas y alcanzables\n\n¿Te parece bien empezar con estos datos?`
    }

    if (lowerInput.includes('masa') || lowerInput.includes('muscular') || lowerInput.includes('ganar')) {
      return `¡Fantástico! 💪 Ganar masa muscular es un objetivo increíble. Me encanta ayudarte a construir un cuerpo más fuerte y definido.\n\n📊 **Para crear tu plan de hipertrofia, necesito:**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Tu nivel de experiencia (principiante/intermedio/avanzado)\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré diseñar:\n• 🏋️‍♂️ Rutina de fuerza e hipertrofia\n• 🥩 Plan nutricional para ganancia muscular\n• 📈 Progresión de pesos y repeticiones\n• 🎯 Ejercicios específicos para tus objetivos\n\n¿Empezamos con tus datos básicos?`
    }

    if (lowerInput.includes('nutrición') || lowerInput.includes('dieta') || lowerInput.includes('comer')) {
      return `¡Perfecto! 🥗 La nutrición es la base de cualquier objetivo fitness. Me encanta ayudarte a optimizar tu alimentación.\n\n📊 **Para darte recomendaciones precisas, necesito:**\n• Tu peso actual (kg)\n• Tu estatura (cm)\n• Tu edad\n• Tu objetivo (perder peso/ganar masa/mantener)\n• Una foto de tu cuerpo (opcional)\n\nCon esta información podré calcular:\n• 🔥 Tus calorías diarias necesarias\n• 🥩 Cantidad de proteínas, carbohidratos y grasas\n• ⏰ Horarios de comida óptimos\n• 🍎 Alimentos específicos para tus objetivos\n• 💧 Hidratación personalizada\n\n¿Te parece bien compartir estos datos?`
    }

    // Respuestas para dudas o preguntas adicionales
    if (lowerInput.includes('duda') || lowerInput.includes('pregunta') || lowerInput.includes('ayuda') ||
        lowerInput.includes('no sé') || lowerInput.includes('cómo') || lowerInput.includes('qué')) {
      return `¡Por supuesto! 😊 Pregúntame lo que necesites sobre fitness. Estoy aquí para ayudarte 💪`
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
      const aiMessage = {
        id: Date.now(),
        type: "ai" as const,
        content: `¡Perfecto! He recibido tus datos:\n\n📊 **Tu Perfil:**\n• Peso: ${userData.weight} kg\n• Estatura: ${userData.height} cm\n• Edad: ${userData.age} años\n\n${userData.photo ? '📸 También he analizado tu foto corporal.\n\n' : ''}Ahora puedo crear rutinas 100% personalizadas para ti. ¿Cuál es tu objetivo principal? ¿Perder peso, ganar masa muscular, o mantenerte en forma?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, aiMessage])
      setShowDataForm(false)
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

                  <div className="flex gap-2 pt-4">
                    <Button onClick={submitUserData} className="flex-1">
                      Guardar Datos
                    </Button>
                    <Button variant="outline" onClick={() => setShowDataForm(false)}>
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
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Días consecutivos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Rutinas completadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Calorías quemadas</div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Calendar */}
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
                {/* Lunes */}
                <div className="border border-border/50 rounded-lg p-3 bg-primary/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-sm">LUNES - PECHO Y TRÍCEPS</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Press banca (máquina/barra)</div>
                    <div>• Aperturas con mancuernas</div>
                    <div>• Fondos en paralelas</div>
                    <div>• Extensión de tríceps</div>
                  </div>
                </div>

                {/* Martes */}
                <div className="border border-border/50 rounded-lg p-3 bg-accent/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-accent" />
                    <span className="font-semibold text-sm">MARTES - ESPALDA Y BÍCEPS</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Dominadas/Remo con barra</div>
                    <div>• Jalón al pecho (polea)</div>
                    <div>• Curl de bíceps</div>
                    <div>• Martillo con mancuernas</div>
                  </div>
                </div>

                {/* Miércoles */}
                <div className="border border-border/50 rounded-lg p-3 bg-green-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-sm">MIÉRCOLES - PIERNAS</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Sentadillas (máquina/peso libre)</div>
                    <div>• Peso muerto</div>
                    <div>• Prensa de piernas</div>
                    <div>• Gemelos (máquina)</div>
                  </div>
                </div>

                {/* Jueves */}
                <div className="border border-border/50 rounded-lg p-3 bg-orange-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-orange-500" />
                    <span className="font-semibold text-sm">JUEVES - HOMBROS Y CORE</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Press militar (máquina/barra)</div>
                    <div>• Elevaciones laterales</div>
                    <div>• Plancha abdominal</div>
                    <div>• Crunches y abdominales</div>
                  </div>
                </div>

                {/* Viernes */}
                <div className="border border-border/50 rounded-lg p-3 bg-purple-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold text-sm">VIERNES - CARDIO Y FUNCIONAL</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• 30 min cardio (cinta/bici)</div>
                    <div>• Burpees y mountain climbers</div>
                    <div>• Circuito funcional</div>
                    <div>• Estiramientos</div>
                  </div>
                </div>

                {/* Sábado */}
                <div className="border border-border/50 rounded-lg p-3 bg-blue-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-sm">SÁBADO - ENTRENAMIENTO LIBRE</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Ejercicios de tu preferencia</div>
                    <div>• Actividades recreativas</div>
                    <div>• Yoga o pilates</div>
                    <div>• Descanso activo</div>
                  </div>
                </div>

                {/* Domingo */}
                <div className="border border-border/50 rounded-lg p-3 bg-gray-500/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="h-4 w-4 text-gray-500" />
                    <span className="font-semibold text-sm">DOMINGO - DESCANSO</span>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>• Día de recuperación</div>
                    <div>• Estiramientos suaves</div>
                    <div>• Caminata ligera</div>
                    <div>• Hidratación extra</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
