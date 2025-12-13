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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ gymId: string }> }
) {
  try {
    const { gymId } = await params
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

    // Check if gym exists
    const existingGym = await prisma.gym.findUnique({
      where: { id: Number(gymId) },
    })

    if (!existingGym) {
      return NextResponse.json(
        { error: "Gimnasio no encontrado" },
        { status: 404 },
      )
    }

    // Check if slug is being changed and if it conflicts
    let finalSlug = slug || existingGym.slug
    if (slug && slug !== existingGym.slug) {
      const slugConflict = await prisma.gym.findUnique({
        where: { slug },
      })

      if (slugConflict) {
        return NextResponse.json(
          { error: "Ya existe un gimnasio con este slug" },
          { status: 409 },
        )
      }
    }

    const gym = await prisma.gym.update({
      where: { id: Number(gymId) },
      data: {
        name,
        location,
        phone,
        email: email.toLowerCase(),
        hours,
        image: image || null,
        slug: finalSlug,
      },
    })

    return NextResponse.json(gym)
  } catch (error) {
    console.error("Error updating gym", error)
    return NextResponse.json(
      {
        error: "No se pudo actualizar el gimnasio",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}


