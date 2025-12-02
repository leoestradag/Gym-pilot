import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { prisma } from "@/lib/db"

const GYM_SESSION_COOKIE = "gym_session"

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.trim().length === 0) {
    console.warn("AUTH_SECRET ausente. Usando valor por defecto en memoria.")
    return new TextEncoder().encode("tessalp-default-auth-secret-please-set-env")
  }
  return new TextEncoder().encode(secret)
}

export async function getGymSession() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(GYM_SESSION_COOKIE)
    if (!sessionCookie) return null

    const secret = getJwtSecret()
    const { payload } = await jwtVerify(sessionCookie.value, secret)

    if (payload.type !== "gym" || !payload.gymId) return null

    const gymId = Number(payload.gymId)
    if (Number.isNaN(gymId)) return null

    if (!prisma || !prisma.gym) return null

    const gym = await prisma.gym.findUnique({
      where: { id: gymId },
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

    return gym
  } catch (error) {
    console.error("Error decodificando sesión de gimnasio", error)
    return null
  }
}

