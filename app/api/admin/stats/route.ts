import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
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

    // 1. Miembros Activos (con membresía activa y no expirada)
    const activeMembers = await prisma.member.count({
      where: {
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
        status: "active",
        membershipEnd: {
          gte: lastMonthDate,
        },
      },
    })

    const activeMembersTrend = activeMembersLastMonth > 0
      ? Math.round(((activeMembers - activeMembersLastMonth) / activeMembersLastMonth) * 100)
      : 0

    // 2. Check-ins de Hoy
    const todayCheckins = await prisma.checkIn.count({
      where: {
        checkinTime: {
          gte: startOfToday,
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
      },
    })

    const checkinsTrend = checkinsLastMonth > 0
      ? Math.round(((todayCheckins - checkinsLastMonth) / checkinsLastMonth) * 100)
      : 0

    // 3. Ingresos del Mes (suma de precios de planes de membresía de miembros creados este mes)
    // Obtener todos los miembros creados este mes
    const membersThisMonth = await prisma.member.findMany({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
      select: {
        membershipType: true,
      },
    })

    // Obtener todos los planes de membresía para calcular ingresos
    const allPlans = await prisma.gymMembershipPlan.findMany({
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

    // 4. Nuevas Membresías (miembros creados este mes)
    const newMemberships = await prisma.member.count({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
    })

    const newMembershipsLastMonth = await prisma.member.count({
      where: {
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfMonth,
        },
      },
    })

    const newMembershipsTrend = newMembershipsLastMonth > 0
      ? Math.round(((newMemberships - newMembershipsLastMonth) / newMembershipsLastMonth) * 100)
      : 0

    // 5. Asistencia Semanal (check-ins por día de la semana)
    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - now.getDay() + 1) // Lunes de esta semana
    weekStart.setHours(0, 0, 0, 0)

    const weeklyCheckins = await prisma.checkIn.findMany({
      where: {
        checkinTime: {
          gte: weekStart,
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

    // 6. Total de miembros inscritos hasta hoy
    const totalMembers = await prisma.member.count()

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

