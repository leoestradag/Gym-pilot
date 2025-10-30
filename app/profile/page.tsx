"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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

export default function ProfilePage() {
  const [memberships, setMemberships] = useState<Membership[]>([])

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

      <div className="max-w-7xl mx-auto px-4 py-8">
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
