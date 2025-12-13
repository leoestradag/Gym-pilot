import { NextResponse } from "next/server"
import { z } from "zod"

import { prisma } from "@/lib/db"

const respondSchema = z.object({
  requestId: z.number().int().positive(),
  action: z.enum(["APPROVE", "REJECT"]),
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const memberIdParam = searchParams.get("memberId")

    if (!memberIdParam) {
      return NextResponse.json({ error: "Falta el parámetro memberId" }, { status: 400 })
    }

    const memberId = Number(memberIdParam)

    if (Number.isNaN(memberId) || memberId <= 0) {
      return NextResponse.json({ error: "memberId inválido" }, { status: 400 })
    }

    if (!prisma.coachUserAccess) {
      return NextResponse.json({ error: "Servicio de base de datos no disponible" }, { status: 503 })
    }

    const requests = await prisma.coachUserAccess.findMany({
      where: { memberId },
      include: {
        coach: {
          include: {
            userAccount: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { requestedAt: "desc" },
    })

    return NextResponse.json({ requests }, { status: 200 })
  } catch (error) {
    console.error("Error fetching member access requests", error)
    return NextResponse.json({ error: "No se pudieron obtener las solicitudes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json()
    const parsed = respondSchema.safeParse(rawBody)

    if (!parsed.success) {
      const flatErrors = parsed.error.flatten().fieldErrors
      return NextResponse.json({ error: "Datos inválidos", details: flatErrors }, { status: 400 })
    }

    if (!prisma.coachUserAccess) {
      return NextResponse.json({ error: "Servicio de base de datos no disponible" }, { status: 503 })
    }

    const { requestId, action } = parsed.data

    const accessRequest = await prisma.coachUserAccess.findUnique({
      where: { id: requestId },
    })

    if (!accessRequest) {
      return NextResponse.json({ error: "Solicitud no encontrada" }, { status: 404 })
    }

    if (accessRequest.status !== "PENDING") {
      return NextResponse.json(
        { error: "La solicitud ya fue respondida" },
        { status: 409 }
      )
    }

    const newStatus = action === "APPROVE" ? "APPROVED" : "REJECTED"

    await prisma.coachUserAccess.update({
      where: { id: requestId },
      data: {
        status: newStatus,
        respondedAt: new Date(),
      },
    })

    return NextResponse.json({
      message: `Solicitud ${newStatus === "APPROVED" ? "aprobada" : "rechazada"}`,
      status: newStatus,
    })
  } catch (error) {
    console.error("Error responding to access request", error)
    return NextResponse.json({ error: "No se pudo actualizar la solicitud" }, { status: 500 })
  }
}



