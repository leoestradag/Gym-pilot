import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    
    if (!prisma || !prisma.gym || !prisma.gymSchedule || !prisma.class) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    // Buscar gimnasio por slug o ID
    const normalizedSlug = gymId.toLowerCase().trim()
    let gym = await prisma.gym.findFirst({
      where: {
        OR: [
          { slug: normalizedSlug },
          { slug: normalizedSlug.replace(/-/g, " ") },
          { slug: normalizedSlug.replace(/ /g, "-") },
          ...(isNaN(Number(gymId)) ? [] : [{ id: Number(gymId) }]),
        ],
      },
    })

    if (!gym) {
      return NextResponse.json(
        { error: "Gimnasio no encontrado" },
        { status: 404 },
      )
    }

    // Obtener horarios del gimnasio
    const schedules = await prisma.gymSchedule.findMany({
      where: { gymId: gym.id },
      orderBy: { dayOfWeek: "asc" },
    })

    // Obtener clases del gimnasio
    const classes = await prisma.class.findMany({
      include: {
        instructor: {
          select: {
            name: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    // Formatear clases por día
    const dayMap: { [key: string]: string } = {
      lunes: "Lunes",
      martes: "Martes",
      miercoles: "Miércoles",
      jueves: "Jueves",
      viernes: "Viernes",
      sabado: "Sábado",
      domingo: "Domingo",
    }

    const classesByDay: { [key: string]: any[] } = {}
    classes.forEach((cls) => {
      const day = dayMap[cls.dayOfWeek.toLowerCase()] || cls.dayOfWeek
      if (!classesByDay[day]) {
        classesByDay[day] = []
      }
      classesByDay[day].push({
        time: cls.time,
        class: cls.name,
        instructor: cls.instructor?.name || cls.instructorName || "Sin instructor",
        capacity: `${cls.enrolled || 0}/${cls.capacity}`,
      })
    })

    return NextResponse.json({
      schedules,
      classesByDay,
    })
  } catch (error) {
    console.error("Error fetching schedules", error)
    return NextResponse.json(
      { error: "No se pudieron obtener los horarios" },
      { status: 500 },
    )
  }
}

