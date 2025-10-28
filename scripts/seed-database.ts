import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Crear gimnasios
  const gyms = await Promise.all([
    prisma.gym.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Tessalp Centro",
        location: "Av. Principal 123, Centro",
        phone: "+52 (555) 123-4567",
        email: "centro@tessalpgyms.com",
        hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
        image: "/modern-gym-interior.png"
      }
    }),
    prisma.gym.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "Tessalp Norte",
        location: "Blvd. Norte 456, Zona Norte",
        phone: "+52 (555) 234-5678",
        email: "norte@tessalpgyms.com",
        hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 7:00 AM - 9:00 PM",
        image: "/fitness-center-equipment.jpg"
      }
    }),
    prisma.gym.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: "World Gym",
        location: "Centro Comercial Perisur",
        phone: "+52 (555) 567-8901",
        email: "contacto@worldgym.com",
        hours: "Lunes a Viernes: 5:00 AM - 11:00 PM | Sábado y Domingo: 6:00 AM - 10:00 PM",
        image: "/people-training-in-modern-gym.jpg"
      }
    })
  ])

  console.log('✅ Gimnasios creados:', gyms.length)

  // Crear instructores
  const instructors = await Promise.all([
    prisma.instructor.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Carlos Rodríguez",
        email: "carlos@tessalpgyms.com",
        phone: "+52 (555) 111-1111",
        specialty: "CrossFit y Funcional",
        bio: "Instructor certificado con 8 años de experiencia en entrenamiento funcional"
      }
    }),
    prisma.instructor.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "María González",
        email: "maria@tessalpgyms.com",
        phone: "+52 (555) 222-2222",
        specialty: "Yoga y Pilates",
        bio: "Especialista en yoga y pilates con certificación internacional"
      }
    }),
    prisma.instructor.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: "Juan Martínez",
        email: "juan@tessalpgyms.com",
        phone: "+52 (555) 333-3333",
        specialty: "Musculación y Fuerza",
        bio: "Entrenador personal especializado en musculación y desarrollo de fuerza"
      }
    })
  ])

  console.log('✅ Instructores creados:', instructors.length)

  // Crear clases
  const classes = await Promise.all([
    prisma.class.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "CrossFit Intensivo",
        instructorId: 1,
        dayOfWeek: "Lunes",
        time: "18:00",
        duration: 60,
        capacity: 15,
        price: 200,
        description: "Entrenamiento funcional de alta intensidad"
      }
    }),
    prisma.class.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "Yoga Restaurativo",
        instructorId: 2,
        dayOfWeek: "Miércoles",
        time: "19:00",
        duration: 45,
        capacity: 20,
        price: 150,
        description: "Yoga suave para relajación y flexibilidad"
      }
    }),
    prisma.class.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: "Musculación Avanzada",
        instructorId: 3,
        dayOfWeek: "Viernes",
        time: "20:00",
        duration: 90,
        capacity: 10,
        price: 300,
        description: "Entrenamiento de fuerza y musculación para nivel avanzado"
      }
    })
  ])

  console.log('✅ Clases creadas:', classes.length)

  // Crear miembros
  const members = await Promise.all([
    prisma.member.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: "Ana García",
        email: "ana@ejemplo.com",
        phone: "+52 (555) 444-4444",
        membershipType: "Premium",
        membershipStart: new Date("2025-01-15"),
        membershipEnd: new Date("2025-12-15"),
        status: "active"
      }
    }),
    prisma.member.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: "Luis Hernández",
        email: "luis@ejemplo.com",
        phone: "+52 (555) 555-5555",
        membershipType: "Elite",
        membershipStart: new Date("2024-11-20"),
        membershipEnd: new Date("2025-11-20"),
        status: "active"
      }
    }),
    prisma.member.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: "Sofia López",
        email: "sofia@ejemplo.com",
        phone: "+52 (555) 666-6666",
        membershipType: "Básico",
        membershipStart: new Date("2025-01-22"),
        membershipEnd: new Date("2025-10-22"),
        status: "expiring"
      }
    })
  ])

  console.log('✅ Miembros creados:', members.length)

  // Crear algunos check-ins de ejemplo
  const checkIns = await Promise.all([
    prisma.checkIn.create({
      data: {
        memberId: 1,
        classId: 1,
        checkinTime: new Date("2025-01-27T18:00:00Z"),
        checkoutTime: new Date("2025-01-27T19:00:00Z")
      }
    }),
    prisma.checkIn.create({
      data: {
        memberId: 2,
        classId: 2,
        checkinTime: new Date("2025-01-27T19:00:00Z"),
        checkoutTime: new Date("2025-01-27T19:45:00Z")
      }
    }),
    prisma.checkIn.create({
      data: {
        memberId: 3,
        checkinTime: new Date("2025-01-27T20:00:00Z"),
        checkoutTime: new Date("2025-01-27T21:30:00Z")
      }
    })
  ])

  console.log('✅ Check-ins creados:', checkIns.length)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
