import { redirect } from "next/navigation"
import { getGymSession, getGymAccess } from "@/lib/gym-session"

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
  const gymSession = await getGymSession()
  const gymAccess = await getGymAccess(Number(gymId))

  // If not authenticated and no access verified, allow verify page to load
  // Otherwise, check access
  if (!gymSession && !gymAccess) {
    // Allow verify page to load
    return <>{children}</>
  }

  // Use session or access, prefer session
  const currentGym = gymSession || gymAccess

  if (!currentGym) {
    return <>{children}</>
  }

  // Check if gym is accessing their own panel
  if (currentGym.id !== Number(gymId)) {
    redirect(`/admin/gym/${currentGym.id}`)
  }

  return <>{children}</>
}

