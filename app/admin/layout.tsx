import type React from "react"
import { AdminLayoutWrapper } from "@/components/admin-layout-wrapper"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Protection is handled by middleware.ts
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
}
