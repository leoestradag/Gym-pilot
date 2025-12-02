import { NextResponse } from "next/server"
import { getGymSession, getGymAccess } from "@/lib/gym-session"
import { prisma } from "@/lib/db"
import { z } from "zod"

const membershipPlanSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  price: z.number().min(0, "El precio debe ser mayor o igual a 0"),
  period: z.string().default("mes"),
  description: z.string().optional(),
  features: z.array(z.string()).default([]),
  popular: z.boolean().default(false),
  color: z.string().optional(),
  order: z.number().default(0),
})

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ gymId: string; planId: string }> }
) {
  try {
    const { gymId, planId } = await params
    const gymSession = await getGymSession()
    const gymAccess = await getGymAccess(Number(gymId))

    if (!gymSession && !gymAccess) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    const gym = gymSession || gymAccess
    if (!gym || gym.id !== Number(gymId)) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    const body = await request.json()
    const validation = membershipPlanSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    if (!prisma || !prisma.gymMembershipPlan) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const existingPlan = await prisma.gymMembershipPlan.findFirst({
      where: {
        id: Number(planId),
        gymId: gym.id,
      },
    })

    if (!existingPlan) {
      return NextResponse.json(
        { error: "Plan no encontrado" },
        { status: 404 },
      )
    }

    const plan = await prisma.gymMembershipPlan.update({
      where: { id: Number(planId) },
      data: validation.data,
    })

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Error updating membership plan", error)
    return NextResponse.json(
      { error: "No se pudo actualizar el plan" },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ gymId: string; planId: string }> }
) {
  try {
    const { gymId, planId } = await params
    const gymSession = await getGymSession()
    const gymAccess = await getGymAccess(Number(gymId))

    if (!gymSession && !gymAccess) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    const gym = gymSession || gymAccess
    if (!gym || gym.id !== Number(gymId)) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    if (!prisma || !prisma.gymMembershipPlan) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const existingPlan = await prisma.gymMembershipPlan.findFirst({
      where: {
        id: Number(planId),
        gymId: gym.id,
      },
    })

    if (!existingPlan) {
      return NextResponse.json(
        { error: "Plan no encontrado" },
        { status: 404 },
      )
    }

    await prisma.gymMembershipPlan.delete({
      where: { id: Number(planId) },
    })

    return NextResponse.json({ message: "Plan eliminado exitosamente" })
  } catch (error) {
    console.error("Error deleting membership plan", error)
    return NextResponse.json(
      { error: "No se pudo eliminar el plan" },
      { status: 500 },
    )
  }
}

