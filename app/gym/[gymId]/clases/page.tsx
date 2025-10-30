import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, Star, ArrowLeft, Calendar, MapPin } from "lucide-react"
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

const classes = [
  { name: "Yoga", time: "7:00 AM - 8:00 AM", instructor: "María González", capacity: "20/25", difficulty: "Principiante", description: "Clase de yoga para todos los niveles, enfocada en flexibilidad y relajación." },
  { name: "CrossFit", time: "6:00 PM - 7:00 PM", instructor: "Carlos Ruiz", capacity: "15/20", difficulty: "Avanzado", description: "Entrenamiento funcional de alta intensidad que combina fuerza y cardio." },
  { name: "Spinning", time: "8:00 AM - 9:00 AM", instructor: "Ana Martínez", capacity: "18/30", difficulty: "Intermedio", description: "Clase de ciclismo indoor con música motivacional y diferentes intensidades." },
  { name: "Zumba", time: "7:00 PM - 8:00 PM", instructor: "Laura Pérez", capacity: "22/25", difficulty: "Principiante", description: "Baile fitness que combina movimientos de baile con ejercicios aeróbicos." },
  { name: "Pilates", time: "9:00 AM - 10:00 AM", instructor: "Sofia Torres", capacity: "12/15", difficulty: "Intermedio", description: "Método de ejercicio que se centra en el fortalecimiento del core y la flexibilidad." },
  { name: "Boxing", time: "5:00 PM - 6:00 PM", instructor: "Miguel Ángel", capacity: "10/15", difficulty: "Avanzado", description: "Entrenamiento de boxeo que combina técnica, cardio y fuerza." },
  { name: "HIIT", time: "6:30 AM - 7:30 AM", instructor: "Diego Ramírez", capacity: "16/20", difficulty: "Avanzado", description: "Entrenamiento de intervalos de alta intensidad para quemar grasa y mejorar condición física." },
  { name: "Aqua Fitness", time: "10:00 AM - 11:00 AM", instructor: "Patricia López", capacity: "14/18", difficulty: "Principiante", description: "Ejercicios en agua que reducen el impacto en las articulaciones." },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Principiante":
      return "bg-green-100 text-green-800"
    case "Intermedio":
      return "bg-yellow-100 text-yellow-800"
    case "Avanzado":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default async function ClasesPage({ params }: { params: Promise<{ gymId: string }> }) {
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
              <h1 className="text-3xl font-bold">Clases Grupales - {gym.name}</h1>
              <p className="text-muted-foreground">Descubre nuestras clases y reserva tu lugar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Clases Grupales</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a nuestras clases dirigidas por instructores certificados
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

      {/* Classes Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {classes.map((clase) => (
              <Card key={clase.name} className="border-2 border-border/60 bg-card/90 backdrop-blur hover:border-primary/60 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{clase.name}</CardTitle>
                    <Badge className={getDifficultyColor(clase.difficulty)}>
                      {clase.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {clase.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {clase.capacity}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Instructor: {clase.instructor}</h4>
                    <p className="text-sm text-muted-foreground">{clase.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Reservar Clase</Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Horario Semanal</h2>
            <p className="text-muted-foreground">Consulta nuestros horarios de clases</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-7">
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
              <Card key={day} className="text-center">
                <CardHeader>
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="p-2 bg-primary/10 rounded">Yoga 7:00 AM</div>
                    <div className="p-2 bg-accent/10 rounded">Spinning 8:00 AM</div>
                    <div className="p-2 bg-primary/10 rounded">Pilates 9:00 AM</div>
                    <div className="p-2 bg-accent/10 rounded">Aqua Fitness 10:00 AM</div>
                    <div className="p-2 bg-primary/10 rounded">HIIT 6:30 AM</div>
                    <div className="p-2 bg-accent/10 rounded">Boxing 5:00 PM</div>
                    <div className="p-2 bg-primary/10 rounded">CrossFit 6:00 PM</div>
                    <div className="p-2 bg-accent/10 rounded">Zumba 7:00 PM</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes preguntas sobre nuestras clases?</h2>
          <p className="text-muted-foreground mb-8">
            Contáctanos para más información sobre horarios, reservas y clases especiales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2">
              <Calendar className="h-5 w-5" />
              Reservar Clase
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Consultar Disponibilidad
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}