"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, Users, Calendar, DollarSign, TrendingUp } from "lucide-react"
import { useState } from "react"
import { MembershipDialog } from "@/components/membership-dialog"
import { MembersList } from "@/components/members-list"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

// Mock membership plans data
const initialMembershipPlans = [
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
  const [plans, setPlans] = useState(initialMembershipPlans)
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false)
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null)
  const [planForm, setPlanForm] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
  })
  const { toast } = useToast()

  const handleOpenPlanDialog = (planId: number) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) return
    setSelectedPlanId(plan.id)
    setPlanForm({
      name: plan.name,
      price: String(plan.price),
      duration: plan.duration,
      features: plan.features.join("\n"),
    })
    setIsPlanDialogOpen(true)
  }

  const handlePlanSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlanId) return
    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === selectedPlanId
          ? {
              ...plan,
              name: planForm.name,
              price: Number(planForm.price),
              duration: planForm.duration,
              features: planForm.features
                .split("\n")
                .map((feature) => feature.trim())
                .filter(Boolean),
            }
          : plan,
      ),
    )
    toast({
      title: "Plan actualizado",
      description: `El plan ${planForm.name} fue actualizado correctamente.`,
    })
    setIsPlanDialogOpen(false)
  }

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
            {plans.map((plan) => (
              <Card key={plan.id} className={`border ${plan.color} h-full`}>
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
                <CardContent className="flex h-full flex-col">
                  <ul className="space-y-2 text-sm text-muted-foreground flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => handleOpenPlanDialog(plan.id)}
                  >
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

      <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar plan</DialogTitle>
            <DialogDescription>Actualiza la información de tu plan de membresía.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePlanSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="plan-name">Nombre del plan</Label>
              <Input
                id="plan-name"
                value={planForm.name}
                onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="plan-price">Precio mensual</Label>
                <Input
                  id="plan-price"
                  type="number"
                  min="0"
                  value={planForm.price}
                  onChange={(e) => setPlanForm({ ...planForm, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-duration">Duración</Label>
                <Input
                  id="plan-duration"
                  value={planForm.duration}
                  onChange={(e) => setPlanForm({ ...planForm, duration: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-features">Beneficios (uno por línea)</Label>
              <Textarea
                id="plan-features"
                rows={4}
                value={planForm.features}
                onChange={(e) => setPlanForm({ ...planForm, features: e.target.value })}
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => setIsPlanDialogOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Guardar cambios
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
