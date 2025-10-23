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
  Image as ImageIcon
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

  // Función para generar rutina personalizada
  const generatePersonalizedRoutine = (): string => {
    if (!userData.weight || !userData.height || !userData.age) {
      return "Primero necesito que completes tus datos básicos (peso, estatura, edad) para poder crear una rutina personalizada."
    }

    const bmi = userData.weight / Math.pow(userData.height / 100, 2)
    let routine = ""

    // Análisis basado en BMI
    if (bmi < 18.5) {
      routine += "📈 **RUTINA PARA GANAR MASA MUSCULAR**\n\n"
      routine += "Basándome en tu BMI (bajo peso), te recomiendo:\n\n"
      routine += "**Día 1 - Tren Superior:**\n"
      routine += "• Press banca: 4 series x 8-10 reps\n"
      routine += "• Dominadas: 4 series x 6-8 reps\n"
      routine += "• Press militar: 3 series x 8-10 reps\n"
      routine += "• Curl bíceps: 3 series x 10-12 reps\n\n"
    } else if (bmi > 25) {
      routine += "🔥 **RUTINA PARA PERDER PESO**\n\n"
      routine += "Basándome en tu BMI (sobrepeso), te recomiendo:\n\n"
      routine += "**Día 1 - Cardio + Fuerza:**\n"
      routine += "• 20 min cardio moderado\n"
      routine += "• Sentadillas: 4 series x 15-20 reps\n"
      routine += "• Flexiones: 3 series x 10-15 reps\n"
      routine += "• Plancha: 3 series x 30-45 seg\n\n"
    } else {
      routine += "💪 **RUTINA DE MANTENIMIENTO Y DEFINICIÓN**\n\n"
      routine += "Basándome en tu BMI (normal), te recomiendo:\n\n"
      routine += "**Día 1 - Tren Superior:**\n"
      routine += "• Press banca: 3 series x 10-12 reps\n"
      routine += "• Remo con barra: 3 series x 10-12 reps\n"
      routine += "• Press hombros: 3 series x 10-12 reps\n"
      routine += "• Curl bíceps: 3 series x 12-15 reps\n\n"
    }

    // Recomendaciones nutricionales
    routine += "🥗 **RECOMENDACIONES NUTRICIONALES:**\n"
    routine += `• Calorías diarias: ${Math.round(userData.weight * 25)} kcal\n`
    routine += `• Proteínas: ${Math.round(userData.weight * 1.6)}g por día\n`
    routine += "• Hidratación: 3-4 litros de agua diarios\n"
    routine += "• Comer cada 3-4 horas\n\n"

    routine += "📅 **FRECUENCIA:** 4-5 días por semana\n"
    routine += "⏱️ **DURACIÓN:** 60-90 minutos por sesión\n"
    routine += "🎯 **PROGRESIÓN:** Aumenta peso cada 2 semanas"

    return routine
  }

  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    // Verificar si es sobre fitness
    if (!isFitnessRelated(userInput)) {
      return "Lo siento, solo puedo ayudarte con temas relacionados con fitness, gimnasio, ejercicios, nutrición deportiva y entrenamiento. ¿Hay algo específico sobre tu rutina de ejercicios en lo que pueda ayudarte?"
    }

    // Respuestas específicas basadas en el input
    if (lowerInput.includes('rutina') || lowerInput.includes('ejercicio') || lowerInput.includes('entrenar')) {
      if (userData.weight && userData.height && userData.age) {
        return generatePersonalizedRoutine()
      } else {
        return "Para crear una rutina personalizada, necesito que primero completes tus datos básicos. ¿Podrías decirme tu peso, estatura y edad?"
      }
    }

    if (lowerInput.includes('peso') || lowerInput.includes('adelgazar') || lowerInput.includes('perder')) {
      return "Para ayudarte con la pérdida de peso, necesito saber tu peso actual, estatura y edad. También sería ideal ver una foto de tu cuerpo para evaluar tu composición corporal actual. ¿Podrías compartir estos datos?"
    }

    if (lowerInput.includes('masa') || lowerInput.includes('muscular') || lowerInput.includes('ganar')) {
      return "Para ganar masa muscular de forma efectiva, necesito conocer tu peso, estatura, edad y nivel de experiencia. Una foto también me ayudaría a evaluar tu desarrollo muscular actual. ¿Podrías proporcionarme esta información?"
    }

    if (lowerInput.includes('nutrición') || lowerInput.includes('dieta') || lowerInput.includes('comer')) {
      return "Para darte recomendaciones nutricionales precisas, necesito saber tu peso, estatura, edad y objetivos específicos. ¿Podrías compartir estos datos conmigo?"
    }

    // Respuesta genérica para preguntas de fitness
    const fitnessResponses = [
      "Excelente pregunta sobre fitness. Para darte la mejor respuesta, necesito conocer tus datos básicos (peso, estatura, edad) y objetivos. ¿Podrías compartir esta información?",
      "Me encanta que te enfoques en tu salud física. Para personalizar mi consejo, necesito saber tu peso, estatura, edad y objetivos específicos. ¿Podrías proporcionarme estos datos?",
      "¡Genial pregunta! Para ayudarte de la mejor manera, necesito conocer tu perfil físico (peso, estatura, edad) y una foto de tu cuerpo. ¿Podrías compartir esta información?"
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

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

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
              
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
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

                {/* Input */}
                <div className="border-t border-border/50 p-4 flex-shrink-0">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1"
                    />
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
          </div>
        </div>
      </div>
    </div>
  )
}
