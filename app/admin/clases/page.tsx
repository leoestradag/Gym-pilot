"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, CalendarIcon, Users, Clock } from "lucide-react"
import { useState } from "react"
import { ClassDialog } from "@/components/class-dialog"
import { ClassSchedule } from "@/components/class-schedule"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock classes data
const mockClasses = [
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

export default function ClassesPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("Todos")

  const filteredClasses = selectedType === "Todos" ? mockClasses : mockClasses.filter((c) => c.type === selectedType)

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
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clases Activas</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockClasses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Inscritos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockClasses.reduce((acc, c) => acc + c.enrolled, 0)}
              </div>
              <p className="text-xs text-primary mt-1">+24 esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ocupación Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">87%</div>
              <p className="text-xs text-primary mt-1">+5% vs semana anterior</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Clases Llenas</CardTitle>
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

        {/* Classes View */}
        <Tabs defaultValue="schedule" className="space-y-4">
          <TabsList>
            <TabsTrigger value="schedule">Horario Semanal</TabsTrigger>
            <TabsTrigger value="list">Lista de Clases</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="space-y-4">
            <ClassSchedule classes={mockClasses} />
          </TabsContent>

          <TabsContent value="list" className="space-y-4">
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
          </TabsContent>
        </Tabs>
      </div>

      <ClassDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  )
}
