import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    
    if (!prisma || !prisma.gym || !prisma.class) {
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

    // Obtener clases del gimnasio (por ahora todas las clases, luego podemos filtrar por gymId si agregamos esa relación)
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

    // Formatear clases
    const dayMap: { [key: string]: string } = {
      lunes: "Lunes",
      martes: "Martes",
      miercoles: "Miércoles",
      jueves: "Jueves",
      viernes: "Viernes",
      sabado: "Sábado",
      domingo: "Domingo",
    }

    const formattedClasses = classes.map((cls) => ({
      id: cls.id,
      name: cls.name,
      instructor: cls.instructor?.name || cls.instructorName || "Sin instructor",
      day: dayMap[cls.dayOfWeek.toLowerCase()] || cls.dayOfWeek,
      time: cls.time,
      duration: cls.duration,
      capacity: `${cls.enrolled || 0}/${cls.capacity}`,
      description: cls.description || "",
      difficulty: cls.type || "General",
    }))

    return NextResponse.json(formattedClasses)
  } catch (error) {
    console.error("Error fetching classes", error)
    return NextResponse.json(
      { error: "No se pudieron obtener las clases" },
      { status: 500 },
    )
  }
}

