"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, MapPin, CreditCard, CheckCircle, Clock } from "lucide-react"
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

  useEffect(() => {
    // Obtener membresías desde localStorage
    const savedMemberships = localStorage.getItem('user-memberships')
    if (savedMemberships) {
      setMemberships(JSON.parse(savedMemberships))
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
        <Card className="border-2 border-border/60 bg-card/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">Solicitudes de acceso de coaches</CardTitle>
            <p className="text-sm text-muted-foreground">
              Autoriza o rechaza las solicitudes de los entrenadores para que puedan revisar tus
              rutinas y dieta personal.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memberIdInput">Tu ID de usuario</Label>
              <div className="flex gap-2">
                <Input
                  id="memberIdInput"
                  value={memberIdInput}
                  onChange={(event) => setMemberIdInput(event.target.value)}
                  placeholder="Ej. 45"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLoadAccessRequests}
                  disabled={isLoadingAccess}
                >
                  {isLoadingAccess ? 'Cargando...' : 'Ver solicitudes'}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Ingresa tu ID para ver las solicitudes pendientes de aprobación.
              </p>
            </div>

            {accessFeedback && (
              <div
                className={`rounded-lg border px-3 py-2 text-sm ${
                  accessFeedback.type === 'success'
                    ? 'border-green-500/40 bg-green-500/10 text-green-600'
                    : 'border-destructive/40 bg-destructive/10 text-destructive'
                }`}
              >
                {accessFeedback.message}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Solicitudes recibidas</span>
                <Badge variant="outline" className="text-xs">
                  {accessRequests.length}
                </Badge>
              </div>
              {isLoadingAccess && accessRequests.length === 0 ? (
                <p className="text-xs text-muted-foreground">Cargando solicitudes...</p>
              ) : accessRequests.length === 0 ? (
                <p className="text-xs text-muted-foreground">
                  Aún no hay solicitudes de entrenadores.
                </p>
              ) : (
                <div className="space-y-3">
                  {accessRequests.map((request) => (
                    <div key={request.id} className="rounded-lg border border-border/50 bg-muted/30 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">
                            {request.coach?.userAccount?.name ?? 'Coach sin nombre'}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {request.coach?.userAccount?.email ?? 'Sin correo registrado'}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs ${getAccessStatusBadgeClass(request.status)}`}
                        >
                          {translateAccessStatus(request.status)}
                        </Badge>
                      </div>
                      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
                        <p>Solicitada: {formatDateTime(request.requestedAt)}</p>
                        {request.respondedAt && (
                          <p>Respondida: {formatDateTime(request.respondedAt)}</p>
                        )}
                        {request.notes && <p className="italic text-[11px]">Nota: {request.notes}</p>}
                      </div>
                      {request.status === 'PENDING' && (
                        <div className="mt-3 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isLoadingAccess}
                            onClick={() => handleRespondAccessRequest(request.id, 'APPROVE')}
                          >
                            Aprobar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={isLoadingAccess}
                            onClick={() => handleRespondAccessRequest(request.id, 'REJECT')}
                          >
                            Rechazar
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

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
      </div>
    </div>
  )
}
