"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Sparkles, TrendingUp, Users, Calendar, MessageSquare } from "lucide-react"
import { useState } from "react"
import { AIChat } from "@/components/ai-chat"

const quickActions = [
  {
    id: 1,
    title: "Análisis de Asistencia",
    description: "Genera un reporte de asistencia del último mes",
    icon: TrendingUp,
    prompt: "Genera un análisis detallado de la asistencia del último mes",
  },
  {
    id: 2,
    title: "Sugerencias de Clases",
    description: "Recomienda nuevas clases basadas en tendencias",
    icon: Calendar,
    prompt: "¿Qué nuevas clases deberíamos agregar basándonos en las tendencias actuales?",
  },
  {
    id: 3,
    title: "Retención de Miembros",
    description: "Estrategias para mejorar la retención",
    icon: Users,
    prompt: "Dame estrategias para mejorar la retención de miembros",
  },
  {
    id: 4,
    title: "Plan de Marketing",
    description: "Crea un plan de marketing para el próximo mes",
    icon: MessageSquare,
    prompt: "Crea un plan de marketing para atraer nuevos miembros",
  },
]

const aiCapabilities = [
  {
    title: "Análisis Predictivo",
    description: "Predice tendencias de asistencia y ocupación",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    title: "Recomendaciones",
    description: "Sugiere mejoras operativas y nuevas clases",
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    title: "Automatización",
    description: "Automatiza recordatorios y seguimientos",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    title: "Reportes Inteligentes",
    description: "Genera reportes detallados en segundos",
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
]

export default function AssistantPage() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Asistente IA</h1>
              <p className="text-xs text-muted-foreground">Powered by AI</p>
            </div>
          </div>
          <Badge className="ml-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="h-3 w-3 mr-1" />
            Beta
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* AI Chat Panel */}
          <div className="lg:col-span-2">
            <AIChat selectedPrompt={selectedAction} onPromptUsed={() => setSelectedAction(null)} />
          </div>

          {/* Sidebar with Quick Actions */}
          <div className="space-y-6">
            {/* AI Capabilities */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Capacidades IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiCapabilities.map((capability) => (
                  <div key={capability.title} className={`p-3 rounded-lg border ${capability.color}`}>
                    <h4 className="font-semibold text-sm text-foreground mb-1">{capability.title}</h4>
                    <p className="text-xs text-muted-foreground">{capability.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.prompt)}
                    className="w-full p-3 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/5 transition-colors text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <action.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground mb-1">{action.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
