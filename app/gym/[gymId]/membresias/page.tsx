"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Star, Users, Clock, Shield, Zap, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { ShoppingCart as ShoppingCartComponent } from "@/components/shopping-cart"

const gymsData = {
  "tessalp-centro": {
    name: "Tessalp Centro",
    location: "Av. Principal 123, Centro",
    phone: "+52 (555) 123-4567",
    email: "centro@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/modern-gym-interior.png",
  },
  "tessalp-norte": {
    name: "Tessalp Norte",
    location: "Blvd. Norte 456, Zona Norte",
    phone: "+52 (555) 234-5678",
    email: "norte@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/fitness-center-equipment.jpg",
  },
  "tessalp-sur": {
    name: "Tessalp Sur",
    location: "Calle Sur 789, Zona Sur",
    phone: "+52 (555) 345-6789",
    email: "sur@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/gym-training-area.jpg",
  },
  "one-gym": {
    name: "One Gym",
    location: "Plaza Galerías, Zona Rosa",
    phone: "+52 (555) 456-7890",
    email: "info@onegym.com",
    hours: "24/7 - Acceso ilimitado todos los días",
    image: "/people-training-in-modern-gym.jpg",
  },
  "world-gym": {
    name: "World Gym",
    location: "Centro Comercial Perisur",
    phone: "+52 (555) 567-8901",
    email: "contacto@worldgym.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 6:00 AM - 10:00 PM",
    image: "/people-training-in-modern-gym.jpg",
  },
  "smartfit": {
    name: "Smart Fit",
    location: "Plaza Satélite",
    phone: "+52 (555) 678-9012",
    email: "atencion@smartfit.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 6:00 AM - 10:00 PM",
    image: "/people-training-in-modern-gym.jpg",
  },
}

const memberships = [
  {
    id: "basico",
    name: "Básico",
    price: 599,
    displayPrice: "$599",
    period: "/mes",
    description: "Perfecto para comenzar tu viaje fitness",
    features: [
      "Acceso al área de pesas",
      "Acceso a cardio", 
      "Casillero personal",
      "Wi-Fi gratuito",
      "Horarios extendidos",
      "App móvil incluida"
    ],
    popular: false,
    color: "border-gray-300"
  },
  {
    id: "premium",
    name: "Premium",
    price: 899,
    displayPrice: "$899",
    period: "/mes",
    description: "La opción más popular para resultados serios",
    features: [
      "Todo lo del plan Básico",
      "Clases grupales ilimitadas",
      "1 sesión de entrenamiento personal/mes",
      "Acceso a zona de spa",
      "Descuentos en productos",
      "Plan nutricional básico",
      "Evaluación física mensual"
    ],
    popular: true,
    color: "border-primary"
  },
  {
    id: "elite",
    name: "Elite",
    price: 1299,
    displayPrice: "$1,299",
    period: "/mes",
    description: "Experiencia premium completa",
    features: [
      "Todo lo del plan Premium",
      "4 sesiones de entrenamiento personal/mes",
      "Plan nutricional personalizado",
      "Acceso prioritario a clases",
      "Invitaciones a eventos exclusivos",
      "Toalla y amenidades premium",
      "Nutricionista personal",
      "Acceso 24/7"
    ],
    popular: false,
    color: "border-yellow-400"
  }
]

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

export default function MembresiasPage({ params }: { params: { gymId: string } }) {
  const gym = gymsData[params.gymId as keyof typeof gymsData]
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  if (!gym) {
    return <div>Gimnasio no encontrado</div>
  }

  const addToCart = (membership: typeof memberships[0]) => {
    const cartItem: CartItem = {
      id: `${params.gymId}-${membership.id}`,
      name: `Membresía ${membership.name}`,
      price: membership.price,
      type: "membership",
      plan: membership.name,
      gymId: params.gymId,
      gymName: gym.name
    }

    setCartItems(prev => {
      // Verificar si ya existe en el carrito
      const existingItem = prev.find(item => item.id === cartItem.id)
      if (existingItem) {
        return prev // No agregar duplicados
      }
      return [...prev, cartItem]
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([])
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
            <Link href={`/gym/${params.gymId}`}>
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