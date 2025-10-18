import { CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Clock, MapPin, Phone, Mail, Users, Dumbbell, Heart } from "lucide-react"

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
}

const memberships = [
  {
    name: "Básico",
    price: "$599",
    period: "/mes",
    description: "Perfecto para comenzar tu viaje fitness",
    features: ["Acceso al área de pesas", "Acceso a cardio", "Casillero personal", "Wi-Fi gratuito"],
  },
  {
    name: "Premium",
    price: "$899",
    period: "/mes",
    description: "La opción más popular para resultados serios",
    features: [
      "Todo lo del plan Básico",
      "Clases grupales ilimitadas",
      "1 sesión de entrenamiento personal/mes",
      "Acceso a zona de spa",
      "Descuentos en productos",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "$1,299",
    period: "/mes",
    description: "Experiencia premium completa",
    features: [
      "Todo lo del plan Premium",
      "4 sesiones de entrenamiento personal/mes",
      "Plan nutricional personalizado",
      "Acceso prioritario a clases",
      "Invitaciones a eventos exclusivos",
      "Toalla y amenidades premium",
    ],
  },
]

const classes = [
  { name: "Yoga", time: "7:00 AM - 8:00 AM", instructor: "María González", capacity: "20/25" },
  { name: "CrossFit", time: "6:00 PM - 7:00 PM", instructor: "Carlos Ruiz", capacity: "15/20" },
  { name: "Spinning", time: "8:00 AM - 9:00 AM", instructor: "Ana Martínez", capacity: "18/30" },
  { name: "Zumba", time: "7:00 PM - 8:00 PM", instructor: "Laura Pérez", capacity: "22/25" },
  { name: "Pilates", time: "9:00 AM - 10:00 AM", instructor: "Sofia Torres", capacity: "12/15" },
  { name: "Boxing", time: "5:00 PM - 6:00 PM", instructor: "Miguel Ángel", capacity: "10/15" },
]

export default function GymPage({ params }: { params: { gymId: string } }) {
  const gym = gymsData[params.gymId as keyof typeof gymsData]

  if (!gym) {
    return <div>Gimnasio no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="inicio" className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20" />
        <img
          src={gym.image || "/placeholder.svg"}
          alt={gym.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Transforma tu vida en <span className="text-primary">{gym.name}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Equipamiento de última generación, entrenadores certificados y una comunidad que te apoya
          </p>
          <Button size="lg" className="text-lg px-8 py-6">
            Agenda tu clase de prueba gratis
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
              <CardHeader>
                <Dumbbell className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Equipamiento Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Máquinas de última generación y pesas de calidad profesional</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Entrenadores Certificados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Profesionales dedicados a ayudarte a alcanzar tus metas</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Comunidad Motivadora</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Únete a una familia fitness que te impulsa a ser mejor cada día</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Memberships Section */}
      <section id="membresias" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Planes de Membresía</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Elige el plan que mejor se adapte a tus objetivos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {memberships.map((plan) => (
              <Card
                key={plan.name}
                className={`border-border/50 bg-card/50 backdrop-blur relative ${
                  plan.popular ? "border-primary/50 shadow-lg shadow-primary/20" : ""
                }`}
              >
                {plan.popular && <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Más Popular</Badge>}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Seleccionar Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section id="clases" className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Clases Grupales</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Variedad de clases para todos los niveles y objetivos
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((classItem) => (
              <Card key={classItem.name} className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{classItem.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4" />
                        {classItem.time}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{classItem.capacity}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Instructor: {classItem.instructor}</p>
                  <Button className="w-full" size="sm">
                    Reservar Clase
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installations Section */}
      <section id="instalaciones" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestras Instalaciones</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Espacios diseñados para tu comodidad y rendimiento
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <img src="/modern-gym-interior.png" alt="Área de pesas" className="w-full h-64 object-cover" />
              <CardHeader>
                <CardTitle>Área de Pesas</CardTitle>
                <CardDescription>Equipamiento completo de pesas libres y máquinas de última generación</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <img src="/fitness-center-equipment.jpg" alt="Zona de cardio" className="w-full h-64 object-cover" />
              <CardHeader>
                <CardTitle>Zona de Cardio</CardTitle>
                <CardDescription>Caminadoras, elípticas y bicicletas con pantallas interactivas</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="horarios" className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Horarios</h2>
          <Card className="border-border/50 bg-card/50 backdrop-blur mt-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                <p>{gym.hours}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Contáctanos</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Estamos aquí para ayudarte a comenzar tu transformación
            </p>
          </div>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center text-center gap-2">
                  <MapPin className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Ubicación</h3>
                  <p className="text-sm text-muted-foreground">{gym.location}</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Phone className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Teléfono</h3>
                  <p className="text-sm text-muted-foreground">{gym.phone}</p>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Mail className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-muted-foreground">{gym.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Tessalp Gyms. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
