import { redirect } from "next/navigation"
import { getGymSession } from "@/lib/gym-session"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  CreditCard, 
  Calendar, 
  MapPin, 
  Settings,
  LogOut,
  Dumbbell,
  Heart,
  Clock
} from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/db"

async function getGymData(gymId: number) {
  try {
    if (!prisma || !prisma.gym) {
      return null
    }
    
    const gym = await prisma.gym.findUnique({
      where: { id: gymId },
      include: {
        facilities: true,
        amenities: true,
        membershipPlans: true,
        schedules: true,
      },
    })
    return gym
  } catch (error) {
    console.error("Error fetching gym data", error)
    return null
  }
}

export default async function GymAdminDashboard({
  params,
}: {
  params: Promise<{ gymId: string }>
}) {
  const { gymId } = await params
  const gymSession = await getGymSession()

  // If not authenticated, redirect to verification page
  if (!gymSession) {
    redirect(`/admin/gym/${gymId}/verify`)
  }

  // Check if gym is accessing their own panel
  if (gymSession.id !== Number(gymId)) {
    redirect(`/admin/gym/${gymSession.id}`)
  }

  const gym = await getGymData(gymSession.id)

  if (!gym) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Error al cargar información del gimnasio</div>
      </div>
    )
  }

  const facilitiesCount = gym.facilities?.length || 0
  const amenitiesCount = gym.amenities?.length || 0
  const plansCount = gym.membershipPlans?.length || 0
  const schedulesCount = gym.schedules?.length || 0

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{gym.name}</h1>
              <p className="text-sm text-muted-foreground">Panel Administrativo</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/gym/${gym.slug || gymId}`} target="_blank">
                <Button variant="outline" size="sm">
                  Ver Sitio Público
                </Button>
              </Link>
              <form action="/api/gym/auth/logout" method="POST">
                <Button type="submit" variant="outline" size="sm" className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Instalaciones
              </CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{facilitiesCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Áreas configuradas</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Planes de Membresía
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{plansCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Planes activos</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Amenidades
              </CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{amenitiesCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Servicios adicionales</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Horarios
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{schedulesCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Días configurados</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href={`/admin/gym/${gymId}/instalaciones`}>
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Dumbbell className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Instalaciones</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Gestiona las áreas y equipamiento de tu gimnasio
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/admin/gym/${gymId}/membresias`}>
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Planes de Membresía</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Edita precios y características de tus planes
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/admin/gym/${gymId}/horarios`}>
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Horarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configura los horarios de operación
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/admin/gym/${gymId}/contacto`}>
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Información de Contacto</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Actualiza dirección, teléfono y email
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/admin/gym/${gymId}/configuracion`}>
            <Card className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Settings className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Configuración</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cambia contraseña y configuración general
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Card className="mt-8 border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle>Información del Gimnasio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                <p className="text-foreground">{gym.location}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                <p className="text-foreground">{gym.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-foreground">{gym.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horarios</p>
                <p className="text-foreground">{gym.hours}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
