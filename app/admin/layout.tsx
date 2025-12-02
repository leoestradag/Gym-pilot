import type React from "react"
import { headers } from "next/headers"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Protection is handled by middleware.ts
  
  // Check if we're on the gym selection page - don't show sidebar there
  const headersList = await headers()
  const pathname = headersList.get("x-pathname") || ""
  
  if (pathname.includes("/admin/gym/select")) {
    // Don't show sidebar on selection page
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}
