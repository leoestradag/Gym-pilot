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
  Phone,
  Calendar,
  Crown,
  ChevronDown
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  joinDate: string
  membershipType: string
}

export function UserAvatar() {
  const [isOpen, setIsOpen] = useState(false)
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          // Parsear nombre completo en firstName y lastName
          const nameParts = data.user.name.split(" ")
          const firstName = nameParts[0] || ""
          const lastName = nameParts.slice(1).join(" ") || ""
          
          setUserData({
            firstName,
            lastName,
            email: data.user.email,
            phone: undefined, // No está en el modelo UserAccount
            joinDate: new Date().toLocaleDateString('es-MX', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            membershipType: "Premium" // Por defecto, se puede obtener de membresías
          })
        } else {
          // Si no hay usuario, usar datos mock para mostrar el componente
          setUserData({
            firstName: "Usuario",
            lastName: "Invitado",
            email: "invitado@email.com",
            phone: undefined,
            joinDate: new Date().toLocaleDateString('es-MX', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            membershipType: "Básico"
          })
        }
      }
    } catch (error) {
      console.error("Error loading user data", error)
      // En caso de error, no mostrar el componente
      setUserData(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsOpen(false)
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })
      
      if (response.ok) {
        // Limpiar cualquier dato local
        setUserData(null)
        // Redirigir al inicio
        router.push("/")
        router.refresh()
      } else {
        console.error("Error al cerrar sesión")
        // Aún así redirigir al inicio
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("Error al cerrar sesión", error)
      // Aún así redirigir al inicio
      router.push("/")
      router.refresh()
    }
  }

  const handleSettings = () => {
    setIsOpen(false)
    router.push("/profile#settings")
  }

  const getInitials = () => {
    if (!userData) return "U"
    return `${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`.toUpperCase()
  }

  if (!userData) return null

  return (
    <div className="relative">
      {/* Avatar Button */}
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-lg p-0"
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
                  <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
                    {getInitials()}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {userData.firstName} {userData.lastName}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-green-500 text-white text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        {userData.membershipType}
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
                      <p className="text-xs text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>
                  
                  {userData.phone && (
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Teléfono</p>
                        <p className="text-xs text-muted-foreground">{userData.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Miembro desde</p>
                      <p className="text-xs text-muted-foreground">{userData.joinDate}</p>
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
                    onClick={handleSettings}
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
