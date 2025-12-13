import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { prisma } from "@/lib/db"

const USER_SESSION_COOKIE = "user_session"

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.trim().length === 0) {
    console.warn("AUTH_SECRET ausente. Usando valor por defecto en memoria.")
    return new TextEncoder().encode("tessalp-default-auth-secret-please-set-env")
  }
  return new TextEncoder().encode(secret)
}

export async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(USER_SESSION_COOKIE)
    if (!sessionCookie) return null

    const secret = getJwtSecret()
    const { payload } = await jwtVerify(sessionCookie.value, secret)

    if (payload.type !== "user" || !payload.userId) return null

    const userId = Number(payload.userId)
    if (Number.isNaN(userId)) return null

    if (!prisma || !prisma.userAccount) return null

    const user = await prisma.userAccount.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })

    return user
  } catch (error) {
    console.error("Error decodificando sesión de usuario", error)
    return null
  }
}

export async function clearSession() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete(USER_SESSION_COOKIE)
  } catch (error) {
    console.error("Error limpiando sesión", error)
  }
}

