"use client"
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Bot,
  QrCode,
  Megaphone,
  Dumbbell,
  DollarSign,
  Home,
  Building2,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Clases",
    url: "/admin/clases",
    icon: Calendar,
  },
  {
    title: "Membresías",
    url: "/admin/membresias",
    icon: CreditCard,
  },
  {
    title: "Finanzas",
    url: "/admin/finanzas",
    icon: DollarSign,
  },
  {
    title: "Asistente IA",
    url: "/admin/asistente",
    icon: Bot,
  },
  {
    title: "Check-in",
    url: "/admin/checkin",
    icon: QrCode,
  },
  {
    title: "Marketing",
    url: "/admin/marketing",
    icon: Megaphone,
  },
  {
    title: "Mi Gimnasio",
    url: "/admin/gimnasios",
    icon: Building2,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Dumbbell className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-sidebar-foreground">Tessalp</span>
            <span className="text-xs text-muted-foreground">Smart Gyms</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestión</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={cn(
                      "transition-colors",
                      pathname === item.url && "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <Link href="/">
          <Button variant="outline" className="w-full gap-2 bg-transparent">
            <Home className="h-4 w-4" />
            Ver Sitio Público
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
