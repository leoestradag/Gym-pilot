import { NextResponse } from "next/server"
import { getGymSession, getGymAccess } from "@/lib/gym-session"
import { prisma } from "@/lib/db"
import { z } from "zod"

const scheduleSchema = z.object({
  dayOfWeek: z.string(),
  openTime: z.string(),
  closeTime: z.string(),
  isClosed: z.boolean(),
})

const schedulesSchema = z.object({
  schedules: z.array(scheduleSchema),
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
        { status: 401 }
      )
    }

    if (!prisma || !prisma.gymSchedule) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 }
      )
    }

    const schedules = await prisma.gymSchedule.findMany({
      where: { gymId: Number(gymId) },
      orderBy: { dayOfWeek: "asc" },
    })

    return NextResponse.json(schedules)
  } catch (error) {
    console.error("Error fetching schedules", error)
    return NextResponse.json(
      { error: "No se pudieron obtener los horarios" },
      { status: 500 }
    )
  }
}

export async function PUT(
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
        { status: 401 }
      )
    }

    const body = await request.json()
    const validation = schedulesSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    if (!prisma || !prisma.gymSchedule) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 }
      )
    }

    const { schedules } = validation.data
    const gymIdNum = Number(gymId)

    // Delete existing schedules for this gym
    await prisma.gymSchedule.deleteMany({
      where: { gymId: gymIdNum },
    })

    // Create new schedules
    const createdSchedules = await Promise.all(
      schedules.map((schedule) =>
        prisma.gymSchedule.create({
          data: {
            gymId: gymIdNum,
            dayOfWeek: schedule.dayOfWeek,
            openTime: schedule.openTime,
            closeTime: schedule.closeTime,
            isClosed: schedule.isClosed,
          },
        })
      )
    )

    return NextResponse.json({
      message: "Horarios actualizados exitosamente",
      schedules: createdSchedules,
    })
  } catch (error) {
    console.error("Error updating schedules", error)
    return NextResponse.json(
      { error: "No se pudieron actualizar los horarios" },
      { status: 500 }
    )
  }
}


