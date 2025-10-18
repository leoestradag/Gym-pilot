import { PublicNavbar } from "@/components/public-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import { gymsData, classes } from "@/lib/gym-data"

export default function ClassesPage({ params }: { params: { gymId: string } }) {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Clases Grupales</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Variedad de clases para todos los niveles y objetivos. Entrena con energía y motivación
          </p>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
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

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 px-4 bg-card/30">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Tessalp Gyms. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
