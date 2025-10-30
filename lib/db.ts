import { PrismaClient } from '@prisma/client'

// Database utility functions for Tessalp Gyms
// Connected to Neon PostgreSQL database

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with error handling
let prisma: PrismaClient

try {
  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
} catch (error) {
  console.error('Failed to initialize Prisma client:', error)
  // Create a mock prisma client for fallback
  prisma = {} as PrismaClient
}

export { prisma }

// Re-export types from Prisma
export type { Member, Instructor, Class, CheckIn, Gym } from '@prisma/client'

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

// Database functions
export async function getMembers() {
  try {
    // Check if prisma is properly initialized
    if (!prisma || !prisma.member) {
      console.warn('Prisma not initialized, using mock data')
      return mockMembers
    }
    
    return await prisma.member.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching members:', error)
    return mockMembers
  }
}

export async function getMemberById(id: number) {
  try {
    if (!prisma || !prisma.member) {
      console.warn('Prisma not initialized, using mock data')
      return mockMembers.find(m => m.id === id) || null
    }
    
    return await prisma.member.findUnique({
      where: { id }
    })
  } catch (error) {
    console.error('Error fetching member:', error)
    return null
  }
}

export async function createMember(data: {
  name: string
  email: string
  phone?: string
  membershipType: string
  membershipStart: Date
  membershipEnd: Date
  status?: string
}) {
  try {
    return await prisma.member.create({
      data
    })
  } catch (error) {
    console.error('Error creating member:', error)
    throw error
  }
}

export async function updateMember(id: number, data: Partial<{
  name: string
  email: string
  phone: string
  membershipType: string
  membershipStart: Date
  membershipEnd: Date
  status: string
}>) {
  try {
    return await prisma.member.update({
      where: { id },
      data
    })
  } catch (error) {
    console.error('Error updating member:', error)
    throw error
  }
}

export async function deleteMember(id: number) {
  try {
    return await prisma.member.delete({
      where: { id }
    })
  } catch (error) {
    console.error('Error deleting member:', error)
    throw error
  }
}

export async function getInstructors() {
  try {
    return await prisma.instructor.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return []
  }
}

export async function getClasses() {
  try {
    return await prisma.class.findMany({
      include: {
        instructor: true
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching classes:', error)
    return []
  }
}

export async function getCheckIns() {
  try {
    return await prisma.checkIn.findMany({
      include: {
        member: true,
        class: true
      },
      orderBy: { checkinTime: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching check-ins:', error)
    return []
  }
}

export async function getGyms() {
  try {
    return await prisma.gym.findMany({
      orderBy: { createdAt: 'desc' }
    })
  } catch (error) {
    console.error('Error fetching gyms:', error)
    return []
  }
}

export async function getStats() {
  try {
    const [activeMembers, todayCheckins, monthlyRevenue, newMemberships] = await Promise.all([
      prisma.member.count({
        where: { status: 'active' }
      }),
      prisma.checkIn.count({
        where: {
          checkinTime: {
            gte: new Date(new Date().setHours(0, 0, 0, 0))
          }
        }
      }),
      prisma.member.aggregate({
        _sum: {
          // Assuming we have a price field, adjust as needed
        }
      }),
      prisma.member.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
          }
        }
      })
    ])

    return {
      activeMembers,
      todayCheckins,
      monthlyRevenue: monthlyRevenue._sum || 0,
      newMemberships
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return mockStats
  }
}
