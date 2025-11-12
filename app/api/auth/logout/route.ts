import { NextResponse } from "next/server"

import { clearSession } from "@/lib/session"

export async function POST() {
  try {
    await clearSession()
    return NextResponse.json({ message: "Sesión cerrada" })
  } catch (error) {
    console.error("Error clearing session", error)
    return NextResponse.json(
      { error: "No se pudo cerrar la sesión" },
      { status: 500 },
    )
  }
}


