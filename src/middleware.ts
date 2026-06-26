import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const accessSecret = new TextEncoder().encode(process.env.JWT_SECRET!)

const PROTECTED_ROUTES = ['/dashboard', '/scraper', '/pipeline', '/campaigns', '/leads', '/settings', '/onboarding']
const AUTH_ROUTES = ['/login', '/register', '/forgot-password', '/reset-password']

// Quotas par plan
const PLAN_LIMITS: Record<string, { emailsPerDay: number; leadsPerMonth: number }> = {
  STARTER: { emailsPerDay: 10, leadsPerMonth: 100 },
  PRO: { emailsPerDay: 50, leadsPerMonth: 1000 },
  UNLIMITED: { emailsPerDay: 99999, leadsPerMonth: 99999 },
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('access_token')?.value

  let isAuthenticated = false
  let userPlan = 'STARTER'

  if (token) {
    try {
      const { payload } = await jwtVerify(token, accessSecret)
      isAuthenticated = true
      userPlan = (payload.plan as string) ?? 'STARTER'
    } catch {
      isAuthenticated = false
    }
  }

  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r))

  // Rediriger vers login si non authentifié
  if (isProtected && !isAuthenticated) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Rediriger vers dashboard si déjà connecté
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Ajouter les headers de plan pour les API routes
  const response = NextResponse.next()
  if (isAuthenticated) {
    const limits = PLAN_LIMITS[userPlan] ?? PLAN_LIMITS.STARTER
    response.headers.set('x-user-plan', userPlan)
    response.headers.set('x-emails-per-day', String(limits.emailsPerDay))
    response.headers.set('x-leads-per-month', String(limits.leadsPerMonth))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}
