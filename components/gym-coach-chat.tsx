"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Dumbbell, Target, Calendar } from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

const workoutTemplates = {
  "20-day-challenge": {
    title: "20 Day Challenge",
    description: "Rutina intensiva de 20 días para transformación completa",
    days: [
      { day: 1, focus: "Pecho y Tríceps", exercises: ["Press de banca", "Fondos", "Extensiones de tríceps"] },
      { day: 2, focus: "Espalda y Bíceps", exercises: ["Dominadas", "Remo con barra", "Curl de bíceps"] },
      { day: 3, focus: "Piernas", exercises: ["Sentadillas", "Peso muerto", "Zancadas"] },
      { day: 4, focus: "Hombros", exercises: ["Press militar", "Elevaciones laterales", "Remo al mentón"] },
      { day: 5, focus: "Core", exercises: ["Plancha", "Abdominales", "Mountain climbers"] }
    ]
  },
  "weight-loss": {
    title: "Pérdida de Peso",
    description: "Rutina enfocada en quemar grasa y tonificar",
    days: [
      { day: 1, focus: "Cardio HIIT", exercises: ["Burpees", "Jumping jacks", "Mountain climbers"] },
      { day: 2, focus: "Fuerza Total", exercises: ["Sentadillas", "Flexiones", "Plancha"] },
      { day: 3, focus: "Cardio LISS", exercises: ["Caminata rápida", "Bicicleta", "Elíptica"] }
    ]
  },
  "muscle-gain": {
    title: "Ganancia de Músculo",
    description: "Rutina para aumentar masa muscular",
    days: [
      { day: 1, focus: "Pecho y Tríceps", exercises: ["Press de banca 4x8-12", "Inclinado con mancuernas 3x10", "Fondos 3x8-15"] },
      { day: 2, focus: "Espalda y Bíceps", exercises: ["Dominadas 4x6-10", "Remo con barra 4x8-12", "Curl martillo 3x10-15"] },
      { day: 3, focus: "Piernas", exercises: ["Sentadillas 4x8-12", "Peso muerto 4x6-10", "Zancadas 3x10 cada pierna"] }
    ]
  }
}

export function GymCoachChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: '¡Hola! Soy tu Gym Coach personal. Puedo ayudarte a crear rutinas personalizadas, recomendar ejercicios y guiarte en tu transformación fitness. ¿En qué te puedo ayudar hoy?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('20 day') || message.includes('20 días') || message.includes('challenge')) {
      return `¡Perfecto! Te voy a crear un plan de 20 días. Aquí tienes tu rutina:

**Día 1-4: Fase de Adaptación**
- Día 1: Pecho y Tríceps (Press banca 3x10, Fondos 3x8, Extensiones 3x12)
- Día 2: Espalda y Bíceps (Dominadas 3x6, Remo 3x10, Curl 3x12)
- Día 3: Piernas (Sentadillas 3x15, Peso muerto 3x8, Zancadas 3x10)
- Día 4: Descanso activo (Caminata 30 min)

**Día 5-8: Intensificación**
- Aumenta las repeticiones en un 20%
- Agrega 1 serie más a cada ejercicio
- Incluye 10 min de cardio al final

¿Te parece bien este plan? ¿Quieres que ajuste algo específico?`
    }
    
    if (message.includes('pérdida') || message.includes('bajar') || message.includes('quemar')) {
      return `Para pérdida de peso, te recomiendo esta rutina:

**Rutina de Quema de Grasa:**
- **Lunes, Miércoles, Viernes:** HIIT (20 min)
  - Burpees 30 seg / Descanso 30 seg
  - Jumping jacks 30 seg / Descanso 30 seg
  - Mountain climbers 30 seg / Descanso 30 seg
  - Repetir 4 rondas

- **Martes, Jueves:** Fuerza (30 min)
  - Sentadillas 3x15
  - Flexiones 3x10
  - Plancha 3x30 seg
  - Zancadas 3x10 cada pierna

- **Sábado:** Cardio LISS (45 min)
- **Domingo:** Descanso

¿Quieres que te explique algún ejercicio específico?`
    }
    
    if (message.includes('músculo') || message.includes('masa') || message.includes('volumen')) {
      return `Para ganar masa muscular, necesitas:

**Rutina de Hipertrofia:**
- **Lunes:** Pecho y Tríceps
  - Press banca 4x8-12
  - Inclinado con mancuernas 3x10
  - Fondos 3x8-15
  - Extensiones de tríceps 3x12

- **Miércoles:** Espalda y Bíceps
  - Dominadas 4x6-10
  - Remo con barra 4x8-12
  - Curl martillo 3x10-15
  - Remo al mentón 3x10

- **Viernes:** Piernas
  - Sentadillas 4x8-12
  - Peso muerto 4x6-10
  - Zancadas 3x10 cada pierna
  - Elevaciones de pantorrillas 3x15

**Importante:** Descansa 2-3 minutos entre series y come 1.6-2.2g de proteína por kg de peso.

¿Tienes experiencia con estos ejercicios?`
    }
    
    if (message.includes('principiante') || message.includes('nuevo') || message.includes('empezar')) {
      return `¡Excelente! Para principiantes te recomiendo:

**Rutina de Inicio (3 días por semana):**

**Día 1: Cuerpo Completo**
- Sentadillas 3x10
- Flexiones (en rodillas si es necesario) 3x8
- Plancha 3x20 segundos
- Zancadas 2x8 cada pierna

**Día 2: Descanso**

**Día 3: Repetir Día 1**

**Progresión:**
- Semana 1-2: 3x10 repeticiones
- Semana 3-4: 3x12 repeticiones
- Semana 5-6: 3x15 repeticiones

**Consejos:**
- Calienta 5-10 minutos antes
- Enfría 5-10 minutos después
- Mantén buena forma, no velocidad
- Descansa 1-2 minutos entre series

¿Te parece bien empezar con esto?`
    }
    
    return `Entiendo que quieres ayuda con tu rutina. Para darte la mejor recomendación, dime:

1. **¿Cuál es tu objetivo principal?**
   - Perder peso
   - Ganar músculo
   - Mejorar condición física
   - 20 day challenge

2. **¿Cuántos días puedes entrenar por semana?**

3. **¿Tienes experiencia en el gym?**

4. **¿Tienes alguna limitación física?**

Con esta información podré crear una rutina perfecta para ti. 💪`
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Gym Coach - Tu Entrenador Personal IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4 bg-muted/20 rounded-lg">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
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
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregúntame sobre rutinas, ejercicios, nutrición..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Quiero hacer un 20 day challenge")}
            >
              <Target className="h-4 w-4 mr-1" />
              20 Day Challenge
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Quiero perder peso")}
            >
              <Dumbbell className="h-4 w-4 mr-1" />
              Perder Peso
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInputValue("Soy principiante")}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Soy Principiante
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
