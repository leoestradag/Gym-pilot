import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Users, Star, ArrowRight, Dumbbell } from "lucide-react"
import Link from "next/link"

const gyms = [
  {
    id: "tessalp-centro",
    name: "Tessalp Centro",
    location: "Av. Principal 123, Centro",
    members: 450,
    rating: 4.8,
    image: "/modern-gym-interior.png",
    description: "Nuestro gimnasio insignia con equipamiento de última generación",
  },
  {
    id: "tessalp-norte",
    name: "Tessalp Norte",
    location: "Blvd. Norte 456, Zona Norte",
    members: 320,
    rating: 4.7,
    image: "/fitness-center-equipment.jpg",
    description: "Amplio espacio con área de crossfit y clases grupales",
  },
  {
    id: "tessalp-sur",
    name: "Tessalp Sur",
    location: "Calle Sur 789, Zona Sur",
    members: 280,
    rating: 4.9,
    image: "/gym-training-area.jpg",
    description: "Ambiente familiar con entrenadores personalizados",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20" />
        <img
          src="/people-training-in-modern-gym.jpg"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Dumbbell className="h-12 w-12 text-primary" />
            <h1 className="text-5xl md:text-7xl font-bold text-balance">
              Gym<span className="text-primary">Pilot</span>
            </h1>
          </div>
          <p className="text-sm md:text-base text-muted-foreground/60 mb-6 uppercase tracking-wider">
            Powered by Tessalps Gym Efficency
          </p>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
            Los sueños se planean y se construyen día a día
          </p>
          <p className="text-lg text-muted-foreground/80 mb-12 text-balance">Nosotros te acompañamos en cada paso</p>
          <Button size="lg" className="text-lg px-8 py-6 gap-2">
            Entrena con nosotros
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Gym Selection Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Elige tu gimnasio</h2>
            <p className="text-xl text-muted-foreground text-balance">Encuentra la ubicación más cercana a ti</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gyms.map((gym) => (
              <Card
                key={gym.id}
                className="border-border/50 bg-card/50 backdrop-blur overflow-hidden hover:border-primary/50 transition-colors"
              >
                <img src={gym.image || "/placeholder.svg"} alt={gym.name} className="w-full h-48 object-cover" />
                <CardHeader>
                  <CardTitle className="text-2xl">{gym.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2 text-base">
                    <MapPin className="h-4 w-4" />
                    {gym.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{gym.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{gym.members} miembros</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="font-semibold">{gym.rating}</span>
                    </div>
                  </div>
                  <Link href={`/gym/${gym.id}`} className="block">
                    <Button className="w-full gap-2">
                      Ver más información
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Eres dueño de un gimnasio?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-balance">
            Accede a nuestro panel administrativo para gestionar tu gimnasio
          </p>
          <Link href="/admin">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Acceder al Panel Administrativo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
