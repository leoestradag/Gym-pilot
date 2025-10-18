import { PublicNavbar } from "@/components/public-navbar"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail } from "lucide-react"
import { gymsData } from "@/lib/gym-data"

export default function ContactPage({ params }: { params: { gymId: string } }) {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Contáctanos</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Estamos aquí para ayudarte a comenzar tu transformación. Ponte en contacto con nosotros
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
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
