import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"

const gymSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  email: z.string().email("Email inválido"),
  hours: z.string().min(1, "Los horarios son obligatorios"),
  image: z.string().optional(),
  slug: z.string().optional(),
})

export async function GET() {
  try {
    if (!prisma || !prisma.gym) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const gyms = await prisma.gym.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        location: true,
        phone: true,
        email: true,
        hours: true,
        image: true,
        slug: true,
        adminCode: true,
      },
    })

    return NextResponse.json(gyms)
  } catch (error) {
    console.error("Error fetching gyms", error)
    return NextResponse.json(
      { error: "No se pudieron obtener los gimnasios" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = gymSchema.safeParse(body)

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

    const { name, location, phone, email, hours, image, slug } = validation.data

    // Generate slug if not provided
    let finalSlug = slug
    if (!finalSlug) {
      finalSlug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    }

    // Check if slug already exists
    const existingGym = await prisma.gym.findUnique({
      where: { slug: finalSlug },
    })

    if (existingGym) {
      return NextResponse.json(
        { error: "Ya existe un gimnasio con este slug" },
        { status: 409 },
      )
    }

    // Generate admin code
    const gymCount = await prisma.gym.count()
    const adminCode = `GYM${String(gymCount + 1).padStart(3, "0")}`

    const gym = await prisma.gym.create({
      data: {
        name,
        location,
        phone,
        email: email.toLowerCase(),
        hours,
        image: image || null,
        slug: finalSlug,
        adminCode,
      },
    })

    return NextResponse.json(gym, { status: 201 })
  } catch (error) {
    console.error("Error creating gym", error)
    return NextResponse.json(
      {
        error: "No se pudo crear el gimnasio",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}


