import { NextResponse } from "next/server"
import { getGymSession } from "@/lib/gym-session"
import { prisma } from "@/lib/db"
import { z } from "zod"

const facilitySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  image: z.string().optional(),
  features: z.array(z.string()).default([]),
  icon: z.string().optional(),
  order: z.number().default(0),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    const gym = await getGymSession()

    if (!gym || gym.id !== Number(gymId)) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    if (!prisma || !prisma.gymFacility) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const facilities = await prisma.gymFacility.findMany({
      where: { gymId: gym.id },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(facilities)
  } catch (error) {
    console.error("Error fetching facilities", error)
    return NextResponse.json(
      { error: "No se pudieron obtener las instalaciones" },
      { status: 500 },
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    const gym = await getGymSession()

    if (!gym || gym.id !== Number(gymId)) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    const body = await request.json()
    const validation = facilitySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    if (!prisma || !prisma.gymFacility) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const facility = await prisma.gymFacility.create({
      data: {
        ...validation.data,
        gymId: gym.id,
      },
    })

    return NextResponse.json(facility, { status: 201 })
  } catch (error) {
    console.error("Error creating facility", error)
    return NextResponse.json(
      { error: "No se pudo crear la instalación" },
      { status: 500 },
    )
  }
}


