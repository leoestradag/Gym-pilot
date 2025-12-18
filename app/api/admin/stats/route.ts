import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getGymSession, getGymAccess } from "@/lib/gym-session"

export async function GET(request: Request) {
  // Obtener gymId de la sesión o de cookies de acceso
  let gymId: number | null = null
  
  // Intentar obtener de la sesión primero
  const gymSession = await getGymSession()
  if (gymSession) {
    gymId = gymSession.id
  } else {
    // Si no hay sesión, buscar en cookies de acceso
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    
    // Buscar cookies gym_access_*
    for (const cookie of allCookies) {
      if (cookie.name.startsWith("gym_access_")) {
        const cookieGymId = Number(cookie.name.replace("gym_access_", ""))
        if (!Number.isNaN(cookieGymId)) {
          const gymAccess = await getGymAccess(cookieGymId)
          if (gymAccess) {
            gymId = gymAccess.id
            break
          }
        }
      }
    }
  }
  
  if (!gymId) {
    return NextResponse.json(
      { error: "Se requiere sesión de gimnasio" },
      { status: 401 },
    )
  }
  try {
    if (!prisma) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const now = new Date()
    const startOfToday = new Date(now.setHours(0, 0, 0, 0))
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // 1. Miembros Activos (con membresía activa y no expirada) - filtrado por gimnasio
    const activeMembers = await prisma.member.count({
      where: {
        gymId: gymId,
        status: "active",
        membershipEnd: {
          gte: now,
        },
      },
    })

    // Miembros activos del mes anterior para calcular tendencia
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const activeMembersLastMonth = await prisma.member.count({
      where: {
        gymId: gymId,
        status: "active",
        membershipEnd: {
          gte: lastMonthDate,
        },
      },
    })

    const activeMembersTrend = activeMembersLastMonth > 0
      ? Math.round(((activeMembers - activeMembersLastMonth) / activeMembersLastMonth) * 100)
      : 0

    // 2. Check-ins de Hoy - filtrado por gimnasio (a través de miembros)
    const todayCheckins = await prisma.checkIn.count({
      where: {
        checkinTime: {
          gte: startOfToday,
        },
        member: {
          gymId: gymId,
        },
      },
    })

    // Check-ins del mismo día del mes anterior (aproximado)
    const lastMonthSameDay = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
    const checkinsLastMonth = await prisma.checkIn.count({
      where: {
        checkinTime: {
          gte: new Date(lastMonthSameDay.setHours(0, 0, 0, 0)),
          lt: new Date(lastMonthSameDay.setHours(23, 59, 59, 999)),
        },
        member: {
          gymId: gymId,
        },
      },
    })

    const checkinsTrend = checkinsLastMonth > 0
      ? Math.round(((todayCheckins - checkinsLastMonth) / checkinsLastMonth) * 100)
      : 0

    // 3. Ingresos del Mes (suma de precios de planes de membresía de miembros creados este mes)
    // Obtener todos los miembros creados este mes - filtrado por gimnasio
    const membersThisMonth = await prisma.member.findMany({
      where: {
        gymId: gymId,
        createdAt: {
          gte: startOfMonth,
        },
      },
      select: {
        membershipType: true,
      },
    })

    // Obtener todos los planes de membresía del gimnasio para calcular ingresos
    const allPlans = await prisma.gymMembershipPlan.findMany({
      where: {
        gymId: gymId,
      },
      select: {
        name: true,
        price: true,
        period: true,
      },
    })

    // Calcular ingresos basado en membresías creadas este mes
    let monthlyRevenue = 0
    for (const member of membersThisMonth) {
      const plan = allPlans.find((p) => p.name === member.membershipType)
      if (plan) {
        // Si el periodo es "mes", usar el precio directamente
        // Si es "trimestre", dividir por 3
        // Si es "año", dividir por 12
        let monthlyPrice = plan.price
        if (plan.period === "trimestre") {
          monthlyPrice = plan.price / 3
        } else if (plan.period === "año") {
          monthlyPrice = plan.price / 12
        }
        monthlyRevenue += monthlyPrice
      }
    }

    // Ingresos del mes anterior
    const membersLastMonth = await prisma.member.findMany({
      where: {
        gymId: gymId,
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
      },
      select: {
        membershipType: true,
      },
    })

    let lastMonthRevenue = 0
    for (const member of membersLastMonth) {
      const plan = allPlans.find((p) => p.name === member.membershipType)
      if (plan) {
        let monthlyPrice = plan.price
        if (plan.period === "trimestre") {
          monthlyPrice = plan.price / 3
        } else if (plan.period === "año") {
          monthlyPrice = plan.price / 12
        }
        lastMonthRevenue += monthlyPrice
      }
    }

    const revenueTrend = lastMonthRevenue > 0
      ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
      : 0

    // 4. Nuevas Membresías (miembros creados este mes) - filtrado por gimnasio
    const newMemberships = await prisma.member.count({
      where: {
        gymId: gymId,
        createdAt: {
          gte: startOfMonth,
        },
      },
    })

    const newMembershipsLastMonth = await prisma.member.count({
      where: {
        gymId: gymId,
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
      },
    })

    const newMembershipsTrend = newMembershipsLastMonth > 0
      ? Math.round(((newMemberships - newMembershipsLastMonth) / newMembershipsLastMonth) * 100)
      : 0

    // 5. Asistencia Semanal (check-ins por día de la semana) - filtrado por gimnasio
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay() + 1) // Lunes de esta semana
    weekStart.setHours(0, 0, 0, 0)

    const weeklyCheckins = await prisma.checkIn.findMany({
      where: {
        checkinTime: {
          gte: weekStart,
        },
        member: {
          gymId: gymId,
        },
      },
      select: {
        checkinTime: true,
      },
    })

    // Agrupar por día de la semana
    const attendanceByDay: { [key: string]: number } = {
      Lun: 0,
      Mar: 0,
      Mié: 0,
      Jue: 0,
      Vie: 0,
      Sáb: 0,
      Dom: 0,
    }

    weeklyCheckins.forEach((checkin) => {
      const day = new Date(checkin.checkinTime).getDay()
      const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      attendanceByDay[dayNames[day]]++
    })

    // 6. Total de miembros inscritos hasta hoy - filtrado por gimnasio
    const totalMembers = await prisma.member.count({
      where: {
        gymId: gymId,
      },
    })

    return NextResponse.json({
      activeMembers: {
        value: activeMembers,
        trend: activeMembersTrend,
      },
      todayCheckins: {
        value: todayCheckins,
        trend: checkinsTrend,
      },
      monthlyRevenue: {
        value: monthlyRevenue,
        trend: revenueTrend,
      },
      newMemberships: {
        value: newMemberships,
        trend: newMembershipsTrend,
      },
      weeklyAttendance: attendanceByDay,
      totalMembers,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats", error)
    return NextResponse.json(
      {
        error: "No se pudieron obtener las estadísticas",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

