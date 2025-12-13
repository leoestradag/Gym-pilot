"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building2, ArrowLeft, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const REQUIRED_ID = "tessalp143"

export default function VerifyGymAccessPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const gymId = params.gymId as string
  const [accessId, setAccessId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`/api/gym/${gymId}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al verificar")
      }

      toast({
        title: "Acceso verificado",
        description: `Bienvenido, ${data.gym.name}`,
      })

      // Redirect to main admin dashboard with sidebar after a short delay to ensure cookie is set
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/admin'
        } else {
          router.push('/admin')
        }
      }, 500)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo verificar el acceso",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Verificación de Acceso</CardTitle>
          <CardDescription>
            Ingresa el ID de acceso para continuar al panel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessId">ID de Acceso</Label>
              <Input
                id="accessId"
                type="text"
                placeholder="Ingresa el ID de acceso"
                value={accessId}
                onChange={(e) => setAccessId(e.target.value)}
                required
                disabled={isLoading}
                autoFocus
              />
              <p className="text-xs text-muted-foreground">
                Contacta al administrador si no tienes el ID de acceso
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verificando..." : "Acceder al Panel"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/admin/gym/select">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Seleccionar otro gimnasio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

