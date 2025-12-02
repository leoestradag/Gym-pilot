"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, ArrowLeft, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

type MembershipPlan = {
  id: number
  name: string
  price: number
  period: string
  description?: string | null
  features: string[]
  popular: boolean
  color?: string | null
  order: number
}

export default function MembershipPlansPage() {
  const params = useParams()
  const { toast } = useToast()
  const gymId = params.gymId as string

  const [plans, setPlans] = useState<MembershipPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    period: "mes",
    description: "",
    features: "",
    popular: false,
    color: "",
    order: 0,
  })

  useEffect(() => {
    loadPlans()
  }, [gymId])

  const loadPlans = async () => {
    try {
      const response = await fetch(`/api/gym/${gymId}/membership-plans`)
      if (response.ok) {
        const data = await response.json()
        setPlans(data)
      }
    } catch (error) {
      console.error("Error loading plans", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los planes",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const featuresArray = formData.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean)

    const planData = {
      name: formData.name,
      price: Number(formData.price),
      period: formData.period,
      description: formData.description || null,
      features: featuresArray,
      popular: formData.popular,
      color: formData.color || null,
      order: Number(formData.order),
    }

    try {
      if (editingPlan) {
        const response = await fetch(`/api/gym/${gymId}/membership-plans/${editingPlan.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planData),
        })

        if (!response.ok) throw new Error("Error al actualizar")

        toast({
          title: "Plan actualizado",
          description: "Los cambios se han guardado exitosamente",
        })
      } else {
        const response = await fetch(`/api/gym/${gymId}/membership-plans`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(planData),
        })

        if (!response.ok) throw new Error("Error al crear")

        toast({
          title: "Plan creado",
          description: "El plan se ha agregado exitosamente",
        })
      }

      setIsDialogOpen(false)
      setEditingPlan(null)
      setFormData({
        name: "",
        price: "",
        period: "mes",
        description: "",
        features: "",
        popular: false,
        color: "",
        order: 0,
      })
      loadPlans()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar el plan",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (plan: MembershipPlan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      period: plan.period,
      description: plan.description || "",
      features: plan.features.join("\n"),
      popular: plan.popular,
      color: plan.color || "",
      order: plan.order,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este plan?")) return

    try {
      const response = await fetch(`/api/gym/${gymId}/membership-plans/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Error al eliminar")

      toast({
        title: "Plan eliminado",
        description: "El plan se ha eliminado exitosamente",
      })
      loadPlans()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el plan",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/admin/gym/${gymId}`}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Volver
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Planes de Membresía</h1>
                <p className="text-sm text-muted-foreground">Gestiona los planes y precios de tu gimnasio</p>
              </div>
            </div>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Plan
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando planes...</p>
          </div>
        ) : plans.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No hay planes configurados</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Plan
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`border-2 ${
                  plan.popular ? "border-primary" : "border-border/50"
                } bg-card/50 backdrop-blur relative`}
              >
                {plan.popular && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary">Popular</Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  {plan.description && (
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEdit(plan)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(plan.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open)
        if (!open) {
          setEditingPlan(null)
          setFormData({
            name: "",
            price: "",
            period: "mes",
            description: "",
            features: "",
            popular: false,
            color: "",
            order: 0,
          })
        }
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? "Editar Plan" : "Nuevo Plan de Membresía"}
            </DialogTitle>
            <DialogDescription>
              Completa la información del plan
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Plan</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Básico"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="599"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="period">Período</Label>
                <select
                  id="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="mes">Mes</option>
                  <option value="trimestre">Trimestre</option>
                  <option value="año">Año</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Orden</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción del plan"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="features">Características (una por línea)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Acceso al área de pesas&#10;Acceso a cardio&#10;Casillero personal"
                rows={6}
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="popular"
                checked={formData.popular}
                onCheckedChange={(checked) => setFormData({ ...formData, popular: checked })}
              />
              <Label htmlFor="popular">Marcar como plan popular</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color (clase CSS opcional)</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="border-primary"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setEditingPlan(null)
                  setFormData({
                    name: "",
                    price: "",
                    period: "mes",
                    description: "",
                    features: "",
                    popular: false,
                    color: "",
                    order: 0,
                  })
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingPlan ? "Actualizar" : "Crear"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

