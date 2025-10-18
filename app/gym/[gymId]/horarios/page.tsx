import { PublicNavbar } from "@/components/public-navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { gymsData } from "@/lib/gym-data"

export default function SchedulePage({ params }: { params: { gymId: string } }) {
  const gym = gymsData[params.gymId as keyof typeof gymsData]

  if (!gym) {
    return <div>Gimnasio no encontrado</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavbar gymName={gym.name} gymId={params.gymId} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20" />
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Horarios</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Estamos abiertos cuando tú lo necesitas. Entrena a tu ritmo
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 text-lg">
                <Clock className="h-5 w-5 text-primary" />
                <p>{gym.hours}</p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Horarios de Clases Grupales</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Lunes a Viernes: 6:00 AM - 9:00 PM</p>
                  <p>Sábados: 8:00 AM - 6:00 PM</p>
                  <p>Domingos: 9:00 AM - 2:00 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Entrenamiento Personal</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Disponible con cita previa</p>
                  <p>Lunes a Sábado: 6:00 AM - 9:00 PM</p>
                  <p>Contacta a recepción para agendar</p>
                </div>
              </CardContent>
            </Card>
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
