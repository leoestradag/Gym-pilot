import { SidebarTrigger } from "@/components/ui/sidebar"
import { StatsCard } from "@/components/stats-card"
import { Users, CheckCircle, DollarSign, TrendingUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockStats, mockWeeklyAttendance } from "@/lib/db"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export default function AdminDashboardPage() {
  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Clase
            </Button>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              Nuevo Instructor
            </Button>
          </div>
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

        {/* Weekly Attendance Chart */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-foreground">Asistencia Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockWeeklyAttendance}>
                <XAxis
                  dataKey="day"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
