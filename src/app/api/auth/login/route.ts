import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/auth'
import { loginSchema } from '@/lib/auth-validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? 'Données invalides'
      return NextResponse.json({ error: msg }, { status: 400 })
    }
    const { email, password } = result.data
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) {
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 })
    }
    const payload = { userId: user.id, email: user.email, plan: user.plan }
    const accessToken = await signAccessToken(payload)
    const refreshToken = await signRefreshToken(payload)
    await db.refreshToken.create({
      data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    })
    await setAuthCookies(accessToken, refreshToken)
    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, plan: user.plan } })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
