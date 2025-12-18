"use client"

import { useState, useEffect } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { StatsCard } from "@/components/stats-card"
import { Users, CheckCircle, DollarSign, TrendingUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardStats {
  activeMembers: {
    value: number
    trend: number
  }
  todayCheckins: {
    value: number
    trend: number
  }
  monthlyRevenue: {
    value: number
    trend: number
  }
  newMemberships: {
    value: number
    trend: number
  }
  weeklyAttendance: {
    Lun: number
    Mar: number
    Mié: number
    Jue: number
    Vie: number
    Sáb: number
    Dom: number
  }
  totalMembers: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        console.error("Error loading stats")
        // En caso de error, usar valores en 0
        setStats({
          activeMembers: { value: 0, trend: 0 },
          todayCheckins: { value: 0, trend: 0 },
          monthlyRevenue: { value: 0, trend: 0 },
          newMemberships: { value: 0, trend: 0 },
          weeklyAttendance: {
            Lun: 0,
            Mar: 0,
            Mié: 0,
            Jue: 0,
            Vie: 0,
            Sáb: 0,
            Dom: 0,
          },
          totalMembers: 0,
        })
      }
    } catch (error) {
      console.error("Error loading stats", error)
      setStats({
        activeMembers: { value: 0, trend: 0 },
        todayCheckins: { value: 0, trend: 0 },
        monthlyRevenue: { value: 0, trend: 0 },
        newMemberships: { value: 0, trend: 0 },
        weeklyAttendance: {
          Lun: 0,
          Mar: 0,
          Mié: 0,
          Jue: 0,
          Vie: 0,
          Sáb: 0,
          Dom: 0,
        },
        totalMembers: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Cargando estadísticas...</span>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Miembros Activos"
                value={stats?.activeMembers.value ?? 0}
                icon={Users}
                description="Total de miembros con membresía activa"
                trend={{ value: stats?.activeMembers.trend ?? 0, isPositive: (stats?.activeMembers.trend ?? 0) >= 0 }}
              />
              <StatsCard
                title="Check-ins de Hoy"
                value={stats?.todayCheckins.value ?? 0}
                icon={CheckCircle}
                description="Asistencias registradas hoy"
                trend={{ value: stats?.todayCheckins.trend ?? 0, isPositive: (stats?.todayCheckins.trend ?? 0) >= 0 }}
              />
              <StatsCard
                title="Ingresos del Mes"
                value={`$${Math.round(stats?.monthlyRevenue.value ?? 0).toLocaleString()}`}
                icon={DollarSign}
                description="Ingresos totales del mes actual"
                trend={{ value: stats?.monthlyRevenue.trend ?? 0, isPositive: (stats?.monthlyRevenue.trend ?? 0) >= 0 }}
              />
              <StatsCard
                title="Nuevas Membresías"
                value={stats?.newMemberships.value ?? 0}
                icon={TrendingUp}
                description="Membresías vendidas este mes"
                trend={{ value: stats?.newMemberships.trend ?? 0, isPositive: (stats?.newMemberships.trend ?? 0) >= 0 }}
              />
            </div>

            {/* Weekly Attendance Summary */}
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-foreground">Asistencia Semanal</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{stats?.totalMembers ?? 0}</span> miembros inscritos
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Lun ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Lun</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Mar ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Mar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Mié ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Mié</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Jue ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Jue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Vie ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Vie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Sáb ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Sáb</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{stats?.weeklyAttendance.Dom ?? 0}</div>
                    <div className="text-sm text-muted-foreground">Dom</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

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
