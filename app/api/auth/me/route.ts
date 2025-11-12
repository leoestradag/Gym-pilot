import { NextResponse } from "next/server"

import { getSessionUser } from "@/lib/session"

export async function GET() {
  try {
    const user = await getSessionUser()
    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 })
    }

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    console.error("Error fetching session user", error)
    return NextResponse.json(
      { error: "No se pudo obtener la sesión" },
      { status: 500 },
    )
  }
}


