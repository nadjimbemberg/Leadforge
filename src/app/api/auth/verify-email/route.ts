import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(new URL('/login?error=token_manquant', request.url))
  }

  try {
    // Import dynamique pour éviter les erreurs TypeScript avant prisma generate
    const { db } = await import('@/lib/db')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = await (db.user as any).findFirst({
      where: { emailVerifyToken: token },
    })

    if (!user || !user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
      return NextResponse.redirect(new URL('/login?error=lien_invalide', request.url))
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db.user as any).update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      },
    })

    return NextResponse.redirect(new URL('/onboarding?verified=true', request.url))
  } catch (error) {
    console.error('Verify email error:', error)
    return NextResponse.redirect(new URL('/login?error=erreur_serveur', request.url))
  }
}
