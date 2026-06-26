import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { clearAuthCookies } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(_request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refresh_token')?.value
    if (refreshToken) {
      await db.refreshToken.deleteMany({ where: { token: refreshToken } })
    }
    await clearAuthCookies()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
