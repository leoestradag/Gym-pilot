import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, MapPin, Phone, Mail, Calendar, Users } from "lucide-react"
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

const weeklySchedule = {
  "Lunes": [
    { time: "5:00 AM - 6:00 AM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ],
  "Martes": [
    { time: "5:00 AM - 6:00 AM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ],
  "Miércoles": [
    { time: "5:00 AM - 6:00 AM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ],
  "Jueves": [
    { time: "5:00 AM - 6:00 AM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ],
  "Viernes": [
    { time: "5:00 AM - 6:00 AM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ],
  "Sábado": [
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "11:00 AM - 12:00 PM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ],
  "Domingo": [
    { time: "7:00 AM - 8:00 AM", class: "Yoga", instructor: "María González", capacity: "20/25" },
    { time: "8:00 AM - 9:00 AM", class: "Spinning", instructor: "Ana Martínez", capacity: "18/30" },
    { time: "9:00 AM - 10:00 AM", class: "Pilates", instructor: "Sofia Torres", capacity: "12/15" },
    { time: "10:00 AM - 11:00 AM", class: "Aqua Fitness", instructor: "Patricia López", capacity: "14/18" },
    { time: "11:00 AM - 12:00 PM", class: "HIIT", instructor: "Diego Ramírez", capacity: "16/20" },
    { time: "5:00 PM - 6:00 PM", class: "Boxing", instructor: "Miguel Ángel", capacity: "10/15" },
    { time: "6:00 PM - 7:00 PM", class: "CrossFit", instructor: "Carlos Ruiz", capacity: "15/20" },
    { time: "7:00 PM - 8:00 PM", class: "Zumba", instructor: "Laura Pérez", capacity: "22/25" }
  ]
}

export default async function HorariosPage({ params }: { params: Promise<{ gymId: string }> }) {
  const { gymId } = await params
  const gym = gymsData[gymId as keyof typeof gymsData]

  if (!gym) {
    return <div>Gimnasio no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href={`/gym/${gymId}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Gimnasio
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Horarios - {gym.name}</h1>
              <p className="text-muted-foreground">Consulta nuestros horarios de clases y servicios</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Horarios de Clases</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Planifica tu entrenamiento con nuestros horarios semanales
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

      {/* Weekly Schedule */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Horario Semanal</h2>
            <p className="text-muted-foreground">Todas nuestras clases y horarios de la semana</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
            {Object.entries(weeklySchedule).map(([day, classes]) => (
              <Card key={day} className="border-2 border-border/60 bg-card/90 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-center text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {classes.map((clase, index) => (
                    <div key={index} className="p-3 bg-primary/10 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-sm">{clase.class}</span>
                        <Badge variant="secondary" className="text-xs">
                          {clase.capacity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {clase.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {clase.instructor}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gym Hours */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Horarios del Gimnasio</h2>
            <p className="text-muted-foreground">Horarios de atención y servicios</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Clock className="h-6 w-6 text-primary" />
                  Horarios Regulares
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span className="font-semibold">5:00 AM - 11:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span className="font-semibold">7:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="font-semibold">7:00 AM - 9:00 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Entrenadores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Disponibles:</span>
                    <span className="font-semibold">6:00 AM - 10:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Entrenamiento Personal:</span>
                    <span className="font-semibold">Con cita previa</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border/60 bg-card/90 backdrop-blur text-center">
              <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calendar className="h-6 w-6 text-primary" />
                  Servicios Especiales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Spa:</span>
                    <span className="font-semibold">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nutricionista:</span>
                    <span className="font-semibold">Con cita previa</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas más información?</h2>
          <p className="text-muted-foreground mb-8">
            Contáctanos para consultas sobre horarios, reservas o cambios de última hora
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Phone className="h-5 w-5" />
              Llamar Ahora
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Mail className="h-5 w-5" />
              Enviar Email
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Reservar Clase
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}