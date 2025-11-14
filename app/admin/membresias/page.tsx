"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Filter, Users, Calendar, DollarSign, TrendingUp } from "lucide-react"
import { useState } from "react"
import { MembershipDialog } from "@/components/membership-dialog"
import { MembersList } from "@/components/members-list"

// Mock membership plans data
const membershipPlans = [
  {
    id: 1,
    name: "Básico",
    price: 299,
    duration: "mensual",
    features: ["Acceso al gimnasio", "Horario limitado (6am-2pm)", "Casillero incluido"],
    activeMembers: 87,
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    id: 2,
    name: "Premium",
    price: 499,
    duration: "mensual",
    features: ["Acceso 24/7", "Todas las clases grupales", "Casillero + toalla", "1 sesión con entrenador"],
    activeMembers: 124,
    color: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: 3,
    name: "Elite",
    price: 799,
    duration: "mensual",
    features: [
      "Todo lo de Premium",
      "Entrenador personal ilimitado",
      "Plan nutricional",
      "Acceso a zona VIP",
      "Estacionamiento",
    ],
    activeMembers: 36,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
]

export default function MembershipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Membresías</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Nueva Membresía
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Membership Plans Overview */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">Planes de Membresía</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {membershipPlans.map((plan) => (
              <Card key={plan.id} className={`border ${plan.color}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-foreground">{plan.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <span className="text-2xl font-bold text-foreground">${plan.price}</span>
                        <span className="text-muted-foreground">/{plan.duration}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="gap-1">
                      <Users className="h-3 w-3" />
                      {plan.activeMembers}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    Editar Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Miembros</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">247</div>
              <p className="text-xs text-primary mt-1">+12 este mes</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Vencen Pronto</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">18</div>
              <p className="text-xs text-muted-foreground mt-1">Próximos 7 días</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Mensuales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">$123,450</div>
              <p className="text-xs text-primary mt-1">+15% vs mes anterior</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tasa de Renovación</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">87%</div>
              <p className="text-xs text-primary mt-1">+3% vs mes anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Members List */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Miembros Activos</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar miembro..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-background/50"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MembersList searchQuery={searchQuery} />
          </CardContent>
        </Card>
      </div>

      <MembershipDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
