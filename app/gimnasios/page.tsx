import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  Star,
  Clock,
  ArrowLeft,
  Dumbbell,
  Shield,
  Heart,
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
  },
  {
    id: "one-gym",
    name: "One Gym",
    location: "Plaza Galerías, Zona Rosa",
    established: "2019",
    yearsActive: 5,
    totalMembers: 1200,
    rating: 4.6,
    image: "/people-training-in-modern-gym.jpg",
    description: "Tecnología de vanguardia con acceso 24/7 y app personalizada",
    
    equipment: {
      cardio: [
        "15 Caminadoras inteligentes con pantallas táctiles",
        "10 Bicicletas estáticas con realidad virtual",
        "8 Elípticas con sensores de frecuencia cardíaca",
        "6 Remos con tecnología IoT",
        "4 Steppers con gamificación"
      ],
      strength: [
        "25 Máquinas de pesas con tecnología smart",
        "20 Bancos ajustables con sensores",
        "15 Racks de sentadillas inteligentes",
        "12 Máquinas de cable con app integrada",
        "8 Estaciones de entrenamiento funcional smart"
      ],
      functional: [
        "Zona HIIT con pantallas interactivas",
        "Área de entrenamiento funcional",
        "Kettlebells inteligentes (5kg-50kg)",
        "Barras olímpicas con sensores",
        "Cuerdas de batalla con contadores"
      ]
    },
    
    staff: {
      total: 8,
      trainers: [
        { name: "Diego Ramírez", specialty: "Tecnología Fitness", experience: "7 años", certification: "ACSM-CPT" },
        { name: "Sofia Chen", specialty: "HIIT y Cardio", experience: "5 años", certification: "NASM-CPT" },
        { name: "Alex Torres", specialty: "Entrenamiento Funcional", experience: "6 años", certification: "FMS Level 2" },
        { name: "Valeria López", specialty: "Nutrición y Wellness", experience: "4 años", certification: "RD" }
      ]
    },
    
    services: [
      "App personalizada con tracking",
      "Acceso 24/7 con tarjeta inteligente",
      "Entrenamiento personal con tecnología",
      "Clases virtuales en vivo",
      "Análisis de datos de entrenamiento",
      "Wi-Fi de alta velocidad",
      "Estacionamiento gratuito",
      "Lockers con cerradura digital"
    ],
    
    schedule: {
      weekdays: "24/7",
      weekends: "24/7",
      classes: "6:00 AM - 10:00 PM"
    },
    
    achievements: [
      "Gimnasio Más Innovador 2023",
      "Certificación de Tecnología Fitness",
      "Premio a la Experiencia Digital 2022"
    ]
  },
  {
    id: "world-gym",
    name: "World Gym",
    location: "Centro Comercial Perisur",
    established: "2017",
    yearsActive: 7,
    totalMembers: 950,
    rating: 4.5,
    image: "/people-training-in-modern-gym.jpg",
    description: "Máquinas profesionales y entrenamiento personal de calidad mundial",
    
    equipment: {
      cardio: [
        "18 Caminadoras Life Fitness",
        "12 Bicicletas estáticas Precor",
        "10 Elípticas Technogym",
        "8 Remos Concept2",
        "6 Steppers StairMaster"
      ],
      strength: [
        "30 Máquinas de pesas Life Fitness",
        "25 Bancos ajustables Hammer Strength",
        "20 Racks de sentadillas Rogue",
        "15 Máquinas de cable Technogym",
        "10 Estaciones de entrenamiento funcional"
      ],
      functional: [
        "Zona de entrenamiento funcional completa",
        "Área de CrossFit",
        "Kettlebells (5kg-50kg)",
        "Barras olímpicas y discos",
        "Cuerdas de batalla y TRX"
      ]
    },
    
    staff: {
      total: 15,
      trainers: [
        { name: "Mike Johnson", specialty: "Bodybuilding", experience: "12 años", certification: "IFBB Pro" },
        { name: "Sarah Wilson", specialty: "Powerlifting", experience: "8 años", certification: "USAPL" },
        { name: "David Brown", specialty: "Funcional Training", experience: "6 años", certification: "FMS Level 2" },
        { name: "Lisa Garcia", specialty: "Rehabilitación", experience: "5 años", certification: "PT" }
      ]
    },
    
    services: [
      "Entrenamiento personal profesional",
      "Evaluación física completa",
      "Plan nutricional personalizado",
      "Clases grupales especializadas",
      "Spa y sauna",
      "Estacionamiento gratuito",
      "Wi-Fi de alta velocidad",
      "Lockers con cerradura digital"
    ],
    
    schedule: {
      weekdays: "5:00 AM - 11:00 PM",
      weekends: "6:00 AM - 10:00 PM",
      classes: "6:00 AM - 10:00 PM"
    },
    
    achievements: [
      "Gimnasio Profesional del Año 2023",
      "Certificación Internacional World Gym",
      "Premio a la Excelencia en Entrenamiento 2022"
    ]
  },
  {
    id: "smartfit",
    name: "Smart Fit",
    location: "Plaza Satélite",
    established: "2015",
    yearsActive: 9,
    totalMembers: 1800,
    rating: 4.4,
    image: "/people-training-in-modern-gym.jpg",
    description: "Precio accesible, múltiples ubicaciones y sin contratos",
    
    equipment: {
      cardio: [
        "20 Caminadoras básicas",
        "15 Bicicletas estáticas",
        "12 Elípticas",
        "8 Remos",
        "6 Steppers"
      ],
      strength: [
        "40 Máquinas de pesas básicas",
        "30 Bancos ajustables",
        "25 Racks de sentadillas",
        "20 Máquinas de cable",
        "15 Estaciones de entrenamiento funcional"
      ],
      functional: [
        "Zona de entrenamiento funcional",
        "Área de peso libre",
        "Kettlebells (5kg-40kg)",
        "Barras y discos",
        "Cuerdas de batalla"
      ]
    },
    
    staff: {
      total: 10,
      trainers: [
        { name: "Carlos Mendez", specialty: "Fitness General", experience: "4 años", certification: "ACSM-CPT" },
        { name: "Patricia Ruiz", specialty: "Aeróbicos", experience: "3 años", certification: "AFAA" },
        { name: "Jorge Silva", specialty: "Musculación", experience: "5 años", certification: "NASM-CPT" },
        { name: "Carmen Vega", specialty: "Zumba", experience: "2 años", certification: "ZIN" }
      ]
    },
    
    services: [
      "Entrenamiento básico",
      "Clases grupales incluidas",
      "Sin contrato de permanencia",
      "Múltiples ubicaciones",
      "Precio accesible",
      "Wi-Fi gratuito",
      "Estacionamiento",
      "Lockers básicos"
    ],
    
    schedule: {
      weekdays: "5:00 AM - 11:00 PM",
      weekends: "6:00 AM - 10:00 PM",
      classes: "6:00 AM - 10:00 PM"
    },
    
    achievements: [
      "Gimnasio Más Accesible 2023",
      "Certificación de Calidad",
      "Premio a la Accesibilidad 2022"
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

      {/* Gym Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {gymDetails.map((gym) => (
            <Link key={gym.id} href={`/gym/${gym.id}`}>
              <Card className="group h-full border-border/50 bg-card/80 backdrop-blur overflow-hidden transition-all hover:shadow-xl">
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={gym.image}
                    alt={gym.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">{gym.name}</h2>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {gym.location}
                        </p>
                      </div>
                      <Badge className="flex items-center gap-1 bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 fill-current" />
                        {gym.rating}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="space-y-4 p-5">
                  <p className="text-sm text-muted-foreground line-clamp-2">{gym.description}</p>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/60 p-3">
                      <Users className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{gym.totalMembers}</p>
                        <p className="text-muted-foreground">Miembros</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/60 p-3">
                      <Clock className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Horarios</p>
                        <p className="text-muted-foreground">{gym.schedule.weekdays}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/60 p-3">
                      <Dumbbell className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">Equipo</p>
                        <p className="text-muted-foreground">{gym.equipment.cardio.length + gym.equipment.strength.length + gym.equipment.functional.length} categorías</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/60 p-3">
                      <Shield className="h-4 w-4 text-primary" />
                      <div>
                        <p className="font-semibold text-foreground">{gym.staff.total}</p>
                        <p className="text-muted-foreground">Entrenadores</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      Est. {gym.established}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {gym.yearsActive}+ años activos
                    </Badge>
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {gym.achievements[0]}
                    </Badge>
                  </div>

                  <Button variant="outline" size="sm" className="w-full justify-center gap-2">
                    Ver más detalles
                    <ArrowLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
