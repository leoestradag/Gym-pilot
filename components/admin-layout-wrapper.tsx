"use client"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Don't show sidebar on gym selection page
  if (pathname?.includes("/admin/gym/select") || pathname?.includes("/admin/gym/login")) {
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

