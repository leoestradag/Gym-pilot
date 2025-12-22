import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"

const createClassSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  instructor: z.string().optional(), // Mantener para compatibilidad
  instructorId: z.union([z.string(), z.number()]).optional(), // ID del instructor
  instructorName: z.string().optional(), // Nombre del instructor
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

    const { name, instructor, instructorId, instructorName, day, time, duration, capacity, description } = validation.data

    // Validar que haya instructorId o instructor
    if (!instructorId && !instructor) {
      return NextResponse.json(
        { error: "El instructor es obligatorio" },
        { status: 400 },
      )
    }

    // Obtener el instructor si se proporciona instructorId
    let finalInstructorId: number | null = null
    let finalInstructorName: string | null = null

    if (instructorId) {
      const instructorIdNum = typeof instructorId === "string" ? parseInt(instructorId) : instructorId
      if (!Number.isNaN(instructorIdNum)) {
        const instructorRecord = await prisma.instructor.findUnique({
          where: { id: instructorIdNum },
          select: { id: true, name: true },
        })
        if (instructorRecord) {
          finalInstructorId = instructorRecord.id
          finalInstructorName = instructorRecord.name
        }
      }
    } else if (instructor) {
      // Si solo se proporciona el nombre, buscar por nombre
      finalInstructorName = instructor
    }

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
        instructorId: finalInstructorId,
        instructorName: finalInstructorName || instructorName || instructor || null,
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

