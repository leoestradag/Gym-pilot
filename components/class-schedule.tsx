"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users } from "lucide-react"

interface ClassItem {
  id: number
  name: string
  instructor: string
  day: string
  time: string
  duration: number
  capacity: number
  enrolled: number
  type: string
  color: string
}

interface ClassScheduleProps {
  classes: ClassItem[]
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

export function ClassSchedule({ classes }: ClassScheduleProps) {
  const getClassesForDay = (day: string) => {
    return classes.filter((c) => c.day === day).sort((a, b) => a.time.localeCompare(b.time))
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {daysOfWeek.map((day) => {
        const dayClasses = getClassesForDay(day)
        return (
          <Card key={day} className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground">{day}</CardTitle>
              <p className="text-xs text-muted-foreground">{dayClasses.length} clases</p>
            </CardHeader>
            <CardContent className="space-y-2">
              {dayClasses.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Sin clases programadas</p>
              ) : (
                dayClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={`p-3 rounded-lg border ${classItem.color} hover:opacity-80 transition-opacity cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm text-foreground">{classItem.name}</h4>
                      {classItem.enrolled >= classItem.capacity && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">Lleno</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{classItem.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {classItem.time} ({classItem.duration}min)
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {classItem.enrolled}/{classItem.capacity}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
