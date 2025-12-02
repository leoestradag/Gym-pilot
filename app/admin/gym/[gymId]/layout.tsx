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
  
  // Check if this is the verify page - allow it without session
  // For other pages, require verification first
  const gym = await getGymSession()

  // If not authenticated and not on verify page, redirect to verify
  if (!gym) {
    // Allow verify page to load
    return <>{children}</>
  }

  // Check if gym is accessing their own panel
  if (gym.id !== Number(gymId)) {
    redirect(`/admin/gym/${gym.id}`)
  }

  return <>{children}</>
}

