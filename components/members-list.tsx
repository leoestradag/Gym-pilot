"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Mail, Phone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Member {
  id: number
  name: string
  email: string
  phone: string
  membershipType: string
  status: "active" | "expiring" | "expired"
  expiryDate: string
}

const mockMembers: Member[] = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    phone: "+52 123 456 7890",
    membershipType: "Premium",
    status: "active",
    expiryDate: "2025-12-15",
  },
  {
    id: 2,
    name: "María González",
    email: "maria@ejemplo.com",
    phone: "+52 123 456 7891",
    membershipType: "Elite",
    status: "active",
    expiryDate: "2025-11-20",
  },
  {
    id: 3,
    name: "Juan Martínez",
    email: "juan@ejemplo.com",
    phone: "+52 123 456 7892",
    membershipType: "Básico",
    status: "expiring",
    expiryDate: "2025-10-22",
  },
  {
    id: 4,
    name: "Ana López",
    email: "ana@ejemplo.com",
    phone: "+52 123 456 7893",
    membershipType: "Premium",
    status: "active",
    expiryDate: "2025-12-01",
  },
  {
    id: 5,
    name: "Pedro Sánchez",
    email: "pedro@ejemplo.com",
    phone: "+52 123 456 7894",
    membershipType: "Básico",
    status: "expired",
    expiryDate: "2025-10-10",
  },
]

interface MembersListProps {
  searchQuery: string
}

export function MembersList({ searchQuery }: MembersListProps) {
  const filteredMembers = mockMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusBadge = (status: Member["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Activo</Badge>
      case "expiring":
        return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20">Por vencer</Badge>
      case "expired":
        return (
          <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
            Vencido
          </Badge>
        )
    }
  }

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "Básico":
        return "text-blue-500"
      case "Premium":
        return "text-primary"
      case "Elite":
        return "text-amber-500"
      default:
        return "text-foreground"
    }
  }

  return (
    <div className="space-y-2">
      {filteredMembers.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">{member.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-foreground">{member.name}</h3>
                {getStatusBadge(member.status)}
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {member.phone}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className={`font-medium ${getMembershipColor(member.membershipType)}`}>{member.membershipType}</p>
              <p className="text-xs text-muted-foreground">Vence: {member.expiryDate}</p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-card text-foreground border border-border/50 shadow-lg rounded-xl"
              >
                <DropdownMenuItem className="hover:bg-accent/10">Ver detalles</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/10">Renovar membresía</DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent/10">Editar información</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive hover:bg-destructive/10">
                  Cancelar membresía
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}

      {filteredMembers.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No se encontraron miembros</p>
        </div>
      )}
    </div>
  )
}
