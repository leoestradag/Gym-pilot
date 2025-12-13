import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo válido"),
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

    if (!prisma || !prisma.userAccount) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const { email, password } = validation.data

    // Find user by email
    const user = await prisma.userAccount.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 },
      )
    }

    // Check if user has a password set
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "La contraseña no está configurada. Contacta al administrador." },
        { status: 401 },
      )
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos" },
        { status: 401 },
      )
    }

    // Create JWT token
    const token = await new SignJWT({
      userId: user.id,
      email: user.email,
      type: "user",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(JWT_SECRET)

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set("user_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    return NextResponse.json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Error in user login", error)
    return NextResponse.json(
      {
        error: "No se pudo completar el inicio de sesión",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

