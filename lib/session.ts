import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

import { prisma } from "@/lib/db"

const SESSION_COOKIE = "tessalp_session"
const JWT_ISSUER = "tessalp-gyms"
const JWT_AUDIENCE = "tessalp-users"
const SESSION_TTL = 60 * 60 * 24 * 7 // 7 días

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.trim().length === 0) {
    console.warn("AUTH_SECRET ausente. Usando valor por defecto en memoria.")
    return new TextEncoder().encode("tessalp-default-auth-secret-please-set-env")
  }
  return new TextEncoder().encode(secret)
}

export async function createSession(userId: number) {
  const secret = getJwtSecret()
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL

  const token = await new SignJWT({ sub: String(userId) })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setExpirationTime(expiresAt)
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL,
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getSessionUser() {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get(SESSION_COOKIE)
    if (!sessionCookie) return null

    const secret = getJwtSecret()
    const payload = await jwtVerify(sessionCookie.value, secret, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    })

    const userId = Number(payload.payload.sub)
    if (Number.isNaN(userId)) return null

    if (!prisma.userAccount) return null

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
    console.error("Error decodificando sesión", error)
    return null
  }
}


