import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const loginSchema = z.object({
  adminCode: z.string().min(1, "El código de administrador es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "your-secret-key-change-in-production"
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = loginSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    if (!prisma || !prisma.gym) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const { adminCode, password } = validation.data

    // Find gym by admin code
    const gym = await prisma.gym.findUnique({
      where: { adminCode },
    })

    if (!gym) {
      return NextResponse.json(
        { error: "Código de administrador o contraseña incorrectos" },
        { status: 401 },
      )
    }

    // Check if gym has a password set
    if (!gym.passwordHash) {
      // If no password is set, we can set it now or return error
      return NextResponse.json(
        { error: "La contraseña no está configurada. Contacta al administrador." },
        { status: 401 },
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, gym.passwordHash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Código de administrador o contraseña incorrectos" },
        { status: 401 },
      )
    }

    // Create JWT token
    const token = await new SignJWT({
      gymId: gym.id,
      adminCode: gym.adminCode,
      type: "gym",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set("gym_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      gym: {
        id: gym.id,
        name: gym.name,
        slug: gym.slug,
        adminCode: gym.adminCode,
      },
    })
  } catch (error) {
    console.error("Error in gym login", error)
    return NextResponse.json(
      {
        error: "No se pudo completar el inicio de sesión",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

