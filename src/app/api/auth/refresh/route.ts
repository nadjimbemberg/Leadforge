import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyRefreshToken, signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (!refreshToken) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    const payload = await verifyRefreshToken(refreshToken)
    if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
    const stored = await db.refreshToken.findUnique({ where: { token: refreshToken } })
    if (!stored || stored.expiresAt < new Date()) return NextResponse.json({ error: 'Session expirée' }, { status: 401 })
    await db.refreshToken.delete({ where: { token: refreshToken } })
    const user = await db.user.findUnique({ where: { id: payload.userId } })
    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 401 })
    const newPayload = { userId: user.id, email: user.email, plan: user.plan }
    const newAccessToken = await signAccessToken(newPayload)
    const newRefreshToken = await signRefreshToken(newPayload)
    await db.refreshToken.create({
      data: { token: newRefreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    })
    await setAuthCookies(newAccessToken, newRefreshToken)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Refresh error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
