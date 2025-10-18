"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  Users,
  Mail,
  Share2,
  Target,
  DollarSign,
  Calendar,
  Send,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react"

export default function MarketingPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)

  const campaigns = [
    {
      id: 1,
      name: "Promoción Verano 2025",
      status: "active",
      type: "Descuento",
      reach: 2450,
      conversions: 87,
      budget: 5000,
      spent: 3200,
      roi: 245,
    },
    {
      id: 2,
      name: "Referidos Amigos",
      status: "active",
      type: "Referidos",
      reach: 1820,
      conversions: 124,
      budget: 3000,
      spent: 2100,
      roi: 312,
    },
    {
      id: 3,
      name: "Black Friday",
      status: "scheduled",
      type: "Evento",
      reach: 0,
      conversions: 0,
      budget: 8000,
      spent: 0,
      roi: 0,
    },
  ]

  const socialStats = [
    { platform: "Instagram", followers: 12500, engagement: 4.2, icon: Instagram },
    { platform: "Facebook", followers: 8300, engagement: 2.8, icon: Facebook },
    { platform: "WhatsApp", followers: 3200, engagement: 8.5, icon: MessageCircle },
  ]

  const emailCampaigns = [
    { name: "Newsletter Semanal", sent: 2340, opened: 1456, clicked: 432, date: "2025-01-15" },
    { name: "Nuevas Clases", sent: 2340, opened: 1823, clicked: 678, date: "2025-01-12" },
    { name: "Promoción Especial", sent: 2340, opened: 1989, clicked: 892, date: "2025-01-10" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold">Marketing</h1>
      </header>

      <main className="flex-1 space-y-6 p-6">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,050</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+12.5%</span> vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversiones</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">211</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+8.2%</span> vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ROI Promedio</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">278%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+15.3%</span> vs mes anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuevos Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+22.1%</span> vs mes anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campañas</TabsTrigger>
            <TabsTrigger value="social">Redes Sociales</TabsTrigger>
            <TabsTrigger value="email">Email Marketing</TabsTrigger>
            <TabsTrigger value="create">Crear Campaña</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <div className="grid gap-4">
              {campaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {campaign.name}
                          <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                            {campaign.status === "active" ? "Activa" : "Programada"}
                          </Badge>
                        </CardTitle>
                        <CardDescription>{campaign.type}</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                      <div>
                        <p className="text-sm text-muted-foreground">Alcance</p>
                        <p className="text-2xl font-bold">{campaign.reach.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Conversiones</p>
                        <p className="text-2xl font-bold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ROI</p>
                        <p className="text-2xl font-bold text-primary">{campaign.roi}%</p>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Presupuesto</span>
                          <span className="font-medium">
                            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="mt-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {socialStats.map((social) => (
                <Card key={social.platform}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <social.icon className="h-5 w-5" />
                      {social.platform}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Seguidores</p>
                      <p className="text-3xl font-bold">{social.followers.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Engagement Rate</p>
                      <p className="text-2xl font-bold text-primary">{social.engagement}%</p>
                    </div>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Share2 className="mr-2 h-4 w-4" />
                      Programar Post
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contenido Sugerido por IA</CardTitle>
                <CardDescription>Ideas generadas automáticamente para tus redes sociales</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">💪 Motivación del Lunes</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "El único mal entrenamiento es el que no hiciste. ¡Empieza tu semana con energía en Tessalp Gyms!"
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Usar</Button>
                    <Button size="sm" variant="outline">
                      Regenerar
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">🎯 Tip de Entrenamiento</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    "¿Sabías que entrenar en grupo aumenta tu motivación en un 40%? Únete a nuestras clases de spinning
                    esta semana."
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm">Usar</Button>
                    <Button size="sm" variant="outline">
                      Regenerar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Marketing Tab */}
          <TabsContent value="email" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Campañas de Email</CardTitle>
                    <CardDescription>Historial de emails enviados</CardDescription>
                  </div>
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Nuevo Email
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {emailCampaigns.map((email, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-1">
                        <p className="font-medium">{email.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Enviado el {new Date(email.date).toLocaleDateString("es-ES")}
                        </p>
                      </div>
                      <div className="flex gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold">{email.sent}</p>
                          <p className="text-muted-foreground">Enviados</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-primary">{((email.opened / email.sent) * 100).toFixed(1)}%</p>
                          <p className="text-muted-foreground">Abiertos</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-primary">{((email.clicked / email.sent) * 100).toFixed(1)}%</p>
                          <p className="text-muted-foreground">Clicks</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plantillas Sugeridas</CardTitle>
                <CardDescription>Plantillas optimizadas para gimnasios</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="font-medium">🎉 Bienvenida Nuevos Miembros</p>
                  <p className="mt-2 text-sm text-muted-foreground">Email de onboarding con guía de inicio</p>
                  <Button className="mt-3 w-full bg-transparent" variant="outline">
                    Usar Plantilla
                  </Button>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="font-medium">⏰ Recordatorio de Renovación</p>
                  <p className="mt-2 text-sm text-muted-foreground">Notifica membresías próximas a vencer</p>
                  <Button className="mt-3 w-full bg-transparent" variant="outline">
                    Usar Plantilla
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Campaign Tab */}
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crear Nueva Campaña</CardTitle>
                <CardDescription>Configura una nueva campaña de marketing para tu gimnasio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="campaign-name">Nombre de la Campaña</Label>
                  <Input id="campaign-name" placeholder="Ej: Promoción Primavera 2025" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-type">Tipo de Campaña</Label>
                    <Select>
                      <SelectTrigger id="campaign-type">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="discount">Descuento</SelectItem>
                        <SelectItem value="referral">Programa de Referidos</SelectItem>
                        <SelectItem value="event">Evento Especial</SelectItem>
                        <SelectItem value="social">Redes Sociales</SelectItem>
                        <SelectItem value="email">Email Marketing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Presupuesto ($)</Label>
                    <Input id="budget" type="number" placeholder="5000" />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Fecha de Inicio</Label>
                    <Input id="start-date" type="date" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">Fecha de Fin</Label>
                    <Input id="end-date" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe los objetivos y detalles de tu campaña..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target">Audiencia Objetivo</Label>
                  <Select>
                    <SelectTrigger id="target">
                      <SelectValue placeholder="Selecciona audiencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los Miembros</SelectItem>
                      <SelectItem value="active">Miembros Activos</SelectItem>
                      <SelectItem value="inactive">Miembros Inactivos</SelectItem>
                      <SelectItem value="new">Nuevos Prospectos</SelectItem>
                      <SelectItem value="premium">Miembros Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">
                    <Send className="mr-2 h-4 w-4" />
                    Lanzar Campaña
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Calendar className="mr-2 h-4 w-4" />
                    Programar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
