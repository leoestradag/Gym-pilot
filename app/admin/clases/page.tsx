"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, CalendarIcon, Users, Clock } from "lucide-react"
import { useState } from "react"
import { ClassDialog } from "@/components/class-dialog"
import { WeeklyClassCalendar } from "@/components/weekly-class-calendar"

// Initial mock classes data
const initialClasses = [
  {
    id: 1,
    name: "Yoga Matutino",
    instructor: "Ana López",
    day: "Lunes",
    time: "07:00",
    duration: 60,
    capacity: 20,
    enrolled: 18,
    type: "Yoga",
    color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  {
    id: 2,
    name: "Spinning",
    instructor: "María González",
    day: "Martes",
    time: "06:30",
    duration: 45,
    capacity: 25,
    enrolled: 22,
    type: "Cardio",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  {
    id: 3,
    name: "Pilates",
    instructor: "Ana López",
    day: "Miércoles",
    time: "10:00",
    duration: 60,
    capacity: 15,
    enrolled: 12,
    type: "Pilates",
    color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  },
]

const classTypes = ["Todos", "Yoga", "CrossFit", "Cardio", "Pilates", "Baile"]

// Color mapping for class types
const getClassColor = (type: string) => {
  const colorMap: { [key: string]: string } = {
    Yoga: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    CrossFit: "bg-red-500/10 text-red-500 border-red-500/20",
    Cardio: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Pilates: "bg-pink-500/10 text-pink-500 border-pink-500/20",
    Baile: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Funcional: "bg-green-500/10 text-green-500 border-green-500/20",
  }
  return colorMap[type] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
}

// Instructor mapping
const instructorMap: { [key: string]: string } = {
  ana: "Ana López",
  carlos: "Carlos Mendoza",
  maria: "María González",
  pedro: "Pedro Sánchez",
}

// Day mapping
const dayMap: { [key: string]: string } = {
  lunes: "Lunes",
  martes: "Martes",
  miercoles: "Miércoles",
  jueves: "Jueves",
  viernes: "Viernes",
  sabado: "Sábado",
  domingo: "Domingo",
}

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("Todos")

  const filteredClasses = selectedType === "Todos" ? classes : classes.filter((c) => c.type === selectedType)

  const handleAddClass = (newClassData: {
    name: string
    instructor: string
    day: string
    time: string
    duration: string
    capacity: string
  }) => {
    const newClass = {
      id: Math.max(...classes.map((c) => c.id), 0) + 1,
      name: newClassData.name,
      instructor: instructorMap[newClassData.instructor] || newClassData.instructor,
      day: dayMap[newClassData.day] || newClassData.day,
      time: newClassData.time.substring(0, 5), // Format HH:MM
      duration: parseInt(newClassData.duration),
      capacity: parseInt(newClassData.capacity),
      enrolled: 0,
      type: "General", // Default type since we removed the type field
      color: getClassColor("General"),
    }
    setClasses([...classes, newClass])
  }

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Clases</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Nueva Clase
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-muted-foreground">Clases Activas</CardTitle>
              <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-foreground">{classes.length}</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-muted-foreground">Total Inscritos</CardTitle>
              <Users className="h-3.5 w-3.5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-foreground">
                {classes.reduce((acc, c) => acc + c.enrolled, 0)}
              </div>
              <p className="text-[10px] text-primary mt-0.5">+24 esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1.5 px-4 pt-4">
              <CardTitle className="text-xs font-medium text-muted-foreground">Ocupación Promedio</CardTitle>
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-xl font-bold text-foreground">87%</div>
              <p className="text-[10px] text-primary mt-0.5">+5% vs semana anterior</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Calendar */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-foreground">Horario Semanal</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Clases para {new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <WeeklyClassCalendar classes={classes} />
          </CardContent>
        </Card>

        {/* Classes List */}
        <Card className="border-border/50 bg-card/50 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-foreground">Todas las Clases</CardTitle>
              <div className="flex gap-2">
                {classTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                    className={selectedType !== type ? "bg-transparent" : ""}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-lg ${classItem.color} flex items-center justify-center`}>
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{classItem.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {classItem.type}
                        </Badge>
                        {classItem.enrolled >= classItem.capacity && (
                          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs">Lleno</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>{classItem.instructor}</span>
                        <span>•</span>
                        <span>
                          {classItem.day} {classItem.time}
                        </span>
                        <span>•</span>
                        <span>{classItem.duration} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">
                          {classItem.enrolled}/{classItem.capacity}
                        </span>
                      </div>
                      <div className="w-24 h-2 bg-muted rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(classItem.enrolled / classItem.capacity) * 100}%` }}
                        />
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="bg-transparent">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <ClassDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddClass={handleAddClass} />
    </>
  )
}
