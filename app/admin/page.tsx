import { SidebarTrigger } from "@/components/ui/sidebar"
import { StatsCard } from "@/components/stats-card"
import { Users, CheckCircle, DollarSign, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStats } from "@/lib/db"

export default function AdminDashboardPage() {
  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Miembros Activos"
            value={mockStats.activeMembers}
            icon={Users}
            description="Total de miembros con membresía activa"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Check-ins de Hoy"
            value={mockStats.todayCheckins}
            icon={CheckCircle}
            description="Asistencias registradas hoy"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Ingresos del Mes"
            value={`$${mockStats.monthlyRevenue.toLocaleString()}`}
            icon={DollarSign}
            description="Ingresos totales del mes actual"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Nuevas Membresías"
            value={mockStats.newMemberships}
            icon={TrendingUp}
            description="Membresías vendidas este mes"
            trend={{ value: 20, isPositive: true }}
          />
        </div>

        {/* Weekly Attendance Summary */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Asistencia Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">85</div>
                <div className="text-sm text-muted-foreground">Lun</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">92</div>
                <div className="text-sm text-muted-foreground">Mar</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">78</div>
                <div className="text-sm text-muted-foreground">Mié</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">88</div>
                <div className="text-sm text-muted-foreground">Jue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95</div>
                <div className="text-sm text-muted-foreground">Vie</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">67</div>
                <div className="text-sm text-muted-foreground">Sáb</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-sm text-muted-foreground">Dom</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Registrar Miembro</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <CheckCircle className="h-6 w-6" />
              <span>Check-in Manual</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <TrendingUp className="h-6 w-6" />
              <span>Ver Reportes</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
