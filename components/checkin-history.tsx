"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, LogOut, Search } from "lucide-react"
import { useState } from "react"

interface CheckInRecord {
  id: number
  memberName: string
  membershipType: string
  checkInTime: string
  checkOutTime?: string
  duration?: string
  status: "active" | "completed"
}

const mockHistory: CheckInRecord[] = [
  {
    id: 1,
    memberName: "Carlos Rodríguez",
    membershipType: "Premium",
    checkInTime: "2025-10-16 07:30",
    checkOutTime: "2025-10-16 09:00",
    duration: "1h 30m",
    status: "completed",
  },
  {
    id: 2,
    memberName: "María González",
    membershipType: "Elite",
    checkInTime: "2025-10-16 08:15",
    status: "active",
  },
  {
    id: 3,
    memberName: "Juan Martínez",
    membershipType: "Básico",
    checkInTime: "2025-10-16 06:45",
    checkOutTime: "2025-10-16 07:45",
    duration: "1h 00m",
    status: "completed",
  },
  {
    id: 4,
    memberName: "Ana López",
    membershipType: "Premium",
    checkInTime: "2025-10-16 09:00",
    status: "active",
  },
  {
    id: 5,
    memberName: "Pedro Sánchez",
    membershipType: "Básico",
    checkInTime: "2025-10-16 07:00",
    checkOutTime: "2025-10-16 08:30",
    duration: "1h 30m",
    status: "completed",
  },
]

export function CheckInHistory() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredHistory = mockHistory.filter((record) =>
    record.memberName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Historial de Check-ins</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64 bg-background/50"
              />
            </div>
            <Button variant="outline" size="icon" className="bg-transparent">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {filteredHistory.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{record.memberName.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{record.memberName}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {record.membershipType}
                    </Badge>
                    <Badge
                      className={
                        record.status === "active"
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-muted text-muted-foreground border-border/50"
                      }
                    >
                      {record.status === "active" ? "Dentro" : "Completado"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Entrada: {record.checkInTime}
                    </span>
                    {record.checkOutTime && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <LogOut className="h-3 w-3" />
                          Salida: {record.checkOutTime}
                        </span>
                        <span>•</span>
                        <span>Duración: {record.duration}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {record.status === "active" && (
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <LogOut className="h-4 w-4" />
                  Registrar Salida
                </Button>
              )}
            </div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No se encontraron registros</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
