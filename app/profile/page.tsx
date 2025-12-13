"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, MapPin, CreditCard, CheckCircle, Clock, Settings, User as UserIcon, Mail, Save } from "lucide-react"
import Link from "next/link"

interface Membership {
  id: string
  items: Array<{
    id: string
    name: string
    price: number
    type: "membership"
    plan: string
    gymId: string
    gymName: string
  }>
  total: number
  date: string
  status: 'active' | 'expired' | 'cancelled'
}

interface MemberAccessRequest {
  id: number
  status: string
  requestedAt: string
  respondedAt: string | null
  notes: string | null
  coach: {
    userAccount: {
      name: string | null
      email: string | null
    } | null
  }
}

export default function ProfilePage() {
  const [memberships, setMemberships] = useState<Membership[]>([])
  const [memberIdInput, setMemberIdInput] = useState("")
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null)
  const [accessRequests, setAccessRequests] = useState<MemberAccessRequest[]>([])
  const [accessFeedback, setAccessFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [isLoadingAccess, setIsLoadingAccess] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [user, setUser] = useState<{ id: number; name: string; email: string; role: string } | null>(null)
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile')
  const [settingsData, setSettingsData] = useState({
    name: '',
    email: '',
  })
  const [isSavingSettings, setIsSavingSettings] = useState(false)

  useEffect(() => {
    // Verificar si hay un usuario autenticado
    const checkUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        const data = await response.json()
        
        if (response.ok && data.user) {
          setUser(data.user)
          setSettingsData({
            name: data.user.name || '',
            email: data.user.email || '',
          })
          // Solo cargar membresías si hay un usuario autenticado
          const savedMemberships = localStorage.getItem('user-memberships')
          if (savedMemberships) {
            try {
              const parsed = JSON.parse(savedMemberships)
              // Verificar que sea un array válido
              if (Array.isArray(parsed) && parsed.length > 0) {
                setMemberships(parsed)
              }
            } catch (e) {
              // Si hay error al parsear, limpiar el localStorage
              localStorage.removeItem('user-memberships')
            }
          }
        } else {
          // Si no hay usuario autenticado, limpiar membresías
          localStorage.removeItem('user-memberships')
          setMemberships([])
        }
      } catch (error) {
        console.error('Error checking user', error)
        // En caso de error, limpiar membresías para evitar mostrar datos incorrectos
        localStorage.removeItem('user-memberships')
        setMemberships([])
      } finally {
        setIsLoadingUser(false)
      }
    }

    checkUser()
    
    // Verificar si hay un hash en la URL para cambiar de tab
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash === '#settings') {
        setActiveTab('settings')
      }
    }
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (value: string | null) => {
    if (!value) return '-'
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return date.toLocaleString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa'
      case 'expired':
        return 'Expirada'
      case 'cancelled':
        return 'Cancelada'
      default:
        return 'Desconocido'
    }
  }

  const translateAccessStatus = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'Aprobada'
      case 'REJECTED':
        return 'Rechazada'
      default:
        return 'Pendiente'
    }
  }

  const getAccessStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-500/10 text-green-600 border-green-500/40'
      case 'REJECTED':
        return 'bg-destructive/10 text-destructive border-destructive/40'
      default:
        return 'bg-amber-500/10 text-amber-600 border-amber-500/40'
    }
  }

  const handleLoadAccessRequests = async () => {
    setAccessFeedback(null)
    const parsedMemberId = Number(memberIdInput)

    if (!memberIdInput.trim() || Number.isNaN(parsedMemberId) || parsedMemberId <= 0) {
      setAccessFeedback({ type: 'error', message: 'Ingresa un ID de usuario válido' })
      return
    }

    try {
      setIsLoadingAccess(true)
      const response = await fetch(`/api/member/access?memberId=${parsedMemberId}`)
      const data = await response.json()

      if (!response.ok) {
        setAccessRequests([])
        setAccessFeedback({ type: 'error', message: data.error ?? 'No se pudieron obtener las solicitudes' })
        return
      }

      setAccessRequests(data.requests ?? [])
      setActiveMemberId(parsedMemberId)
    } catch (error) {
      console.error('Error loading member access requests', error)
      setAccessFeedback({ type: 'error', message: 'No se pudieron cargar las solicitudes' })
    } finally {
      setIsLoadingAccess(false)
    }
  }

  const handleRespondAccessRequest = async (requestId: number, action: 'APPROVE' | 'REJECT') => {
    setAccessFeedback(null)

    try {
      setIsLoadingAccess(true)
      const response = await fetch('/api/member/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ requestId, action })
      })

      const data = await response.json()

      if (!response.ok) {
        setAccessFeedback({ type: 'error', message: data.error ?? 'No se pudo actualizar la solicitud' })
        return
      }

      setAccessFeedback({ type: 'success', message: data.message ?? 'Solicitud actualizada' })
      setAccessRequests(prev =>
        prev.map(request =>
          request.id === requestId
            ? { ...request, status: data.status, respondedAt: new Date().toISOString() }
            : request
        )
      )
    } catch (error) {
      console.error('Error responding to member access request', error)
      setAccessFeedback({ type: 'error', message: 'No se pudo actualizar la solicitud' })
    } finally {
      setIsLoadingAccess(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/30 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Link href="/gimnasios">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a Gimnasios
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Mi Perfil</h1>
              <p className="text-muted-foreground">Gestiona tus membresías y actividades</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Tabs */}
        <div className="flex gap-2 border-b border-border/50">
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('profile')}
            className="gap-2"
          >
            <UserIcon className="h-4 w-4" />
            Perfil
          </Button>
          <Button
            variant={activeTab === 'settings' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('settings')}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Button>
        </div>

        {activeTab === 'profile' ? (
          <>
            {memberships.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No tienes membresías</h2>
              <p className="text-muted-foreground mb-6">
                Explora nuestros gimnasios y elige el plan que mejor se adapte a ti
              </p>
              <Link href="/gimnasios">
                <Button size="lg">
                  Ver Gimnasios
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mis Membresías</h2>
              <Badge variant="outline" className="text-sm">
                {memberships.length} {memberships.length === 1 ? 'membresía' : 'membresías'}
              </Badge>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {memberships.map((membership) => (
                <Card key={membership.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Membresía #{membership.id.slice(-6)}</CardTitle>
                      <Badge className={getStatusColor(membership.status)}>
                        {getStatusText(membership.status)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(membership.date)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {membership.items.map((item, index) => (
                        <div key={index} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-sm">{item.name}</h4>
                            <span className="text-sm font-bold text-primary">
                              {formatPrice(item.price)}/mes
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {item.gymName}
                          </div>
                          <Badge variant="outline" className="mt-2 text-xs">
                            {item.plan}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total pagado:</span>
                        <span className="font-bold">{formatPrice(membership.total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Estado:</span>
                        <div className="flex items-center gap-1">
                          {membership.status === 'active' ? (
                            <CheckCircle className="h-3 w-3 text-green-600" />
                          ) : (
                            <Clock className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span className="text-xs">{getStatusText(membership.status)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Ver Detalles
                      </Button>
                      {membership.status === 'active' && (
                        <Button variant="outline" size="sm" className="flex-1">
                          Renovar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
          </>
        ) : (
          <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Gestiona tu información personal y preferencias
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {user ? (
                <form onSubmit={async (e) => {
                  e.preventDefault()
                  setIsSavingSettings(true)
                  // Aquí iría la lógica para guardar los cambios
                  // Por ahora solo mostramos un mensaje
                  setTimeout(() => {
                    setIsSavingSettings(false)
                    alert('Configuración guardada (funcionalidad pendiente)')
                  }, 1000)
                }} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={settingsData.name}
                      onChange={(e) => setSettingsData({ ...settingsData, name: e.target.value })}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settingsData.email}
                      onChange={(e) => setSettingsData({ ...settingsData, email: e.target.value })}
                      placeholder="tu@email.com"
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">
                      El email no se puede cambiar por seguridad
                    </p>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="submit" disabled={isSavingSettings} className="gap-2">
                      <Save className="h-4 w-4" />
                      {isSavingSettings ? 'Guardando...' : 'Guardar Cambios'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Inicia sesión para acceder a la configuración</p>
                  <Link href="/auth" className="mt-4 inline-block">
                    <Button>Iniciar Sesión</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
