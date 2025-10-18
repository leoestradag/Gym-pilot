// Database utility functions for Tessalp Gyms
// This is a placeholder for database operations
// In production, this would connect to a real database (Neon, Supabase, etc.)

export interface Member {
  id: number
  name: string
  email: string
  phone: string
  membership_type: string
  membership_start: string
  membership_end: string
  status: string
}

export interface Instructor {
  id: number
  name: string
  email: string
  phone: string
  specialty: string
  bio: string
}

export interface Class {
  id: number
  name: string
  instructor_id: number
  instructor_name?: string
  day_of_week: string
  time: string
  duration: number
  capacity: number
  price: number
  description: string
}

export interface CheckIn {
  id: number
  member_id: number
  member_name?: string
  checkin_time: string
  checkout_time?: string
}

// Mock data for demo mode
export const mockStats = {
  activeMembers: 247,
  todayCheckins: 89,
  monthlyRevenue: 147500,
  newMemberships: 12,
}

export const mockWeeklyAttendance = [
  { day: "Lun", count: 85 },
  { day: "Mar", count: 92 },
  { day: "Mié", count: 78 },
  { day: "Jue", count: 88 },
  { day: "Vie", count: 95 },
  { day: "Sáb", count: 67 },
  { day: "Dom", count: 45 },
]

export const mockMembers = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    email: "carlos@ejemplo.com",
    phone: "+52 123 456 7890",
    membership_type: "Premium",
    membership_start: "2025-01-15",
    membership_end: "2025-12-15",
    status: "active",
  },
  {
    id: 2,
    name: "María González",
    email: "maria@ejemplo.com",
    phone: "+52 123 456 7891",
    membership_type: "Elite",
    membership_start: "2024-11-20",
    membership_end: "2025-11-20",
    status: "active",
  },
  {
    id: 3,
    name: "Juan Martínez",
    email: "juan@ejemplo.com",
    phone: "+52 123 456 7892",
    membership_type: "Básico",
    membership_start: "2025-01-22",
    membership_end: "2025-10-22",
    status: "expiring",
  },
]
