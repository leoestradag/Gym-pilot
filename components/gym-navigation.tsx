"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Home } from "lucide-react"

interface GymNavigationProps {
  gymId: string
  currentSection?: string
}

const navigationItems = [
  {
    id: "inicio",
    label: "Inicio",
    href: "#inicio"
  },
  {
    id: "membresias", 
    label: "Planes de Membresía",
    href: "#membresias"
  },
  {
    id: "clases",
    label: "Clases Grupales", 
    href: "#clases"
  },
  {
    id: "instalaciones",
    label: "Nuestras Instalaciones",
    href: "#instalaciones"
  },
  {
    id: "horarios",
    label: "Horarios",
    href: "#horarios"
  },
  {
    id: "contacto",
    label: "Contacto",
    href: "#contacto"
  }
]

export function GymNavigation({ gymId, currentSection = "inicio" }: GymNavigationProps) {
  const [activeSection, setActiveSection] = useState(currentSection)

  const handleNavigation = (sectionId: string, href: string) => {
    setActiveSection(sectionId)
    
    // Smooth scroll to section
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg">Tessalp Gyms</span>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleNavigation(item.id, item.href)}
                className={cn(
                  "transition-all duration-200",
                  activeSection === item.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "hover:bg-muted/50"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Back to Home Button */}
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2 bg-background/80 backdrop-blur border-border/50 hover:bg-background/90">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al Inicio</span>
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-border/50 pt-4 pb-2">
          <div className="grid grid-cols-2 gap-2">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => handleNavigation(item.id, item.href)}
                className={cn(
                  "text-xs transition-all duration-200",
                  activeSection === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted/50"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
