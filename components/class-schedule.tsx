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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
      {daysOfWeek.map((day) => {
        const dayClasses = getClassesForDay(day)
        return (
          <Card key={day} className="border-border/50 bg-card/50 backdrop-blur flex flex-col min-h-[200px]">
            <CardHeader className="pb-3 flex-shrink-0">
              <CardTitle className="text-base text-foreground">{day}</CardTitle>
              <p className="text-xs text-muted-foreground">{dayClasses.length} clases</p>
            </CardHeader>
            <CardContent className="space-y-3 flex-1 overflow-y-auto">
              {dayClasses.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">Sin clases programadas</p>
              ) : (
                dayClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className={`p-3 rounded-lg border ${classItem.color} hover:opacity-80 transition-opacity cursor-pointer min-h-[100px] flex flex-col`}
                  >
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h4 className="font-semibold text-sm text-foreground leading-tight break-words flex-1">{classItem.name}</h4>
                      {classItem.enrolled >= classItem.capacity && (
                        <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs flex-shrink-0">Lleno</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 leading-tight">{classItem.instructor}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground gap-2 mt-auto">
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Clock className="h-3 w-3" />
                        <span className="whitespace-nowrap">{classItem.time}</span>
                        <span className="whitespace-nowrap">({classItem.duration}min)</span>
                      </span>
                      <span className="flex items-center gap-1 flex-shrink-0">
                        <Users className="h-3 w-3" />
                        <span className="whitespace-nowrap">{classItem.enrolled}/{classItem.capacity}</span>
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
