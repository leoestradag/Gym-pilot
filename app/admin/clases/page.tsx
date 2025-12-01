"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus, CalendarIcon, Users, Clock, Award, Star, PhoneCall, Mail, TrendingUp } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
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

// Instructor type definition
type Instructor = {
  id: number
  name: string
  specialty: string
  experience: string
  certifications: string[]
  rating: number
  classes: Array<{ name: string; day: string; time: string }>
  contact: {
    phone: string
    email: string
  }
}

const specialtyFilters = ["Todos", "CrossFit", "Yoga", "Pilates", "Cardio", "Wellness"]
const WEEKLY_CLASS_GOAL = 20

export default function ClassesPage() {
  const [classes, setClasses] = useState(initialClasses)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("Todos")
  const [isLoading, setIsLoading] = useState(true)
  
  // Instructors state
  const [selectedFilter, setSelectedFilter] = useState("Todos")
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)
  const [isInstructorDialogOpen, setIsInstructorDialogOpen] = useState(false)
  const [isCreateInstructorDialogOpen, setIsCreateInstructorDialogOpen] = useState(false)
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [isLoadingInstructors, setIsLoadingInstructors] = useState(true)
  const [instructorFormData, setInstructorFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    phone: "",
    email: "",
    classes: "",
    certifications: "",
  })

  // Function to load classes from database
  const loadClasses = async () => {
    try {
      const response = await fetch("/api/classes")
      if (response.ok) {
        const dbClasses = await response.json()
        // Prioritize database classes, only use initial classes if database is empty
        if (dbClasses.length > 0) {
          setClasses(dbClasses)
        } else {
          // If no classes in database, use initial classes
          setClasses(initialClasses)
        }
      } else {
        // If API fails, use initial classes as fallback
        console.error("Failed to load classes from database")
        setClasses(initialClasses)
      }
    } catch (error) {
      console.error("Error loading classes", error)
      // On error, use initial classes as fallback
      setClasses(initialClasses)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to load instructors from database
  const loadInstructors = async () => {
    try {
      const response = await fetch("/api/instructors")
      if (response.ok) {
        const dbInstructors = await response.json()
        setInstructors(dbInstructors)
      } else {
        console.error("Failed to load instructors from database")
        setInstructors([])
      }
    } catch (error) {
      console.error("Error loading instructors", error)
      setInstructors([])
    } finally {
      setIsLoadingInstructors(false)
    }
  }

  // Load classes from database on mount
  useEffect(() => {
    loadClasses()
  }, [])

  // Load instructors on mount and when classes change
  useEffect(() => {
    loadInstructors()
  }, [classes.length]) // Reload when classes count changes

  // Get all unique types from classes, including "General" if there are classes with that type
  const allTypes = new Set(classes.map((c) => c.type).filter(Boolean))
  const classTypes = ["Todos", ...Array.from(allTypes).sort()]

  const filteredClasses = selectedType === "Todos" ? classes : classes.filter((c) => c.type === selectedType)

  const handleAddClass = async (newClassData: {
    name: string
    instructor: string
    day: string
    time: string
    duration: string
    capacity: string
  }) => {
    try {
      const response = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClassData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "No se pudo crear la clase")
      }

      const data = await response.json()
      
      // Transform the response to match our format
      const dayMapReverse: { [key: string]: string } = {
        lunes: "Lunes",
        martes: "Martes",
        miercoles: "Miércoles",
        jueves: "Jueves",
        viernes: "Viernes",
        sabado: "Sábado",
        domingo: "Domingo",
      }
      
      const newClass = {
        id: data.class.id,
        name: data.class.name,
        instructor: data.class.instructorName || instructorMap[newClassData.instructor] || newClassData.instructor,
        day: dayMapReverse[data.class.dayOfWeek] || data.class.dayOfWeek,
        time: data.class.time.substring(0, 5),
        duration: data.class.duration,
        capacity: data.class.capacity,
        enrolled: data.class.enrolled || 0,
        type: data.class.type || "General",
        color: getClassColor(data.class.type || "General"),
      }
      
      // Reload all classes from database to ensure consistency
      await loadClasses()
    } catch (error) {
      console.error("Error creating class", error)
      throw error
    }
  }

  const filteredInstructors = useMemo(
    () =>
      selectedFilter === "Todos"
        ? instructors
        : instructors.filter((instructor) =>
            instructor.specialty.toLowerCase().includes(selectedFilter.toLowerCase()),
          ),
    [selectedFilter, instructors],
  )

  const totalClassesCovered = instructors.reduce((acc, instructor) => acc + instructor.classes.length, 0)

  const handleViewInstructorDetails = (instructor: Instructor) => {
    setSelectedInstructor(instructor)
    setIsInstructorDialogOpen(true)
  }

  const handleCreateInstructor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await fetch("/api/instructors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: instructorFormData.name,
          specialty: instructorFormData.specialty,
          email: instructorFormData.email,
          phone: instructorFormData.phone || undefined,
          experience: instructorFormData.experience ? `${instructorFormData.experience} años` : undefined,
          certifications: instructorFormData.certifications || undefined,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || "No se pudo crear el instructor")
      }

      // Reload instructors from database
      await loadInstructors()
      
      setInstructorFormData({
        name: "",
        specialty: "",
        experience: "",
        phone: "",
        email: "",
        classes: "",
        certifications: "",
      })
      setIsCreateInstructorDialogOpen(false)
    } catch (error) {
      console.error("Error creating instructor", error)
      alert(error instanceof Error ? error.message : "No se pudo crear el instructor")
    }
  }

  return (
    <>
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-foreground">Clases e Instructores</h1>
          <div className="ml-auto flex gap-2">
            <Button size="sm" className="gap-2" onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Nueva Clase
            </Button>
            <Button size="sm" className="gap-2" onClick={() => setIsCreateInstructorDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              Nuevo Instructor
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <Tabs defaultValue="clases" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="clases">Clases</TabsTrigger>
            <TabsTrigger value="instructores">Instructores</TabsTrigger>
          </TabsList>

          <TabsContent value="clases" className="space-y-6 mt-6">
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
              <div className="flex gap-2 flex-wrap">
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
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
          </TabsContent>

          <TabsContent value="instructores" className="space-y-6 mt-6">
            {/* Instructors Metrics */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Instructores activos</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{instructors.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">+2 este mes</p>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Clases cubiertas</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    {Math.min(totalClassesCovered, WEEKLY_CLASS_GOAL)}
                    <span className="text-base text-muted-foreground">/{WEEKLY_CLASS_GOAL}</span>
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
                    {(instructors.reduce((acc, instructor) => acc + instructor.rating, 0) / instructors.length).toFixed(1)}
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
            {isLoadingInstructors ? (
              <Card className="border-border/50 bg-card/50 backdrop-blur py-12 text-center">
                <CardContent>
                  <p className="text-muted-foreground">Cargando instructores...</p>
                </CardContent>
              </Card>
            ) : filteredInstructors.length === 0 ? (
              <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
                <CardContent>
                  <p className="text-muted-foreground">No hay instructores registrados.</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setIsCreateInstructorDialogOpen(true)}>
                    Agregar primer instructor
                  </Button>
                </CardContent>
              </Card>
            ) : (
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleViewInstructorDetails(instructor)}
                    >
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
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Class Dialog */}
        <ClassDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} onAddClass={handleAddClass} />

        {/* Instructor Details Dialog */}
        <Dialog open={isInstructorDialogOpen} onOpenChange={setIsInstructorDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedInstructor && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedInstructor.name}</DialogTitle>
                  <DialogDescription className="text-base">
                    {selectedInstructor.specialty}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  {/* Información Principal */}
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Star className="h-8 w-8 text-yellow-500 mb-2" />
                          <div className="text-2xl font-bold">{selectedInstructor.rating.toFixed(1)}</div>
                          <p className="text-sm text-muted-foreground">Calificación</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <Clock className="h-8 w-8 text-primary mb-2" />
                          <div className="text-2xl font-bold">{selectedInstructor.experience}</div>
                          <p className="text-sm text-muted-foreground">Experiencia</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                          <CalendarIcon className="h-8 w-8 text-primary mb-2" />
                          <div className="text-2xl font-bold">{selectedInstructor.classes.length}</div>
                          <p className="text-sm text-muted-foreground">Clases Activas</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  {/* Certificaciones */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary" />
                      Certificaciones
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedInstructor.certifications.map((cert, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Clases Asignadas */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      Clases Asignadas
                    </h3>
                    <div className="space-y-3">
                      {selectedInstructor.classes.map((classItem, idx) => (
                        <Card key={idx} className="border-border/50 bg-card/50">
                          <CardContent className="pt-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-foreground">{classItem.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {classItem.day} a las {classItem.time}
                                </p>
                              </div>
                              <Badge variant="outline">Activa</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Información de Contacto */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <PhoneCall className="h-5 w-5 text-primary" />
                      Información de Contacto
                    </h3>
                    <div className="space-y-3">
                      <Card className="border-border/50 bg-card/50">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <PhoneCall className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Teléfono</p>
                              <p className="font-medium text-foreground">{selectedInstructor.contact.phone}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border/50 bg-card/50">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <p className="font-medium text-foreground">{selectedInstructor.contact.email}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <Separator />

                  {/* Estadísticas Adicionales */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Estadísticas
                    </h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="border-border/50 bg-card/50">
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground mb-1">Total de Estudiantes</p>
                          <p className="text-xl font-bold text-foreground">
                            {Math.floor(Math.random() * 50) + 20}
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="border-border/50 bg-card/50">
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground mb-1">Sesiones este Mes</p>
                          <p className="text-xl font-bold text-foreground">
                            {selectedInstructor.classes.length * 4 * 4}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Instructor Dialog */}
        <Dialog open={isCreateInstructorDialogOpen} onOpenChange={setIsCreateInstructorDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Nuevo Instructor</DialogTitle>
              <DialogDescription>Completa la información para registrar un nuevo instructor.</DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handleCreateInstructor}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="instructor-name">Nombre completo</Label>
                  <Input
                    id="instructor-name"
                    value={instructorFormData.name}
                    onChange={(event) => setInstructorFormData({ ...instructorFormData, name: event.target.value })}
                    placeholder="Ej. Laura Ramírez"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor-specialty">Especialidad</Label>
                  <Input
                    id="instructor-specialty"
                    value={instructorFormData.specialty}
                    onChange={(event) => setInstructorFormData({ ...instructorFormData, specialty: event.target.value })}
                    placeholder="CrossFit, Pilates, Yoga..."
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="instructor-experience">Experiencia (años)</Label>
                  <Input
                    id="instructor-experience"
                    type="number"
                    min={1}
                    value={instructorFormData.experience}
                    onChange={(event) => setInstructorFormData({ ...instructorFormData, experience: event.target.value })}
                    placeholder="5"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor-phone">Teléfono</Label>
                  <Input
                    id="instructor-phone"
                    value={instructorFormData.phone}
                    onChange={(event) => setInstructorFormData({ ...instructorFormData, phone: event.target.value })}
                    placeholder="+52 555 111 2233"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor-email">Email</Label>
                <Input
                  id="instructor-email"
                  type="email"
                  value={instructorFormData.email}
                  onChange={(event) => setInstructorFormData({ ...instructorFormData, email: event.target.value })}
                  placeholder="coach@tessalpgyms.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor-certifications">Certificaciones (separadas por coma)</Label>
                <Input
                  id="instructor-certifications"
                  value={instructorFormData.certifications}
                  onChange={(event) => setInstructorFormData({ ...instructorFormData, certifications: event.target.value })}
                  placeholder="NASM-CPT, Yoga Alliance 200H..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor-classes">Clases (una por línea: Nombre | Día | Hora)</Label>
                <Textarea
                  id="instructor-classes"
                  rows={4}
                  value={instructorFormData.classes}
                  onChange={(event) => setInstructorFormData({ ...instructorFormData, classes: event.target.value })}
                  placeholder={"Funcional Express | Lunes | 07:00\nYoga Flow | Miércoles | 19:30"}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateInstructorDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Agregar Instructor</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}
