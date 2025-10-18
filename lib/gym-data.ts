export const gymsData = {
  "tessalp-centro": {
    name: "Tessalp Centro",
    location: "Av. Principal 123, Centro",
    phone: "+52 (555) 123-4567",
    email: "centro@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/modern-gym-interior.png",
  },
  "tessalp-norte": {
    name: "Tessalp Norte",
    location: "Blvd. Norte 456, Zona Norte",
    phone: "+52 (555) 234-5678",
    email: "norte@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/fitness-center-equipment.jpg",
  },
  "tessalp-sur": {
    name: "Tessalp Sur",
    location: "Calle Sur 789, Zona Sur",
    phone: "+52 (555) 345-6789",
    email: "sur@tessalpgyms.com",
    hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
    image: "/gym-training-area.jpg",
  },
}

export const memberships = [
  {
    name: "Básico",
    price: "$599",
    period: "/mes",
    description: "Perfecto para comenzar tu viaje fitness",
    features: ["Acceso al área de pesas", "Acceso a cardio", "Casillero personal", "Wi-Fi gratuito"],
  },
  {
    name: "Premium",
    price: "$899",
    period: "/mes",
    description: "La opción más popular para resultados serios",
    features: [
      "Todo lo del plan Básico",
      "Clases grupales ilimitadas",
      "1 sesión de entrenamiento personal/mes",
      "Acceso a zona de spa",
      "Descuentos en productos",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "$1,299",
    period: "/mes",
    description: "Experiencia premium completa",
    features: [
      "Todo lo del plan Premium",
      "4 sesiones de entrenamiento personal/mes",
      "Plan nutricional personalizado",
      "Acceso prioritario a clases",
      "Invitaciones a eventos exclusivos",
      "Toalla y amenidades premium",
    ],
  },
]

export const classes = [
  { name: "Yoga", time: "7:00 AM - 8:00 AM", instructor: "María González", capacity: "20/25" },
  { name: "CrossFit", time: "6:00 PM - 7:00 PM", instructor: "Carlos Ruiz", capacity: "15/20" },
  { name: "Spinning", time: "8:00 AM - 9:00 AM", instructor: "Ana Martínez", capacity: "18/30" },
  { name: "Zumba", time: "7:00 PM - 8:00 PM", instructor: "Laura Pérez", capacity: "22/25" },
  { name: "Pilates", time: "9:00 AM - 10:00 AM", instructor: "Sofia Torres", capacity: "12/15" },
  { name: "Boxing", time: "5:00 PM - 6:00 PM", instructor: "Miguel Ángel", capacity: "10/15" },
]
