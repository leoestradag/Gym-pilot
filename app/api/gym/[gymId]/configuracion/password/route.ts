import { NextResponse } from "next/server"
import { getGymSession, getGymAccess } from "@/lib/gym-session"
import { prisma } from "@/lib/db"
import { z } from "zod"
import bcrypt from "bcryptjs"

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "La contraseña actual es obligatoria"),
  newPassword: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
})

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
    const gymSession = await getGymSession()
    const gymAccess = await getGymAccess(Number(gymId))

    if (!gymSession && !gymAccess) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    const gym = gymSession || gymAccess
    if (!gym || gym.id !== Number(gymId)) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 },
      )
    }

    const body = await request.json()
    const validation = passwordSchema.safeParse(body)

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

    // Obtener el gimnasio con la contraseña actual
    const gymData = await prisma.gym.findUnique({
      where: { id: gym.id },
      select: {
        id: true,
        passwordHash: true,
      },
    })

    if (!gymData) {
      return NextResponse.json(
        { error: "Gimnasio no encontrado" },
        { status: 404 },
      )
    }

    // Verificar contraseña actual
    if (!gymData.passwordHash) {
      return NextResponse.json(
        { error: "No hay contraseña configurada. Contacta al administrador." },
        { status: 400 },
      )
    }

    const isValidPassword = await bcrypt.compare(
      validation.data.currentPassword,
      gymData.passwordHash
    )

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "La contraseña actual es incorrecta" },
        { status: 401 },
      )
    }

    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(validation.data.newPassword, 10)

    // Actualizar contraseña
    await prisma.gym.update({
      where: { id: gym.id },
      data: {
        passwordHash: hashedPassword,
      },
    })

    return NextResponse.json({
      message: "Contraseña actualizada exitosamente",
    })
  } catch (error) {
    console.error("Error updating password", error)
    return NextResponse.json(
      { error: "No se pudo actualizar la contraseña" },
      { status: 500 },
    )
  }
}

