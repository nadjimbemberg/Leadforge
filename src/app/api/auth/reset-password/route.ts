import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()
    if (!token || !password) return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    if (password.length < 10) return NextResponse.json({ error: 'Mot de passe trop court' }, { status: 400 })

    const user = await db.user.findFirst({
      where: { emailVerifyToken: token },
    })

    if (!user || !user.emailVerifyExpires || user.emailVerifyExpires < new Date()) {
      return NextResponse.json({ error: 'Lien invalide ou expiré' }, { status: 400 })
    }

    const passwordHash = await bcrypt.hash(password, 12)

    await db.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        emailVerifyToken: null,
        emailVerifyExpires: null,
      },
    })

    // Supprimer tous les refresh tokens pour forcer reconnexion
    await db.refreshToken.deleteMany({ where: { userId: user.id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Reset password error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
