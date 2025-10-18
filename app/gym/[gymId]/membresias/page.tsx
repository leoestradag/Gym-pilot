import { PublicNavbar } from "@/components/public-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { gymsData, memberships } from "@/lib/gym-data"

export default function MembershipsPage({ params }: { params: { gymId: string } }) {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Planes de Membresía</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus objetivos y comienza tu transformación hoy
          </p>
        </div>
      </section>

      {/* Memberships Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
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

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Tessalp Gyms. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
