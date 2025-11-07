import { NextResponse } from "next/server"
import { z } from "zod"

import { prisma } from "@/lib/db"

const requestSchema = z.object({
  coachId: z.number().int().positive(),
  memberId: z.number().int().positive(),
  notes: z.string().max(400).optional(),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const coachIdParam = searchParams.get("coachId")

    if (!coachIdParam) {
      return NextResponse.json({ error: "Falta el parámetro coachId" }, { status: 400 })
    }

    const coachId = Number(coachIdParam)

    if (Number.isNaN(coachId) || coachId <= 0) {
      return NextResponse.json({ error: "coachId inválido" }, { status: 400 })
    }

    if (!prisma.coachUserAccess) {
      return NextResponse.json({ error: "Servicio de base de datos no disponible" }, { status: 503 })
    }

    const requests = await prisma.coachUserAccess.findMany({
      where: { coachId },
      include: {
        member: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { requestedAt: "desc" },
    })

    return NextResponse.json({ requests }, { status: 200 })
  } catch (error) {
    console.error("Error fetching coach access requests", error)
    return NextResponse.json({ error: "No se pudieron obtener las solicitudes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json()
    const parsed = requestSchema.safeParse(rawBody)

    if (!parsed.success) {
      const flatErrors = parsed.error.flatten().fieldErrors
      return NextResponse.json({ error: "Datos inválidos", details: flatErrors }, { status: 400 })
    }

    const { coachId, memberId, notes } = parsed.data

    if (!prisma.coachProfile || !prisma.member || !prisma.coachUserAccess) {
      return NextResponse.json({ error: "Servicio de base de datos no disponible" }, { status: 503 })
    }

    const coach = await prisma.coachProfile.findUnique({ where: { id: coachId } })

    if (!coach) {
      return NextResponse.json({ error: "Coach no encontrado" }, { status: 404 })
    }

    const member = await prisma.member.findUnique({ where: { id: memberId } })

    if (!member) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const existingRequest = await prisma.coachUserAccess.findFirst({
      where: {
        coachId,
        memberId,
        status: { in: ["PENDING", "APPROVED"] },
      },
    })

    if (existingRequest) {
      return NextResponse.json(
        { error: "Ya existe una solicitud pendiente o aprobada" },
        { status: 409 }
      )
    }

    const newRequest = await prisma.coachUserAccess.create({
      data: {
        coachId,
        memberId,
        notes,
        status: "PENDING",
      },
    })

    return NextResponse.json({
      message: "Solicitud enviada",
      requestId: newRequest.id,
    })
  } catch (error) {
    console.error("Error creating coach access request", error)
    return NextResponse.json({ error: "No se pudo enviar la solicitud" }, { status: 500 })
  }
}

