import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"

const createClassSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  instructor: z.string().min(1, "El instructor es obligatorio"),
  day: z.string().min(1, "El día es obligatorio"),
  time: z.string().min(1, "La hora es obligatoria"),
  duration: z.string().min(1, "La duración es obligatoria"),
  capacity: z.string().min(1, "La capacidad es obligatoria"),
  description: z.string().optional(),
})

export async function GET() {
  try {
    if (!prisma || !prisma.class) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const classes = await prisma.class.findMany({
      orderBy: { createdAt: "desc" },
    })

    // Transform to match the frontend format
    const formattedClasses = classes.map((cls) => {
      // Map day names
      const dayMap: { [key: string]: string } = {
        lunes: "Lunes",
        martes: "Martes",
        miercoles: "Miércoles",
        jueves: "Jueves",
        viernes: "Viernes",
        sabado: "Sábado",
        domingo: "Domingo",
      }

      // Color mapping
      const getClassColor = (type: string | null) => {
        const colorMap: { [key: string]: string } = {
          Yoga: "bg-purple-500/10 text-purple-500 border-purple-500/20",
          CrossFit: "bg-red-500/10 text-red-500 border-red-500/20",
          Cardio: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          Pilates: "bg-pink-500/10 text-pink-500 border-pink-500/20",
          Baile: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          Funcional: "bg-green-500/10 text-green-500 border-green-500/20",
        }
        return colorMap[type || "General"] || "bg-gray-500/10 text-gray-500 border-gray-500/20"
      }

      return {
        id: cls.id,
        name: cls.name,
        instructor: cls.instructorName || "Sin instructor",
        day: dayMap[cls.dayOfWeek.toLowerCase()] || cls.dayOfWeek,
        time: cls.time,
        duration: cls.duration,
        capacity: cls.capacity,
        enrolled: cls.enrolled || 0,
        type: cls.type || "General",
        color: getClassColor(cls.type),
      }
    })

    return NextResponse.json(formattedClasses)
  } catch (error) {
    console.error("Error fetching classes", error)
    return NextResponse.json(
      { error: "No se pudieron obtener las clases" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = createClassSchema.safeParse(body)

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: fieldErrors,
        },
        { status: 400 },
      )
    }

    if (!prisma || !prisma.class) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const { name, instructor, day, time, duration, capacity, description } = validation.data

    // Map day names to lowercase
    const dayMap: { [key: string]: string } = {
      Lunes: "lunes",
      Martes: "martes",
      Miércoles: "miercoles",
      Jueves: "jueves",
      Viernes: "viernes",
      Sábado: "sabado",
      Domingo: "domingo",
    }

    const dayOfWeek = dayMap[day] || day.toLowerCase()

    // Format time to HH:MM
    const formattedTime = time.substring(0, 5)

    const newClass = await prisma.class.create({
      data: {
        name,
        instructorName: instructor,
        dayOfWeek,
        time: formattedTime,
        duration: parseInt(duration),
        capacity: parseInt(capacity),
        enrolled: 0,
        type: "General",
        price: 0,
        description: description || null,
      },
    })

    return NextResponse.json(
      {
        message: "Clase creada exitosamente",
        class: newClass,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating class", error)
    return NextResponse.json(
      {
        error: "No se pudo crear la clase",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

