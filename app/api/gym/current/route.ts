import { NextResponse } from "next/server"
import { getGymSession, getGymAccess } from "@/lib/gym-session"
import { prisma } from "@/lib/db"

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

    // If no session, check if there's any gym access cookie
    // We'll need to check all possible gym IDs (this is a fallback)
    // For now, return error if no session
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

