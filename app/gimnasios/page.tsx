import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Users, 
  Star, 
  Clock, 
  Dumbbell, 
  Award, 
  Shield, 
  Heart,
  ArrowLeft,
  CheckCircle,
  Users2,
  Calendar,
  Zap
} from "lucide-react"
import Link from "next/link"

const gymDetails = [
  {
    id: "tessalp-centro",
    name: "Tessalp Centro",
    location: "Av. Principal 123, Centro",
    established: "2018",
    yearsActive: 6,
    totalMembers: 450,
    rating: 4.8,
    image: "/modern-gym-interior.png",
    description: "Nuestro gimnasio insignia con equipamiento de última generación",
    
    // Equipamiento
    equipment: {
      cardio: [
        "12 Caminadoras Technogym Skillmill",
        "8 Bicicletas estáticas Life Fitness",
        "6 Elípticas Precor",
        "4 Remos Concept2",
        "2 Steppers StairMaster"
      ],
      strength: [
        "20 Máquinas de pesas Technogym",
        "15 Bancos ajustables Hammer Strength",
        "10 Racks de sentadillas Rogue",
        "8 Máquinas de cable Life Fitness",
        "5 Estaciones de entrenamiento funcional"
      ],
      functional: [
        "Zona CrossFit completa",
        "Césped artificial para entrenamiento",
        "Cuerdas de batalla",
        "Kettlebells (5kg-50kg)",
        "Barras olímpicas y discos"
      ]
    },
    
    // Staff
    staff: {
      total: 12,
      trainers: [
        { name: "Carlos Mendoza", specialty: "Fuerza y Acondicionamiento", experience: "8 años", certification: "NSCA-CSCS" },
        { name: "María González", specialty: "Yoga y Pilates", experience: "6 años", certification: "RYT-500" },
        { name: "Roberto Silva", specialty: "CrossFit", experience: "5 años", certification: "CF-L2" },
        { name: "Ana Martínez", specialty: "Nutrición Deportiva", experience: "4 años", certification: "ISSN-CNS" }
      ]
    },
    
    // Servicios
    services: [
      "Entrenamiento personal 1:1",
      "Clases grupales ilimitadas",
      "Evaluación física completa",
      "Plan nutricional personalizado",
      "Spa y sauna",
      "Estacionamiento gratuito",
      "Wi-Fi de alta velocidad",
      "Lockers con cerradura digital"
    ],
    
    // Horarios
    schedule: {
      weekdays: "5:00 AM - 11:00 PM",
      weekends: "7:00 AM - 9:00 PM",
      classes: "6:00 AM - 10:00 PM"
    },
    
    // Logros
    achievements: [
      "Gimnasio del Año 2023 - Fitness Magazine",
      "Certificación ISO 9001:2015",
      "Premio a la Excelencia en Servicio 2022",
      "Miembro de la Asociación Nacional de Gimnasios"
    ]
  },
  {
    id: "tessalp-norte",
    name: "Tessalp Norte",
    location: "Blvd. Norte 456, Zona Norte",
    established: "2020",
    yearsActive: 4,
    totalMembers: 320,
    rating: 4.7,
    image: "/fitness-center-equipment.jpg",
    description: "Amplio espacio con área de crossfit y clases grupales",
    
    equipment: {
      cardio: [
        "8 Caminadoras Matrix",
        "6 Bicicletas estáticas Technogym",
        "4 Elípticas Life Fitness",
        "3 Remos WaterRower"
      ],
      strength: [
        "15 Máquinas de pesas Matrix",
        "12 Bancos ajustables",
        "8 Racks de sentadillas",
        "6 Máquinas de cable",
        "3 Estaciones de entrenamiento"
      ],
      functional: [
        "Zona CrossFit 200m²",
        "Césped artificial",
        "Cuerdas de batalla",
        "Kettlebells (8kg-40kg)",
        "Barras y discos"
      ]
    },
    
    staff: {
      total: 8,
      trainers: [
        { name: "Luis Ramírez", specialty: "CrossFit", experience: "6 años", certification: "CF-L1" },
        { name: "Sofia Torres", specialty: "Pilates", experience: "4 años", certification: "PMA" },
        { name: "Miguel Ángel", specialty: "Boxing", experience: "7 años", certification: "USA Boxing" }
      ]
    },
    
    services: [
      "Clases grupales especializadas",
      "Entrenamiento funcional",
      "Boxing y artes marciales",
      "Pilates y yoga",
      "Estacionamiento",
      "Área de descanso",
      "Venta de suplementos"
    ],
    
    schedule: {
      weekdays: "5:00 AM - 11:00 PM",
      weekends: "7:00 AM - 9:00 PM",
      classes: "6:00 AM - 10:00 PM"
    },
    
    achievements: [
      "Mejor Gimnasio CrossFit 2023",
      "Certificación CrossFit Affiliate",
      "Premio a la Innovación 2022"
    ]
  },
  {
    id: "tessalp-sur",
    name: "Tessalp Sur",
    location: "Calle Sur 789, Zona Sur",
    established: "2019",
    yearsActive: 5,
    totalMembers: 280,
    rating: 4.9,
    image: "/gym-training-area.jpg",
    description: "Ambiente familiar con entrenadores personalizados",
    
    equipment: {
      cardio: [
        "6 Caminadoras Precor",
        "4 Bicicletas estáticas Life Fitness",
        "3 Elípticas Technogym",
        "2 Remos Concept2"
      ],
      strength: [
        "12 Máquinas de pesas Life Fitness",
        "10 Bancos ajustables",
        "6 Racks de sentadillas",
        "4 Máquinas de cable"
      ],
      functional: [
        "Zona funcional 150m²",
        "Césped artificial",
        "Kettlebells (5kg-32kg)",
        "Barras y discos básicos"
      ]
    },
    
    staff: {
      total: 6,
      trainers: [
        { name: "Laura Pérez", specialty: "Entrenamiento Personal", experience: "5 años", certification: "ACSM-CPT" },
        { name: "Juan Martínez", specialty: "Rehabilitación", experience: "8 años", certification: "NSCA-CSCS" },
        { name: "Carmen López", specialty: "Zumba", experience: "3 años", certification: "ZIN" }
      ]
    },
    
    services: [
      "Entrenamiento personalizado",
      "Rehabilitación deportiva",
      "Clases de Zumba",
      "Yoga y relajación",
      "Guardería infantil",
      "Cafetería saludable",
      "Área de descanso familiar"
    ],
    
    schedule: {
      weekdays: "5:00 AM - 11:00 PM",
      weekends: "7:00 AM - 9:00 PM",
      classes: "6:00 AM - 10:00 PM"
    },
    
    achievements: [
      "Gimnasio Familiar del Año 2023",
      "Certificación de Accesibilidad",
      "Premio a la Comunidad 2022"
    ]
  }
]

export default function GymDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Detalles de Nuestros Gimnasios</h1>
              <p className="text-muted-foreground">Conoce todo lo que ofrecemos en cada ubicación</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gym Details */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-12">
          {gymDetails.map((gym) => (
            <Card key={gym.id} className="border-border/50 bg-card/80 backdrop-blur overflow-hidden">
              {/* Gym Header */}
              <div className="relative">
                <img 
                  src={gym.image} 
                  alt={gym.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-white">{gym.name}</h2>
                      <p className="text-white/80 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {gym.location}
                      </p>
                    </div>
                    <div className="text-right text-white">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold">{gym.rating}</span>
                      </div>
                      <p className="text-sm text-white/80">{gym.totalMembers} miembros</p>
                    </div>
                  </div>
                </div>
              </div>

              <CardContent className="p-8">
                {/* Basic Info */}
                <div className="grid gap-8 md:grid-cols-3 mb-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      Historia
                    </h3>
                    <div className="space-y-2">
                      <p><strong>Establecido:</strong> {gym.established}</p>
                      <p><strong>Años activos:</strong> {gym.yearsActive} años</p>
                      <p><strong>Miembros actuales:</strong> {gym.totalMembers}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Horarios
                    </h3>
                    <div className="space-y-2">
                      <p><strong>Lunes a Viernes:</strong> {gym.schedule.weekdays}</p>
                      <p><strong>Sábado y Domingo:</strong> {gym.schedule.weekends}</p>
                      <p><strong>Clases:</strong> {gym.schedule.classes}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Users2 className="h-5 w-5 text-primary" />
                      Staff
                    </h3>
                    <div className="space-y-2">
                      <p><strong>Total de entrenadores:</strong> {gym.staff.total}</p>
                      <p><strong>Especialidades:</strong> Variadas</p>
                      <p><strong>Experiencia promedio:</strong> 5+ años</p>
                    </div>
                  </div>
                </div>

                {/* Equipment */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Dumbbell className="h-6 w-6 text-primary" />
                    Equipamiento
                  </h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Cardio</h4>
                      <ul className="space-y-2">
                        {gym.equipment.cardio.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Fuerza</h4>
                      <ul className="space-y-2">
                        {gym.equipment.strength.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-primary">Funcional</h4>
                      <ul className="space-y-2">
                        {gym.equipment.functional.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Staff Details */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Nuestro Staff
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {gym.staff.trainers.map((trainer, index) => (
                      <Card key={index} className="border-border/50 bg-card/50">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{trainer.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{trainer.specialty}</p>
                          <div className="space-y-1 text-xs">
                            <p><strong>Experiencia:</strong> {trainer.experience}</p>
                            <p><strong>Certificación:</strong> {trainer.certification}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    Servicios Incluidos
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    {gym.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-card/50">
                        <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                        <span className="text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Award className="h-6 w-6 text-primary" />
                    Logros y Certificaciones
                  </h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {gym.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                        <Award className="h-5 w-5 text-primary shrink-0" />
                        <span className="font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center pt-6 border-t border-border/50">
                  <Link href={`/gym/${gym.id}`}>
                    <Button size="lg" className="gap-2">
                      Ver Gimnasio Completo
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
