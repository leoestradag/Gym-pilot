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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ gymId: string; facilityId: string }> }
) {
  try {
    const { gymId, facilityId } = await params
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

    // Verify facility belongs to gym
    const existingFacility = await prisma.gymFacility.findFirst({
      where: {
        id: Number(facilityId),
        gymId: gym.id,
      },
    })

    if (!existingFacility) {
      return NextResponse.json(
        { error: "Instalación no encontrada" },
        { status: 404 },
      )
    }

    const facility = await prisma.gymFacility.update({
      where: { id: Number(facilityId) },
      data: validation.data,
    })

    return NextResponse.json(facility)
  } catch (error) {
    console.error("Error updating facility", error)
    return NextResponse.json(
      { error: "No se pudo actualizar la instalación" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ gymId: string; facilityId: string }> }
) {
  try {
    const { gymId, facilityId } = await params
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

    // Verify facility belongs to gym
    const existingFacility = await prisma.gymFacility.findFirst({
      where: {
        id: Number(facilityId),
        gymId: gym.id,
      },
    })

    if (!existingFacility) {
      return NextResponse.json(
        { error: "Instalación no encontrada" },
        { status: 404 },
      )
    }

    await prisma.gymFacility.delete({
      where: { id: Number(facilityId) },
    })

    return NextResponse.json({ message: "Instalación eliminada exitosamente" })
  } catch (error) {
    console.error("Error deleting facility", error)
    return NextResponse.json(
      { error: "No se pudo eliminar la instalación" },
      { status: 500 },
    )
  }
}

