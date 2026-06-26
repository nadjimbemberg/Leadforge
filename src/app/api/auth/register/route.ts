import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/auth'
import { registerSchema } from '@/lib/auth-validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      const msg = result.error.issues[0]?.message ?? 'Données invalides'
      return NextResponse.json({ error: msg }, { status: 400 })
    }

    const { name, email, password } = result.data

    const existing = await db.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json(
        { error: 'EMAIL_ALREADY_EXISTS', message: 'Cet email est déjà utilisé' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: { name, email, passwordHash },
    })

    await db.pipelineStage.createMany({
      data: [
        { name: 'Nouveau', position: 0, color: '#475569', isDefault: true, userId: user.id },
        { name: 'Contacté', position: 1, color: '#2563EB', isDefault: true, userId: user.id },
        { name: 'Relancé', position: 2, color: '#7C3AED', isDefault: true, userId: user.id },
        { name: 'Répondu', position: 3, color: '#0891B2', isDefault: true, userId: user.id },
        { name: 'Qualifié', position: 4, color: '#059669', isDefault: true, userId: user.id },
        { name: 'Converti', position: 5, color: '#D97706', isDefault: true, userId: user.id },
        { name: 'Perdu', position: 6, color: '#DC2626', isDefault: true, userId: user.id },
      ],
    })

    const payload = { userId: user.id, email: user.email, plan: user.plan }
    const accessToken = await signAccessToken(payload)
    const refreshToken = await signRefreshToken(payload)

    await db.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    })

    await setAuthCookies(accessToken, refreshToken)

    // Envoyer email de bienvenue en arrière-plan (sans bloquer)
    sendEmailInBackground(email, name ?? '', user.id)

    return NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email, plan: user.plan } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

async function sendEmailInBackground(email: string, name: string, _userId: string) {
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY!)
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'LeadForge <noreply@leadforge.io>',
      to: email,
      subject: 'Bienvenue sur LeadForge !',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;">
          <div style="background:#1D4ED8;padding:24px 32px;border-radius:12px 12px 0 0;">
            <span style="font-size:20px;font-weight:700;color:#fff;">Lead<span style="color:#93C5FD;">Forge</span></span>
          </div>
          <div style="background:#fff;border:1px solid #BFDBFE;border-top:none;padding:32px;border-radius:0 0 12px 12px;">
            <h1 style="font-size:22px;color:#0F172A;margin:0 0 12px;">Bienvenue ${name} !</h1>
            <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 24px;">
              Votre compte LeadForge est actif. Vous pouvez maintenant commencer à prospecter intelligemment.
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/onboarding" 
               style="display:inline-block;background:#1D4ED8;color:#fff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
              Choisir mon plan →
            </a>
            <p style="font-size:13px;color:#94A3B8;margin:24px 0 0;">
              LeadForge · Learni Group
            </p>
          </div>
        </div>
      `,
    })
  } catch (err) {
    console.error('Welcome email error:', err)
  }
}
