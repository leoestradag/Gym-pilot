"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Settings,
  LogOut,
  Mail,
  Crown,
  ChevronDown,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SessionUser {
  id: number
  name: string | null
  email: string | null
  role: string
}

export function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [sessionUser, setSessionUser] = useState<SessionUser | null | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadSession = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        })
        const data = await response.json()
        setSessionUser(data.user)
      } catch (error) {
        console.error("Error fetching session", error)
        setSessionUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [])

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
      setSessionUser(null)
      setIsOpen(false)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Logout error", error)
    }
  }

  const getInitials = () => {
    if (!sessionUser?.name) return "U"
    const parts = sessionUser.name.trim().split(/\s+/)
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase()
    }
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
  }

  const getDisplayName = () => {
    if (sessionUser?.name) return sessionUser.name
    if (sessionUser?.email) return sessionUser.email
    return "Usuario"
  }

  const getRoleBadge = () => {
    switch (sessionUser?.role) {
      case "COACH":
        return "Coach"
      case "ADMIN":
        return "Administrador"
      default:
        return "Miembro"
    }
  }

  const renderUnauthenticated = () => (
    <Link href="/auth">
      <Button
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <LogIn className="h-4 w-4" />
        Iniciar sesión
      </Button>
    </Link>
  )

  if (isLoading) {
    return null
  }

  if (!sessionUser) {
    return renderUnauthenticated()
  }

  return (
    <div className="relative">
      {/* Avatar Button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg p-0"
        onClick={() => setIsOpen(!isOpen)}
      >
        {getInitials()}
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-12 z-50 w-80">
            <Card className="border-2 border-border/60 bg-card/95 backdrop-blur shadow-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                    {getInitials()}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {getDisplayName()}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-500 text-white text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        {getRoleBadge()}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* User Info */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-xs text-muted-foreground">
                        {sessionUser.email ?? "Sin correo registrado"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2 pt-4 border-t border-border/50">
                  <Link href="/profile" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-2"
                    >
                      <User className="h-4 w-4" />
                      Mi Perfil
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-4 w-4" />
                    Configuración
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </Button>
                </div>

                {/* Quick Links */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs text-muted-foreground mb-2">Acceso Rápido</p>
                  <div className="flex gap-2">
                    <Link href="/gym-coach" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Gym Coach
                      </Button>
                    </Link>
                    <Link href="/gimnasios" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        Gimnasios
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
