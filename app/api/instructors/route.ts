import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"

const createInstructorSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  specialty: z.string().min(1, "La especialidad es obligatoria"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  experience: z.string().optional(),
  certifications: z.string().optional(),
  bio: z.string().optional(),
})

export async function GET() {
  try {
    if (!prisma || !prisma.instructor) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const instructors = await prisma.instructor.findMany({
      orderBy: { createdAt: "desc" },
    })

    // Transform to match the frontend format
    const formattedInstructors = instructors.map((instructor) => {
      // Parse certifications if they exist
      let certifications: string[] = []
      if (instructor.certifications) {
        try {
          certifications = instructor.certifications.split(",").map((c) => c.trim()).filter(Boolean)
        } catch {
          certifications = []
        }
      }

      // Get classes for this instructor from the classes table
      // For now, we'll return empty array and let the frontend handle it
      // In the future, we can join with classes table

      return {
        id: instructor.id,
        name: instructor.name,
        specialty: instructor.specialty,
        experience: instructor.experience || "1 año",
        certifications: certifications.length > 0 ? certifications : ["Certificación general"],
        rating: instructor.rating || 4.5,
        classes: [], // Will be populated from classes table if needed
        contact: {
          phone: instructor.phone || "+52 555 000 0000",
          email: instructor.email,
        },
      }
    })

    return NextResponse.json(formattedInstructors)
  } catch (error) {
    console.error("Error fetching instructors", error)
    return NextResponse.json(
      { error: "No se pudieron obtener los instructores" },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = createInstructorSchema.safeParse(body)

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

    if (!prisma || !prisma.instructor) {
      return NextResponse.json(
        { error: "Servicio de base de datos no disponible" },
        { status: 503 },
      )
    }

    const { name, specialty, email, phone, experience, certifications, bio } = validation.data

    // Check if email already exists
    const existingInstructor = await prisma.instructor.findUnique({
      where: { email },
    })

    if (existingInstructor) {
      return NextResponse.json(
        { error: "Ya existe un instructor con este email" },
        { status: 409 },
      )
    }

    const newInstructor = await prisma.instructor.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        specialty,
        experience: experience || null,
        certifications: certifications || null,
        rating: 4.5,
        bio: bio || null,
      },
    })

    return NextResponse.json(
      {
        message: "Instructor creado exitosamente",
        instructor: newInstructor,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating instructor", error)
    return NextResponse.json(
      {
        error: "No se pudo crear el instructor",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

