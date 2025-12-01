"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"

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

interface WeeklyClassCalendarProps {
  classes: ClassItem[]
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
const daysOfWeekShort = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const timeSlots = [
  "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
]

export function WeeklyClassCalendar({ classes }: WeeklyClassCalendarProps) {
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week")
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get start of week (Monday)
  const getWeekStart = (date: Date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
    return new Date(d.setDate(diff))
  }

  const weekStart = getWeekStart(currentDate)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart)
    date.setDate(weekStart.getDate() + i)
    return date
  })

  const navigateWeek = (direction: "prev" | "next" | "today") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (direction === "next") {
      newDate.setDate(newDate.getDate() + 7)
    } else {
      newDate.setTime(Date.now())
    }
    setCurrentDate(newDate)
  }

  const getClassesForDayAndTime = (dayName: string, time: string) => {
    return classes.filter((c) => {
      const classTime = c.time.substring(0, 5) // Get HH:MM format
      return c.day === dayName && classTime === time
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  const getDayName = (date: Date) => {
    const dayIndex = date.getDay()
    const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1 // Monday = 0
    return daysOfWeek[adjustedIndex]
  }

  const getDayNumber = (date: Date) => {
    return date.getDate()
  }

  return (
    <div className="space-y-4">
      {/* Header with view selector and navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(v) => setViewMode(v as "day" | "week" | "month")}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Día</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mes</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateWeek("today")}>
              Hoy
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigateWeek("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Badge variant="secondary" className="ml-2">
              {formatDate(weekStart)}
            </Badge>
          </div>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <Card className="border-border/50 bg-card/50 backdrop-blur">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Days Header */}
              <div className="grid grid-cols-8 border-b border-border/50">
                <div className="p-3 border-r border-border/50 bg-muted/30">
                  <span className="text-sm font-medium text-muted-foreground">Hora</span>
                </div>
                {weekDays.map((date, index) => {
                  const dayName = getDayName(date)
                  const dayNumber = getDayNumber(date)
                  const dayShort = daysOfWeekShort[index]
                  const classesCount = classes.filter(c => c.day === dayName).length
                  
                  return (
                    <div
                      key={index}
                      className="p-3 border-r border-border/50 last:border-r-0 text-center bg-muted/20"
                    >
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        {dayShort}
                      </div>
                      <div className="text-lg font-semibold">{dayNumber}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {classesCount} {classesCount === 1 ? "clase" : "clases"}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Time Slots */}
              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b border-border/30 hover:bg-muted/10">
                    {/* Time Column */}
                    <div className="p-2 border-r border-border/50 bg-muted/20 text-sm text-muted-foreground text-center flex items-center justify-center">
                      {time}
                    </div>
                    
                    {/* Day Columns */}
                    {weekDays.map((date, dayIndex) => {
                      const dayName = getDayName(date)
                      const classesAtTime = getClassesForDayAndTime(dayName, time)
                      
                      return (
                        <div
                          key={dayIndex}
                          className="p-2 border-r border-border/50 last:border-r-0 min-h-[60px] flex items-center justify-center"
                        >
                          {classesAtTime.length === 0 ? (
                            <span className="text-xs text-muted-foreground">Libre</span>
                          ) : (
                            <div className="w-full space-y-1">
                              {classesAtTime.map((classItem) => (
                                <div
                                  key={classItem.id}
                                  className={cn(
                                    "p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity",
                                    classItem.color
                                  )}
                                  title={`${classItem.name} - ${classItem.instructor} (${classItem.enrolled}/${classItem.capacity})`}
                                >
                                  <div className="font-semibold truncate">{classItem.name}</div>
                                  <div className="text-[10px] opacity-80 truncate">
                                    {classItem.instructor}
                                  </div>
                                  <div className="text-[10px] opacity-70 mt-0.5">
                                    {classItem.enrolled}/{classItem.capacity}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

