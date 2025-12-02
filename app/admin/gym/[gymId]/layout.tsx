import { redirect } from "next/navigation"
import { getGymSession } from "@/lib/gym-session"

export default async function GymAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ gymId: string }>
}) {
  const { gymId } = await params
  const gym = await getGymSession()

  // Check if gym is authenticated
  if (!gym) {
    redirect("/admin/gym/login")
  }

  // Check if gym is accessing their own panel
  if (gym.id !== Number(gymId)) {
    redirect(`/admin/gym/${gym.id}`)
  }

  return <>{children}</>
}

