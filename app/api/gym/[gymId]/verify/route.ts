import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { prisma } from "@/lib/db"
import { z } from "zod"

const verifySchema = z.object({
  accessId: z.string().min(1, "El ID de acceso es obligatorio"),
})

const REQUIRED_ID = "tessalp143"
const JWT_SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "your-secret-key-change-in-production"
)

export async function POST(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    const body = await request.json()
    const validation = verifySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { accessId } = validation.data

    // Verify access ID
    if (accessId !== REQUIRED_ID) {
      return NextResponse.json(
        { error: "ID de acceso incorrecto" },
        { status: 401 },
      )
    }

    // Verify gym exists
    if (!prisma || !prisma.gym) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const gym = await prisma.gym.findUnique({
      where: { id: Number(gymId) },
      select: {
        id: true,
        name: true,
        slug: true,
      },
    })

    if (!gym) {
      return NextResponse.json(
        { error: "Gimnasio no encontrado" },
        { status: 404 },
      )
    }

    // Create temporary access token (valid for 24 hours)
    const token = await new SignJWT({
      gymId: gym.id,
      accessId: accessId,
      type: "gym_access",
      verified: true,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(JWT_SECRET)

    // Set HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set(`gym_access_${gymId}`, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })

    return NextResponse.json({
      message: "Acceso verificado exitosamente",
      gym: {
        id: gym.id,
        name: gym.name,
      },
    })
  } catch (error) {
    console.error("Error verifying access", error)
    return NextResponse.json(
      {
        error: "No se pudo verificar el acceso",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}


