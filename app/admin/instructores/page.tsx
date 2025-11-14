"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Award, Users, Star, Calendar, PhoneCall, Mail } from "lucide-react"

const mockInstructors = [
  {
    id: 1,
    name: "Carlos Mendoza",
    specialty: "CrossFit y Fuerza",
    experience: "8 años",
    certifications: ["NSCA-CSCS", "CrossFit Level 2"],
    rating: 4.9,
    classes: [
      { name: "CrossFit Intenso", day: "Lunes", time: "18:00" },
      { name: "HIIT Elite", day: "Jueves", time: "19:00" },
    ],
    contact: {
      phone: "+52 555 123 4567",
      email: "carlos@tessalpgyms.com",
    },
  },
  {
    id: 2,
    name: "María González",
    specialty: "Yoga y Pilates",
    experience: "6 años",
    certifications: ["Yoga Alliance RYT-500", "Pilates PMA"],
    rating: 4.8,
    classes: [
      { name: "Yoga Matutino", day: "Lunes", time: "07:00" },
      { name: "Pilates Core", day: "Miércoles", time: "10:00" },
    ],
    contact: {
      phone: "+52 555 234 5678",
      email: "maria@tessalpgyms.com",
    },
  },
  {
    id: 3,
    name: "Ana López",
    specialty: "Nutrición Deportiva y Wellness",
    experience: "5 años",
    certifications: ["ISSN-CNS", "Wellness Coach"],
    rating: 4.7,
    classes: [
      { name: "Pilates", day: "Miércoles", time: "10:00" },
      { name: "Meditación Activa", day: "Viernes", time: "08:30" },
    ],
    contact: {
      phone: "+52 555 345 6789",
      email: "ana@tessalpgyms.com",
    },
  },
  {
    id: 4,
    name: "Pedro Sánchez",
    specialty: "Spinning y Cardio",
    experience: "7 años",
    certifications: ["ACE Cycling", "NASM-CPT"],
    rating: 4.6,
    classes: [
      { name: "Spinning", day: "Martes", time: "06:30" },
      { name: "Cardio Extreme", day: "Jueves", time: "20:00" },
    ],
    contact: {
      phone: "+52 555 987 6543",
      email: "pedro@tessalpgyms.com",
    },
  },
]

const specialtyFilters = ["Todos", "CrossFit", "Yoga", "Pilates", "Cardio", "Wellness"]

export default function InstructorsPage() {
  const [selectedFilter, setSelectedFilter] = useState("Todos")

  const filteredInstructors =
    selectedFilter === "Todos"
      ? mockInstructors
      : mockInstructors.filter((instructor) => instructor.specialty.toLowerCase().includes(selectedFilter.toLowerCase()))

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Instructores</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Nuevo Instructor
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Instructores activos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{mockInstructors.length}</div>
              <p className="text-xs text-muted-foreground mt-1">+2 este mes</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Clases cubiertas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockInstructors.reduce((acc, instructor) => acc + instructor.classes.length, 0)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Esta semana</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Calificación promedio</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {(mockInstructors.reduce((acc, instructor) => acc + instructor.rating, 0) / mockInstructors.length).toFixed(1)}
              </div>
              <p className="text-xs text-primary mt-1">+0.2 vs mes anterior</p>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">Filtrar por especialidad</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
                <TabsList className="grid grid-cols-3 gap-2">
                  {specialtyFilters.map((filter) => (
                    <TabsTrigger key={filter} value={filter} className="text-xs">
                      {filter}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Instructors list */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredInstructors.map((instructor) => (
            <Card key={instructor.id} className="border-border/50 bg-card/70 backdrop-blur">
              <CardHeader className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{instructor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{instructor.specialty}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{instructor.experience}</Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {instructor.rating.toFixed(1)}
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Award className="h-4 w-4" />
                  Detalles
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">Clases asignadas</p>
                  <div className="space-y-2">
                    {instructor.classes.map((classItem, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-border/40 bg-card/50 px-3 py-2 text-sm"
                      >
                        <span className="font-medium">{classItem.name}</span>
                        <span className="text-muted-foreground">
                          {classItem.day}, {classItem.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-primary" />
                    {instructor.contact.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    {instructor.contact.email}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredInstructors.length === 0 && (
            <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
              <CardContent>
                <p className="text-muted-foreground">No hay instructores con esta especialidad.</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={() => setSelectedFilter("Todos")}>
                  Ver todos
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

