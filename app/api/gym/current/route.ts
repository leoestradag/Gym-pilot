import { NextResponse } from "next/server"
import { getGymSession, getGymAccess } from "@/lib/gym-session"
import { prisma } from "@/lib/db"
import { cookies } from "next/headers"

export async function GET() {
  try {
    // Try to get gym from session first
    const gymSession = await getGymSession()
    
    if (gymSession) {
      // Get full gym data with relations
      const gym = await prisma.gym.findUnique({
        where: { id: gymSession.id },
        include: {
          facilities: {
            orderBy: { order: "asc" },
          },
          amenities: {
            orderBy: { order: "asc" },
          },
          membershipPlans: {
            orderBy: { order: "asc" },
          },
          schedules: {
            orderBy: { dayOfWeek: "asc" },
          },
        },
      })

      if (gym) {
        return NextResponse.json({ gym })
      }
    }

    // If no session, check for gym access cookies
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()
    
    // Look for gym_access_* cookies
    for (const cookie of allCookies) {
      if (cookie.name.startsWith("gym_access_")) {
        const gymId = Number(cookie.name.replace("gym_access_", ""))
        if (!Number.isNaN(gymId)) {
          const gymAccess = await getGymAccess(gymId)
          if (gymAccess) {
            // Get full gym data with relations
            const gym = await prisma.gym.findUnique({
              where: { id: gymAccess.id },
              include: {
                facilities: {
                  orderBy: { order: "asc" },
                },
                amenities: {
                  orderBy: { order: "asc" },
                },
                membershipPlans: {
                  orderBy: { order: "asc" },
                },
                schedules: {
                  orderBy: { dayOfWeek: "asc" },
                },
              },
            })

            if (gym) {
              return NextResponse.json({ gym })
            }
          }
        }
      }
    }

    // No session or access found
    return NextResponse.json(
      { error: "No hay gimnasio asociado a tu sesión" },
      { status: 401 }
    )
  } catch (error) {
    console.error("Error getting current gym", error)
    return NextResponse.json(
      { error: "Error al obtener el gimnasio" },
      { status: 500 }
    )
  }
}

