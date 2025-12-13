import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"

import { prisma } from "@/lib/db"

const registerSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/, {
      message: "Debe contener letras y números",
    }),
  role: z.enum([
    "STAFF",
    "PERSONAL_TRAINER",
    "SPINNING",
    "PILATES",
    "YOGA",
    "CROSSFIT",
    "NUTRITION",
  ]),
  gymId: z.number().int().positive().optional(),
  bio: z
    .string()
    .max(600, "La biografía debe tener máximo 600 caracteres")
    .optional(),
  certifications: z
    .string()
    .max(400, "Las certificaciones deben tener máximo 400 caracteres")
    .optional(),
  specialties: z.array(z.string()).optional(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validation = registerSchema.safeParse(body)
    if (!validation.success) {
      const flatErrors = validation.error.flatten()
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: flatErrors.fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, password, role, gymId, bio, certifications, specialties } =
      validation.data

    if (!prisma.userAccount || !prisma.coachProfile) {
      return NextResponse.json(
        { error: "Conexión a base de datos no disponible" },
        { status: 503 }
      )
    }

    const existingAccount = await prisma.userAccount.findUnique({
      where: { email },
    })

    if (existingAccount) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este correo" },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userAccount = await prisma.userAccount.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
        role: "COACH",
      },
    })

    const coachProfile = await prisma.coachProfile.create({
      data: {
        userAccountId: userAccount.id,
        role,
        status: "PENDING",
        bio,
        certifications,
        specialties: specialties?.map((item) => item.trim()).filter(Boolean) ?? [],
        gymId,
      },
    })

    return NextResponse.json(
      {
        message: "Solicitud de registro enviada",
        coachId: coachProfile.id,
        status: coachProfile.status,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Coach register error", error)
    return NextResponse.json(
      { error: "No se pudo completar el registro" },
      { status: 500 }
    )
  }
}




