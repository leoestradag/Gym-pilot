import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    
    if (!prisma || !prisma.gym || !prisma.gymFacility || !prisma.gymAmenity) {
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

    // Obtener instalaciones y amenidades del gimnasio
    const facilities = await prisma.gymFacility.findMany({
      where: { gymId: gym.id },
      orderBy: { order: "asc" },
    })

    const amenities = await prisma.gymAmenity.findMany({
      where: { gymId: gym.id },
      orderBy: { order: "asc" },
    })

    return NextResponse.json({
      facilities,
      amenities,
    })
  } catch (error) {
    console.error("Error fetching facilities", error)
    return NextResponse.json(
      { error: "No se pudieron obtener las instalaciones" },
      { status: 500 },
    )
  }
}

