import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { prisma } from "@/lib/db"

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "your-secret-key-change-in-production"
)

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("gym_session")?.value

    if (!token) {
      return NextResponse.json(
        { error: "No autenticado" },
        { status: 401 },
      )
    }

    // Verify token
    const { payload } = await jwtVerify(token, JWT_SECRET)

    if (payload.type !== "gym" || !payload.gymId) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 401 },
      )
    }

    if (!prisma || !prisma.gym) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    // Get gym data
    const gym = await prisma.gym.findUnique({
      where: { id: payload.gymId as number },
      select: {
        id: true,
        name: true,
        slug: true,
        adminCode: true,
        location: true,
        phone: true,
        email: true,
        hours: true,
        image: true,
      },
    })

    if (!gym) {
      return NextResponse.json(
        { error: "Gimnasio no encontrado" },
        { status: 404 },
      )
    }

    return NextResponse.json({ gym })
  } catch (error) {
    console.error("Error verifying gym session", error)
    return NextResponse.json(
      { error: "Sesión inválida" },
      { status: 401 },
    )
  }
}

