import type React from "react"

export default function SelectGymLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // This layout doesn't include the sidebar - it's a standalone page
  return <>{children}</>
}

