"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIChatProps {
  selectedPrompt: string | null
  onPromptUsed: () => void
}

export function AIChat({ selectedPrompt, onPromptUsed }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hola! Soy tu asistente de IA para Tessalp Gyms. Puedo ayudarte con análisis de datos, recomendaciones, reportes y mucho más. ¿En qué puedo ayudarte hoy?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle selected prompt from quick actions
  useEffect(() => {
    if (selectedPrompt) {
      setInput(selectedPrompt)
      onPromptUsed()
    }
  }, [selectedPrompt, onPromptUsed])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response (in production, this would call an actual AI API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateMockResponse(input),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateMockResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase()

    if (lowerPrompt.includes("asistencia") || lowerPrompt.includes("análisis")) {
      return "Basándome en los datos del último mes, he identificado las siguientes tendencias:\n\n• La asistencia promedio es de 87 personas por día\n• Los días con mayor asistencia son Lunes y Miércoles (95+ personas)\n• Las horas pico son de 6-8 AM y 6-8 PM\n• La tasa de retención es del 87%, un 3% más que el mes anterior\n\nRecomiendo aumentar la capacidad de clases en horarios pico y considerar agregar clases adicionales los lunes."
    }

    if (lowerPrompt.includes("clases") || lowerPrompt.includes("nuevas")) {
      return "Basándome en las tendencias actuales del fitness y el perfil de tus miembros, recomiendo:\n\n1. **HIIT Matutino** - Alta demanda en horarios tempranos\n2. **Yoga Restaurativo** - Para balance con clases intensas\n3. **Entrenamiento Funcional** - Muy popular entre 25-40 años\n4. **Boxeo Fitness** - Tendencia creciente en 2025\n\nEstas clases tienen alto potencial de ocupación basándome en datos de gimnasios similares."
    }

    if (lowerPrompt.includes("retención") || lowerPrompt.includes("miembros")) {
      return "Para mejorar la retención de miembros, te sugiero:\n\n1. **Programa de Seguimiento**: Contactar miembros inactivos después de 7 días\n2. **Incentivos de Renovación**: Ofrecer 10% descuento en renovaciones anticipadas\n3. **Experiencia Personalizada**: Sesiones gratuitas con entrenador cada 3 meses\n4. **Comunidad**: Eventos sociales mensuales para crear conexión\n5. **Feedback Regular**: Encuestas trimestrales para mejorar servicios\n\nEstas estrategias pueden aumentar la retención hasta un 15%."
    }

    if (lowerPrompt.includes("marketing") || lowerPrompt.includes("atraer")) {
      return "Plan de Marketing para el próximo mes:\n\n**Semana 1-2: Campaña Digital**\n• Anuncios en redes sociales (Instagram/Facebook)\n• Promoción: 50% descuento primer mes\n• Target: 25-45 años, 5km radio\n\n**Semana 3: Referidos**\n• Programa: Trae un amigo, ambos reciben 1 mes gratis\n• Incentivo para miembros actuales\n\n**Semana 4: Evento Abierto**\n• Día de puertas abiertas\n• Clases demo gratuitas\n• Registro en sitio con descuento especial\n\nPresupuesto estimado: $15,000 MXN\nROI esperado: 30-40 nuevos miembros"
    }

    return "Entiendo tu consulta. Como asistente de IA, puedo ayudarte con:\n\n• Análisis de datos y tendencias\n• Recomendaciones operativas\n• Estrategias de marketing\n• Optimización de horarios\n• Reportes personalizados\n\n¿Sobre cuál de estos temas te gustaría saber más?"
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur flex flex-col">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="text-foreground flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Chat con Asistente IA
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col p-0">
        {/* Chat Messages */}
        <div 
          ref={scrollRef}
          className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-muted/20 rounded-lg"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-primary/10 text-primary"
                }`}>
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div
                  className={`rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-background border border-border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs opacity-70 mt-1 ${
                    message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {message.timestamp.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-background border border-border rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
              disabled={isLoading}
              className="flex-1 bg-background/50"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
