"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

export default function GymCoachPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "¡Hola! Soy tu Gym Coach AI. Estoy aquí para ayudarte a crear rutinas personalizadas, responder preguntas sobre ejercicios y motivarte en tu journey fitness. ¿En qué puedo ayudarte hoy?",
      timestamp: "10:30 AM"
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

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

  const generateAIResponse = (userInput: string) => {
    const responses = [
      "¡Excelente pregunta! Te voy a ayudar con eso. Basándome en tu consulta, te recomiendo...",
      "Perfecto, entiendo lo que necesitas. Aquí tienes una respuesta detallada...",
      "¡Me encanta tu enfoque! Te voy a dar algunos consejos específicos...",
      "Entiendo perfectamente. Te voy a crear un plan personalizado para ti...",
      "¡Genial! Ese es exactamente el tipo de pregunta que me gusta responder. Aquí tienes mi recomendación..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
  }

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
              <CardHeader className="border-b border-border/50">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Chat con tu Coach
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Tu entrenador personal AI está listo para ayudarte
                </p>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
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
                          <div className="flex-1">
                            <p className="text-sm">{message.content}</p>
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
                </div>

                {/* Input */}
                <div className="border-t border-border/50 p-4">
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
