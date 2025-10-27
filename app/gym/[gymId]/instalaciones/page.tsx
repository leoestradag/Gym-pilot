import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Clock, Wifi, Car, Dumbbell, Heart, Shield, Users } from "lucide-react"
import Link from "next/link"

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

const facilities = [
  {
    name: "Área de Pesas",
    description: "Equipamiento completo de pesas libres y máquinas de última generación",
    image: "/modern-gym-interior.png",
    features: ["Bancos ajustables", "Racks de sentadillas", "Máquinas de cable", "Pesas libres"],
    icon: <Dumbbell className="h-8 w-8" />
  },
  {
    name: "Zona de Cardio",
    description: "Máquinas de cardio de última tecnología para tu entrenamiento cardiovascular",
    image: "/fitness-center-equipment.jpg",
    features: ["Caminadoras", "Bicicletas estáticas", "Elípticas", "Remos"],
    icon: <Heart className="h-8 w-8" />
  },
  {
    name: "Área Funcional",
    description: "Espacio dedicado al entrenamiento funcional y CrossFit",
    image: "/gym-training-area.jpg",
    features: ["Césped artificial", "Cuerdas de batalla", "Kettlebells", "Barras olímpicas"],
    icon: <Shield className="h-8 w-8" />
  },
  {
    name: "Estudio de Yoga",
    description: "Ambiente tranquilo y relajante para clases de yoga y pilates",
    image: "/people-training-in-modern-gym.jpg",
    features: ["Espejos completos", "Mats de yoga", "Ambiente climatizado", "Música ambiental"],
    icon: <Users className="h-8 w-8" />
  }
]

const amenities = [
  { 
    name: "Wi-Fi Gratuito", 
    icon: <Wifi className="h-5 w-5" />, 
    description: "Internet de alta velocidad en toda la instalación",
    image: "/wifi-icon.png"
  },
  { 
    name: "Estacionamiento", 
    icon: <Car className="h-5 w-5" />, 
    description: "Estacionamiento gratuito para todos los miembros",
    image: "/modern-gym-interior.png"
  },
  { 
    name: "Lockers", 
    icon: <Shield className="h-5 w-5" />, 
    description: "Casilleros seguros con cerradura digital",
    image: "/gym-training-area.jpg"
  },
  { 
    name: "Vestidores", 
    icon: <Users className="h-5 w-5" />, 
    description: "Vestidores amplios con duchas y regaderas",
    image: "/people-training-in-modern-gym.jpg"
  },
  { 
    name: "Spa", 
    icon: <Heart className="h-5 w-5" />, 
    description: "Área de relajación con sauna y jacuzzi",
    image: "/fitness-center-equipment.jpg"
  },
  { 
    name: "Cafetería", 
    icon: <Dumbbell className="h-5 w-5" />, 
    description: "Cafetería saludable con opciones nutritivas",
    image: "/gym-training-area.jpg"
  }
]

export default function InstalacionesPage({ params }: { params: { gymId: string } }) {
  const gym = gymsData[params.gymId as keyof typeof gymsData]

  if (!gym) {
    return <div>Gimnasio no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
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
              <h1 className="text-3xl font-bold">Nuestras Instalaciones - {gym.name}</h1>
              <p className="text-muted-foreground">Conoce nuestras instalaciones de primera clase</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Nuestras Instalaciones</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Espacios diseñados para tu comodidad y rendimiento
          </p>
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{gym.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{gym.hours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2">
            {facilities.map((facility) => (
              <Card key={facility.name} className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                <img src={facility.image} alt={facility.name} className="w-full h-64 object-cover" />
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-primary">{facility.icon}</div>
                    <CardTitle className="text-2xl">{facility.name}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{facility.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Equipamiento incluido:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {facility.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Amenidades Incluidas</h2>
            <p className="text-muted-foreground">Servicios adicionales para tu comodidad</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {amenities.map((amenity) => (
              <Card key={amenity.name} className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                <img src={amenity.image} alt={amenity.name} className="w-full h-48 object-cover" />
                <CardContent className="pt-6">
                  <div className="text-primary mb-4 flex justify-center">
                    {amenity.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-center">{amenity.name}</h3>
                  <p className="text-sm text-muted-foreground text-center">{amenity.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tour Virtual</h2>
            <p className="text-muted-foreground">Explora nuestras instalaciones desde casa</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden">
              <img src="/modern-gym-interior.png" alt="Tour Virtual" className="w-full h-64 object-cover" />
              <CardHeader>
                <CardTitle>Recorrido 360°</CardTitle>
                <p className="text-muted-foreground">Explora cada rincón de nuestras instalaciones</p>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Iniciar Tour Virtual</Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur overflow-hidden">
              <img src="/fitness-center-equipment.jpg" alt="Galería" className="w-full h-64 object-cover" />
              <CardHeader>
                <CardTitle>Galería de Fotos</CardTitle>
                <p className="text-muted-foreground">Mira las mejores fotos de nuestras instalaciones</p>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Ver Galería</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres conocer nuestras instalaciones?</h2>
          <p className="text-muted-foreground mb-8">
            Agenda una visita guiada y conoce todo lo que tenemos para ofrecerte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <MapPin className="h-5 w-5" />
              Agendar Visita
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Clock className="h-5 w-5" />
              Consultar Horarios
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}