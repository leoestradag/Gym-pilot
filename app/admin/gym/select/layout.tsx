import type React from "react"

export default function SelectGymLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // This layout overrides the admin layout - no sidebar on selection page
  return (
    <div className="min-h-screen w-full">
      {children}
    </div>
  )
}

