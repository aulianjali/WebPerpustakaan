import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Definisi routes untuk setiap role
const ROLE_ROUTES = {
  admin: [
    "/admin",
    "/admin/buku",
    "/admin/detail-buku",
    "/admin/users",
    "/admin/peminjaman",
    // Admin bisa akses semua halaman pustakawan dan anggota
    "/pustakawan",
    "/pustakawan/buku",
    "/anggota",
    "/anggota/buku",
    "/anggota/konfirmasi",
    "/anggota/riwayat",
  ],
  pustakawan: ["/pustakawan", "/pustakawan/buku"],
  anggota: ["/anggota", "/anggota/buku", "/anggota/konfirmasi", "/anggota/riwayat"],
}

// Routes yang tidak perlu autentikasi
const PUBLIC_ROUTES = ["/", "/login"]

// Fungsi untuk cek apakah route cocok dengan pattern (untuk dynamic routes)
function matchRoute(pathname: string, allowedRoutes: string[]): boolean {
  return allowedRoutes.some((route) => {
    // Cek exact match
    if (pathname === route) return true

    // Cek dynamic routes (contoh: /anggota/buku/123 cocok dengan /anggota/buku)
    if (route.includes("[") || pathname.startsWith(route + "/")) {
      const baseRoute = route.split("[")[0]
      return pathname.startsWith(baseRoute)
    }

    return false
  })
}

// Fungsi untuk mendapatkan user dari cookie/session (simulasi)
function getUserFromRequest(request: NextRequest) {
  // Simulasi - nanti bisa diganti dengan logic session/JWT yang sebenarnya
  const userCookie = request.cookies.get("user-session")

  if (!userCookie) return null

  try {
    return JSON.parse(userCookie.value)
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware untuk file statis dan API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next()
  }

  // Allow public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  // Get user dari session/cookie
  const user = getUserFromRequest(request)

  // Jika tidak ada user (belum login), redirect ke login
  if (!user) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Cek apakah user punya akses ke route yang diminta
  const userRole = user.role as keyof typeof ROLE_ROUTES
  const allowedRoutes = ROLE_ROUTES[userRole]

  if (!allowedRoutes || !matchRoute(pathname, allowedRoutes)) {
    // Jika tidak punya akses, tampilkan 404
    const notFoundUrl = new URL("/404", request.url)
    return NextResponse.rewrite(notFoundUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
