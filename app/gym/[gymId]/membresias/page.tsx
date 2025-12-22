"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Star, Users, Clock, Shield, Zap, ShoppingCart, Loader2 } from "lucide-react"
import Link from "next/link"
import { ShoppingCart as ShoppingCartComponent } from "@/components/shopping-cart"

const benefits = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Sin Contrato",
    description: "Cancela cuando quieras sin penalizaciones"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Garantía de Satisfacción",
    description: "30 días de garantía o te devolvemos tu dinero"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Acceso Inmediato",
    description: "Comienza a entrenar el mismo día"
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Soporte 24/7",
    description: "Asistencia cuando la necesites"
  }
]

interface CartItem {
  id: string
  name: string
  price: number
  type: "membership"
  plan: string
  gymId: string
  gymName: string
}

export default function MembresiasPage() {
  const params = useParams()
  const gymId = (params?.gymId as string) || ""
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [gym, setGym] = useState<any>(null)
  const [memberships, setMemberships] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar datos del gimnasio y planes de membresía
  useEffect(() => {
    if (!gymId) {
      setIsLoading(false)
      return
    }
    const loadData = async () => {
      try {
        
        // Buscar gimnasio y planes de membresía
        const gymResponse = await fetch(`/api/gyms`)
        if (gymResponse.ok) {
          const gyms = await gymResponse.json()
          const foundGym = gyms.find((g: any) => 
            g.slug === gymId || 
            g.slug === gymId.replace(/-/g, " ") ||
            g.slug === gymId.replace(/ /g, "-") ||
            g.id === parseInt(gymId)
          )
          
          if (foundGym) {
            setGym(foundGym)
            
            // Cargar planes de membresía del gimnasio usando endpoint público
            const plansResponse = await fetch(`/api/public/gym/${gymId}/membership-plans`)
            if (plansResponse.ok) {
              const plans = await plansResponse.json()
              setMemberships(plans.map((plan: any) => ({
                id: plan.id.toString(),
                name: plan.name,
                price: plan.price,
                displayPrice: `$${plan.price.toLocaleString()}`,
                period: plan.period === "mes" ? "/mes" : plan.period === "trimestre" ? "/trimestre" : "/año",
                description: plan.description || "",
                features: plan.features || [],
                popular: plan.popular || false,
                color: plan.color ? `border-${plan.color}` : plan.popular ? "border-primary" : "border-gray-300"
              })))
            }
          }
        }
      } catch (error) {
        console.error("Error loading gym data", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [gymId])

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const savedCart = localStorage.getItem('gym-cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const addToCart = (membership: typeof memberships[0]) => {
    if (!gym) return
    
    const cartItem: CartItem = {
      id: `${gymId}-${membership.id}`,
      name: `Membresía ${membership.name}`,
      price: membership.price,
      type: "membership",
      plan: membership.name,
      gymId: gymId,
      gymName: gym.name
    }

    setCartItems(prev => {
      // Verificar si ya existe en el carrito
      const existingItem = prev.find(item => item.id === cartItem.id)
      if (existingItem) {
        return prev // No agregar duplicados
      }
      const newItems = [...prev, cartItem]
      
      // Guardar en localStorage
      localStorage.setItem('gym-cart', JSON.stringify(newItems))
      
      return newItems
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => {
      const newItems = prev.filter(item => item.id !== id)
      localStorage.setItem('gym-cart', JSON.stringify(newItems))
      return newItems
    })
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('gym-cart')
  }

  if (!gymId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Cargando planes de membresía...</span>
      </div>
    )
  }

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gimnasio no encontrado</h1>
          <p className="text-muted-foreground mb-4">
            No se encontró el gimnasio con el identificador: {gymId}
          </p>
          <Link href="/gimnasios">
            <Button>Ver todos los gimnasios</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Shopping Cart */}
      <ShoppingCartComponent 
        items={cartItems}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/gym/${gym.slug || gymId}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Gimnasio
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Planes de Membresía - {gym.name}</h1>
              <p className="text-muted-foreground">Elige el plan que mejor se adapte a tus objetivos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Planes de Membresía</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Encuentra el plan perfecto para alcanzar tus metas fitness
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{gym.hours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {memberships.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No hay planes de membresía disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {memberships.map((plan) => (
                <Card
                  key={plan.name}
                  className={`border-2 ${plan.color} bg-card/90 backdrop-blur relative hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "shadow-lg shadow-primary/20 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Más Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <p className="text-muted-foreground">{plan.description}</p>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.displayPrice}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                      variant={plan.popular ? "default" : "outline"}
                      onClick={() => addToCart(plan)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {plan.popular ? "Elegir Plan Premium" : `Elegir Plan ${plan.name}`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
            <p className="text-muted-foreground">Beneficios que nos hacen únicos</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-2 border-border/60 bg-card/90 backdrop-blur text-center hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
            <p className="text-muted-foreground">Resolvemos tus dudas más comunes</p>
          </div>
          
          <div className="space-y-6">
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo cambiar de plan en cualquier momento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, puedes cambiar de plan en cualquier momento. Si cambias a un plan más caro, 
                  se te cobrará la diferencia. Si cambias a un plan más barato, el crédito se aplicará 
                  a tu próxima mensualidad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">¿Hay período de prueba?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ofrecemos 7 días de prueba gratuita para que conozcas nuestras instalaciones 
                  y servicios antes de comprometerte con una membresía.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">¿Qué incluye el entrenamiento personal?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  El entrenamiento personal incluye evaluación física inicial, plan de ejercicios 
                  personalizado, seguimiento de progreso y ajustes según tus objetivos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">¿Puedo congelar mi membresía?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sí, puedes congelar tu membresía por un período mínimo de 1 mes y máximo de 3 meses 
                  por año. Se aplica una tarifa de congelación de $100 por mes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-muted-foreground mb-8">
            Únete a nuestra comunidad fitness y comienza tu transformación hoy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Star className="h-5 w-5" />
              Comenzar Prueba Gratuita
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Hablar con un Asesor
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}