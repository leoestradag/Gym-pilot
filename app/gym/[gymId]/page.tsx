import { CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Phone, Mail, Users, Dumbbell, Heart, ArrowLeft, Home } from "lucide-react"
import { GymNavigation } from "@/components/gym-navigation"
import Link from "next/link"

const gymsData = {
  "tessalp-centro": {
    name: "Tessalp Centro",
    location: "Av. Principal 123, Centro",
    phone: "+52 (555) 123-4567",
    email: "centro@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/modern-gym-interior.png",
    accent: "text-primary",
  },
  "tessalp-norte": {
    name: "Tessalp Norte",
    location: "Blvd. Norte 456, Zona Norte",
    phone: "+52 (555) 234-5678",
    email: "norte@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/fitness-center-equipment.jpg",
    accent: "text-green-500",
  },
  "tessalp-sur": {
    name: "Tessalp Sur",
    location: "Calle Sur 789, Zona Sur",
    phone: "+52 (555) 345-6789",
    email: "sur@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/gym-training-area.jpg",
    accent: "text-orange-500",
  },
  "one-gym": {
    name: "One Gym",
    location: "Plaza Galerías, Zona Rosa",
    phone: "+52 (555) 456-7890",
    email: "info@onegym.com",
    hours: "24/7 - Acceso ilimitado todos los días",
    image: "/people-training-in-modern-gym.jpg",
    accent: "text-blue-500",
  },
  "world-gym": {
    name: "World Gym",
    location: "Centro Comercial Perisur",
    phone: "+52 (555) 567-8901",
    email: "contacto@worldgym.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 6:00 AM - 10:00 PM",
    image: "/people-training-in-modern-gym.jpg",
    accent: "text-amber-500",
  },
  "smartfit": {
    name: "Smart Fit",
    location: "Plaza Satélite",
    phone: "+52 (555) 678-9012",
    email: "atencion@smartfit.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 6:00 AM - 10:00 PM",
    image: "/people-training-in-modern-gym.jpg",
    accent: "text-rose-500",
  },
}



export default async function GymPage({ params }: { params: Promise<{ gymId: string }> }) {
  const { gymId } = await params
  const gym = gymsData[gymId as keyof typeof gymsData]

  if (!gym) {
    return <div>Gimnasio no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <GymNavigation gymId={gymId} />
      
      {/* Hero Section */}
      <section id="inicio" className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/25" />
        <img
          src={gym.image || "/placeholder.svg"}
          alt={gym.name}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* Back Button */}
        <div className="absolute top-6 right-6 z-20">
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur border-border/50 hover:bg-background/90">
              <ArrowLeft className="h-4 w-4" />
              Volver al Inicio
            </Button>
          </Link>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Transforma tu vida en{" "}
            <span className={gym.accent ?? "text-primary"}>{gym.name}</span>
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

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Explora todo lo que tenemos para ofrecerte
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
               <Link href={`/gym/${gymId}/membresias`}>
              <Card className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Dumbbell className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Planes de Membresía</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Elige el plan que mejor se adapte a tus objetivos
                  </p>
                  <Button className="w-full" size="sm">
                    Ver Planes
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/gym/${gymId}/clases`}>
              <Card className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Clases Grupales</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Únete a nuestras clases dirigidas por instructores
                  </p>
                  <Button className="w-full" size="sm">
                    Ver Clases
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/gym/${gymId}/instalaciones`}>
              <Card className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Nuestras Instalaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Conoce nuestras instalaciones de primera clase
                  </p>
                  <Button className="w-full" size="sm">
                    Ver Instalaciones
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/gym/${gymId}/horarios`}>
              <Card className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Horarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Consulta nuestros horarios de clases y servicios
                  </p>
                  <Button className="w-full" size="sm">
                    Ver Horarios
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href={`/gym/${gymId}/contacto`}>
              <Card className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Contáctanos para más información
                  </p>
                  <Button className="w-full" size="sm">
                    Contactar
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Conócenos</h2>
            <p className="text-xl text-muted-foreground text-balance">
              Descubre la historia y valores de {gym.name}
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Nuestra Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{gym.location}</p>
                <p className="text-sm text-muted-foreground">
                  Ubicado estratégicamente para brindarte fácil acceso y comodidad en tu rutina diaria.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{gym.hours}</p>
                <p className="text-sm text-muted-foreground">
                  Horarios flexibles diseñados para adaptarse a tu estilo de vida y compromisos.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-6 w-6 text-primary" />
                  Contacto Directo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{gym.phone}</p>
                <p className="text-muted-foreground mb-4">{gym.email}</p>
                <p className="text-sm text-muted-foreground">
                  Nuestro equipo está siempre disponible para resolver tus dudas y brindarte el mejor servicio.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Nuestra Historia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-center">
                  {gym.name} forma parte de la familia Tessalp Gyms, una red de gimnasios comprometida 
                  con la transformación de vidas a través del fitness y el bienestar integral.
                </p>
                <p className="text-muted-foreground text-center">
                  Desde nuestros inicios, nos hemos dedicado a crear un ambiente donde cada miembro 
                  pueda alcanzar sus metas fitness, rodeado de equipamiento de última generación, 
                  entrenadores certificados y una comunidad que te apoya en cada paso del camino.
                </p>
                <div className="grid gap-4 md:grid-cols-3 mt-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">5+</div>
                    <p className="text-sm text-muted-foreground">Años de experiencia</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">500+</div>
                    <p className="text-sm text-muted-foreground">Miembros activos</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">15+</div>
                    <p className="text-sm text-muted-foreground">Entrenadores certificados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para comenzar tu transformación?</h3>
            <p className="text-muted-foreground mb-8">
              Únete a nuestra comunidad y descubre todo lo que {gym.name} tiene para ofrecerte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Agendar Visita
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                <Phone className="h-5 w-5" />
                Llamar Ahora
              </Button>
            </div>
          </div>
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
