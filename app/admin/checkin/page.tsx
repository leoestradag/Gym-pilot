"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, UserCheck, Clock, TrendingUp, Search } from "lucide-react"
import { useState } from "react"
import { CheckInScanner } from "@/components/checkin-scanner"
import { CheckInHistory } from "@/components/checkin-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const todayStats = {
  totalCheckins: 89,
  currentlyInside: 42,
  peakTime: "18:00",
  averageStay: "1.5 hrs",
}

export default function CheckInPage() {
  const [activeTab, setActiveTab] = useState("scanner")

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <QrCode className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Sistema de Check-in</h1>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Today's Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Check-ins de Hoy</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todayStats.totalCheckins}</div>
              <p className="text-xs text-primary mt-1">+12% vs ayer</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Actualmente Dentro</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todayStats.currentlyInside}</div>
              <p className="text-xs text-muted-foreground mt-1">En el gimnasio ahora</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hora Pico</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todayStats.peakTime}</div>
              <p className="text-xs text-muted-foreground mt-1">Mayor asistencia</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estancia Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{todayStats.averageStay}</div>
              <p className="text-xs text-muted-foreground mt-1">Tiempo en gimnasio</p>
            </CardContent>
          </Card>
        </div>

        {/* Check-in Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="scanner">Escanear QR</TabsTrigger>
            <TabsTrigger value="manual">Check-in Manual</TabsTrigger>
            <TabsTrigger value="history">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-4">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <CheckInScanner />
              </div>

              <div className="space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-base text-foreground">Instrucciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-xs">
                        1
                      </div>
                      <p>El miembro presenta su código QR desde la app móvil</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-xs">
                        2
                      </div>
                      <p>Escanea el código con la cámara o sube una imagen</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary font-semibold text-xs">
                        3
                      </div>
                      <p>El sistema verifica la membresía y registra el check-in</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-base text-foreground">Últimos Check-ins</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {[
                      { name: "Carlos Rodríguez", time: "Hace 2 min", status: "active" },
                      { name: "María González", time: "Hace 5 min", status: "active" },
                      { name: "Juan Martínez", time: "Hace 8 min", status: "active" },
                    ].map((checkin, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border/50"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">{checkin.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{checkin.name}</p>
                            <p className="text-xs text-muted-foreground">{checkin.time}</p>
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">Activo</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-foreground">Check-in Manual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-w-2xl space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Buscar miembro por nombre, email o ID..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    {[
                      {
                        id: 1,
                        name: "Carlos Rodríguez",
                        email: "carlos@ejemplo.com",
                        membership: "Premium",
                        status: "active",
                      },
                      {
                        id: 2,
                        name: "María González",
                        email: "maria@ejemplo.com",
                        membership: "Elite",
                        status: "active",
                      },
                      {
                        id: 3,
                        name: "Juan Martínez",
                        email: "juan@ejemplo.com",
                        membership: "Básico",
                        status: "expiring",
                      },
                    ].map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{member.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                          </div>
                          <Badge
                            className={
                              member.status === "active"
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                            }
                          >
                            {member.membership}
                          </Badge>
                        </div>
                        <Button size="sm">Registrar Check-in</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <CheckInHistory />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
