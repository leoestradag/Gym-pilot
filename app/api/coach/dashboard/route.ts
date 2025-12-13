import { NextResponse } from "next/server"

import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const coachIdParam = searchParams.get("coachId")

  if (!coachIdParam) {
    return NextResponse.json({ error: "Falta el parámetro coachId" }, { status: 400 })
  }

  const coachId = Number(coachIdParam)

  if (Number.isNaN(coachId) || coachId <= 0) {
    return NextResponse.json({ error: "coachId inválido" }, { status: 400 })
  }

  if (!prisma.coachProfile) {
    return NextResponse.json(
      { error: "Servicio de base de datos no disponible" },
      { status: 503 },
    )
  }

  try {
    const coach = await prisma.coachProfile.findUnique({
      where: { id: coachId },
      include: {
        userAccount: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    if (!coach) {
      return NextResponse.json({ error: "Coach no encontrado" }, { status: 404 })
    }

    const accessRequests = await prisma.coachUserAccess.findMany({
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

    const approvedClients = accessRequests.filter((request) => request.status === "APPROVED")
    const pendingClients = accessRequests.filter((request) => request.status === "PENDING")

    const upcomingClasses = await prisma.coachClassSession.findMany({
      where: {
        coachId,
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        template: {
          select: {
            title: true,
            dayOfWeek: true,
          },
        },
      },
      orderBy: { startDate: "asc" },
      take: 10,
    })

    return NextResponse.json({
      coach: {
        id: coach.id,
        status: coach.status,
        role: coach.role,
        bio: coach.bio,
        gymId: coach.gymId,
        specialties: coach.specialties,
        certifications: coach.certifications,
        experienceYears: coach.experienceYears,
        userAccount: coach.userAccount,
      },
      stats: {
        approvedClients: approvedClients.length,
        pendingRequests: pendingClients.length,
        upcomingClasses: upcomingClasses.length,
      },
      approvedClients,
      pendingRequests: pendingClients,
      upcomingClasses: upcomingClasses.map((session) => ({
        id: session.id,
        title: session.title,
        description: session.description,
        location: session.location,
        startDate: session.startDate,
        endDate: session.endDate,
        capacity: session.capacity,
        templateTitle: session.template?.title ?? null,
        templateDay: session.template?.dayOfWeek ?? null,
      })),
    })
  } catch (error) {
    console.error("Error loading coach dashboard", error)
    return NextResponse.json(
      { error: "No se pudo cargar la información del coach" },
      { status: 500 },
    )
  }
}




