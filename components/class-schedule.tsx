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
    <div className="grid grid-cols-7 gap-3 w-full">
      {daysOfWeek.map((day) => {
        const dayClasses = getClassesForDay(day)
        return (
          <Card key={day} className="border-border/50 bg-card/50 backdrop-blur flex flex-col min-h-[250px]">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-sm font-semibold text-foreground">{day}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">{dayClasses.length} clases</p>
            </CardHeader>
            <CardContent className="space-y-2 flex-1 overflow-y-auto p-3">
              {dayClasses.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">Sin clases programadas</p>
              ) : (
                dayClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={`p-2 rounded-lg border ${classItem.color} hover:opacity-80 transition-opacity cursor-pointer flex flex-col`}
                  >
                    <div className="flex items-start justify-between mb-1 gap-1">
                      <h4 className="font-semibold text-xs text-foreground leading-tight break-words flex-1">{classItem.name}</h4>
                      {classItem.enrolled >= classItem.capacity && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-[10px] px-1 py-0 flex-shrink-0">Lleno</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground mb-1 leading-tight truncate">{classItem.instructor}</p>
                    <div className="flex flex-col gap-1 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{classItem.time} ({classItem.duration}min)</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-2.5 w-2.5" />
                        <span>{classItem.enrolled}/{classItem.capacity}</span>
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
