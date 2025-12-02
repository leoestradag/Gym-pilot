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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
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

    const plans = await prisma.gymMembershipPlan.findMany({
      where: { gymId: gym.id },
      orderBy: { order: "asc" },
    })

    return NextResponse.json(plans)
  } catch (error) {
    console.error("Error fetching membership plans", error)
    return NextResponse.json(
      { error: "No se pudieron obtener los planes" },
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

    const plan = await prisma.gymMembershipPlan.create({
      data: {
        ...validation.data,
        gymId: gym.id,
      },
    })

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error("Error creating membership plan", error)
    return NextResponse.json(
      { error: "No se pudo crear el plan" },
      { status: 500 },
    )
  }
}

