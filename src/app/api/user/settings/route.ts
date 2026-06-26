import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

const settingsSchema = z.object({
  name: z.string().min(2, 'Nom trop court').optional(),
  email: z.string().email('Email invalide').optional(),
})

export async function GET(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const payload = await verifyAccessToken(token)
    if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 })

    const user = await db.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, name: true, email: true, plan: true, billingCycle: true, emailVerified: true, createdAt: true },
    })

    if (!user) return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('GET settings error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    if (!token) return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })

    const payload = await verifyAccessToken(token)
    if (!payload) return NextResponse.json({ error: 'Token invalide' }, { status: 401 })

    const body = await request.json()
    const result = settingsSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status: 400 })
    }

    const { name, email } = result.data

    // Vérifier si l'email est déjà pris par un autre utilisateur
    if (email) {
      const existing = await db.user.findFirst({
        where: { email, id: { not: payload.userId } },
      })
      if (existing) {
        return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 409 })
      }
    }

    const user = await db.user.update({
      where: { id: payload.userId },
      data: {
        ...(name && { name }),
        ...(email && { email, emailVerified: false }),
      },
      select: { id: true, name: true, email: true, plan: true },
    })

    return NextResponse.json({ user, message: 'Paramètres sauvegardés' })
  } catch (error) {
    console.error('PATCH settings error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
