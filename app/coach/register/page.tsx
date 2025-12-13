import { Suspense } from "react"

import { prisma } from "@/lib/db"

import { CoachRegisterForm } from "./register-form"

export const dynamic = "force-dynamic"

export default async function CoachRegisterPage() {
  const gyms = prisma.gym
    ? await prisma.gym.findMany({
        orderBy: { name: "asc" },
      })
    : []

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/40 bg-card/30 backdrop-blur">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-balance">
              Únete como Coach en Tessalp Gyms
            </h1>
            <p className="text-muted-foreground text-lg max-w-3xl">
              Comparte tu experiencia como entrenador, spinning coach, instructor de pilates o
              staff del gimnasio. Completa tu perfil para que los usuarios puedan solicitar tus
              servicios y tú puedas gestionar sus rutinas y dietas.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <Suspense fallback={<div className="text-muted-foreground">Cargando formulario...</div>}>
          <CoachRegisterForm gyms={gyms} />
        </Suspense>
      </div>
    </div>
  )
}



