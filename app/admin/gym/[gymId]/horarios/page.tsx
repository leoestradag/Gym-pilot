"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Clock, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Schedule = {
  id: number
  dayOfWeek: string
  openTime: string
  closeTime: string
  isClosed: boolean
}

const DAYS_OF_WEEK = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
]

export default function SchedulesPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const gymId = params.gymId as string

  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSchedules()
  }, [])

  const loadSchedules = async () => {
    try {
      const response = await fetch(`/api/gym/${gymId}/schedules`)
      if (response.ok) {
        const data = await response.json()
        setSchedules(data)
      } else {
        // Initialize with default schedules if none exist
        const defaultSchedules = DAYS_OF_WEEK.map((day) => ({
          id: 0,
          dayOfWeek: day,
          openTime: "06:00",
          closeTime: "22:00",
          isClosed: false,
        }))
        setSchedules(defaultSchedules)
      }
    } catch (error) {
      console.error("Error loading schedules", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los horarios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleScheduleChange = (dayOfWeek: string, field: string, value: string | boolean) => {
    setSchedules((prev) =>
      prev.map((schedule) =>
        schedule.dayOfWeek === dayOfWeek
          ? { ...schedule, [field]: value }
          : schedule
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch(`/api/gym/${gymId}/schedules`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ schedules }),
      })

      if (!response.ok) {
        throw new Error("Error al guardar")
      }

      toast({
        title: "Horarios actualizados",
        description: "Los cambios se han guardado exitosamente",
      })

      loadSchedules()
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los horarios",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href={`/admin/gym/${gymId}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Horarios de Operación</h1>
              <p className="text-sm text-muted-foreground">Configura los horarios de tu gimnasio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando horarios...</p>
          </div>
        ) : (
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Horarios Semanales</CardTitle>
                </div>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {DAYS_OF_WEEK.map((day) => {
                  const schedule = schedules.find((s) => s.dayOfWeek === day) || {
                    id: 0,
                    dayOfWeek: day,
                    openTime: "06:00",
                    closeTime: "22:00",
                    isClosed: false,
                  }

                  return (
                    <div
                      key={day}
                      className="flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/30"
                    >
                      <div className="w-24">
                        <Label className="font-medium">{day}</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm text-muted-foreground">Cerrado</Label>
                        <Switch
                          checked={schedule.isClosed}
                          onCheckedChange={(checked) =>
                            handleScheduleChange(day, "isClosed", checked)
                          }
                        />
                      </div>
                      {!schedule.isClosed && (
                        <>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`${day}-open`} className="text-sm">
                              Apertura:
                            </Label>
                            <Input
                              id={`${day}-open`}
                              type="time"
                              value={schedule.openTime}
                              onChange={(e) =>
                                handleScheduleChange(day, "openTime", e.target.value)
                              }
                              className="w-32"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`${day}-close`} className="text-sm">
                              Cierre:
                            </Label>
                            <Input
                              id={`${day}-close`}
                              type="time"
                              value={schedule.closeTime}
                              onChange={(e) =>
                                handleScheduleChange(day, "closeTime", e.target.value)
                              }
                              className="w-32"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}


