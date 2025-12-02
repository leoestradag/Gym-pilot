import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const GYM_SESSION_COOKIE = "gym_session"

function getJwtSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.trim().length === 0) {
    return new TextEncoder().encode("tessalp-default-auth-secret-please-set-env")
  }
  return new TextEncoder().encode(secret)
}

async function hasGymAccess(request: NextRequest): Promise<boolean> {
  try {
    const sessionCookie = request.cookies.get(GYM_SESSION_COOKIE)
    
    if (sessionCookie) {
      const secret = getJwtSecret()
      try {
        const { payload } = await jwtVerify(sessionCookie.value, secret)
        if (payload.type === "gym" && payload.gymId) {
          return true
        }
      } catch {
        // Invalid token, continue checking
      }
    }

    // Check for gym_access_* cookies
    const allCookies = request.cookies.getAll()
    for (const cookie of allCookies) {
      if (cookie.name.startsWith("gym_access_")) {
        const secret = getJwtSecret()
        try {
          const { payload } = await jwtVerify(cookie.value, secret)
          if (payload.type === "gym_access" && payload.verified) {
            return true
          }
        } catch {
          // Invalid token, continue checking
        }
      }
    }

    return false
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow access to gym selection and login pages
  if (pathname.startsWith("/admin/gym/select") || pathname.startsWith("/admin/gym/login")) {
    const response = NextResponse.next()
    // Add pathname to headers for layout to check
    response.headers.set("x-pathname", pathname)
    return response
  }

  // Protect all other admin routes
  if (pathname.startsWith("/admin")) {
    const hasAccess = await hasGymAccess(request)
    
    if (!hasAccess) {
      return NextResponse.redirect(new URL("/admin/gym/select", request.url))
    }
    
    const response = NextResponse.next()
    response.headers.set("x-pathname", pathname)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}

