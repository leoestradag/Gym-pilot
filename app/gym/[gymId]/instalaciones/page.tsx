import { PublicNavbar } from "@/components/public-navbar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { gymsData } from "@/lib/gym-data"

export default function InstallationsPage({ params }: { params: { gymId: string } }) {
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Nuestras Instalaciones</h1>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Espacios diseñados para tu comodidad y rendimiento máximo
          </p>
        </div>
      </section>

      {/* Installations Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
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
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <img src="/gym-training-area.jpg" alt="Área funcional" className="w-full h-64 object-cover" />
              <CardHeader>
                <CardTitle>Área Funcional</CardTitle>
                <CardDescription>Espacio amplio para entrenamiento funcional y ejercicios de movilidad</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur overflow-hidden">
              <img
                src="/people-training-in-modern-gym.jpg"
                alt="Salón de clases"
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <CardTitle>Salón de Clases</CardTitle>
                <CardDescription>Espacios acondicionados para clases grupales con audio profesional</CardDescription>
              </CardHeader>
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
