import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"

import { prisma } from "@/lib/db"

const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(60, "El nombre es demasiado largo"),
  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(60, "El apellido es demasiado largo"),
  email: z.string().email("Ingresa un correo válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .refine((val) => /[A-Za-z]/.test(val), {
      message: "La contraseña debe contener al menos una letra",
    })
    .refine((val) => /\d/.test(val), {
      message: "La contraseña debe contener al menos un número",
    }),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors
      return NextResponse.json(
        {
          error: "Datos inválidos",
          details: fieldErrors,
        },
        { status: 400 },
      )
    }

    const { firstName, lastName, email, password } = validation.data

    if (!prisma || !prisma.userAccount) {
      console.error("Prisma client not available or userAccount model not found")
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const existingUser = await prisma.userAccount.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este correo" },
        { status: 409 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim()

    const user = await prisma.userAccount.create({
      data: {
        name: fullName,
        email: email.toLowerCase(),
        passwordHash: hashedPassword,
        role: "USER",
      },
    })

    const secretPresent = Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length > 0)
    return NextResponse.json(
      {
        message: "Registro completado",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        debug: {
          secretPresent,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error registering user", error)
    return NextResponse.json(
      {
        error: "No se pudo completar el registro",
        details: error instanceof Error ? error.message : String(error),
        secretPresent: Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length > 0),
      },
      { status: 500 },
    )
  }
}


