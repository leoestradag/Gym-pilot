"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

type Gym = {
  id: number
  name: string
  location: string
  image?: string | null
  slug?: string | null
}

export default function SelectGymPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [gyms, setGyms] = useState<Gym[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadGyms()
  }, [])

  const loadGyms = async () => {
    try {
      const response = await fetch("/api/gyms")
      if (response.ok) {
        const data = await response.json()
        setGyms(data)
      }
    } catch (error) {
      console.error("Error loading gyms", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los gimnasios",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectGym = (gymId: number) => {
    router.push(`/admin/gym/${gymId}/verify`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Selecciona tu Gimnasio</h1>
          <p className="text-muted-foreground">
            Elige el gimnasio para acceder a su panel administrativo
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando gimnasios...</p>
          </div>
        ) : gyms.length === 0 ? (
          <Card className="border-dashed border-border/70 bg-card/40 py-12 text-center">
            <CardContent>
              <p className="text-muted-foreground mb-4">No hay gimnasios disponibles</p>
              <Link href="/">
                <Button variant="outline">Volver al inicio</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {gyms.map((gym) => (
              <Card
                key={gym.id}
                className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => handleSelectGym(gym.id)}
              >
                {gym.image && (
                  <img src={gym.image} alt={gym.name} className="w-full h-32 object-cover rounded-t-lg" />
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{gym.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{gym.location}</span>
                  </div>
                  <Button className="w-full gap-2">
                    Seleccionar
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/">
            <Button variant="ghost">Volver al inicio</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

