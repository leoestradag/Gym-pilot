import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete("gym_session")

    return NextResponse.json({ message: "Sesión cerrada exitosamente" })
  } catch (error) {
    console.error("Error in gym logout", error)
    return NextResponse.json(
      { error: "No se pudo cerrar la sesión" },
      { status: 500 },
    )
  }
}

