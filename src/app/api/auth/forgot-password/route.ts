import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'Email requis' }, { status: 400 })

    const user = await db.user.findUnique({ where: { email } })

    // Toujours renvoyer success pour ne pas révéler si l'email existe
    if (!user) return NextResponse.json({ success: true })

    const resetToken = nanoid(32)
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000) // 1h

    await db.user.update({
      where: { id: user.id },
      data: {
        emailVerifyToken: resetToken,
        emailVerifyExpires: resetExpires,
      },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    try {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY!)
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? 'LeadForge <noreply@leadforge.io>',
        to: email,
        subject: 'LeadForge — Réinitialisation de votre mot de passe',
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto;padding:40px 20px;">
            <div style="background:#1D4ED8;padding:24px 32px;border-radius:12px 12px 0 0;">
              <span style="font-size:20px;font-weight:700;color:#fff;">Lead<span style="color:#93C5FD;">Forge</span></span>
            </div>
            <div style="background:#fff;border:1px solid #BFDBFE;border-top:none;padding:32px;border-radius:0 0 12px 12px;">
              <h1 style="font-size:20px;color:#0F172A;margin:0 0 12px;">Réinitialisation du mot de passe</h1>
              <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 24px;">
                Bonjour ${user.name ?? ''},<br><br>
                Cliquez ci-dessous pour réinitialiser votre mot de passe. Ce lien expire dans <strong>1 heure</strong>.
              </p>
              <a href="${resetUrl}" style="display:inline-block;background:#1D4ED8;color:#fff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:10px;text-decoration:none;">
                Réinitialiser mon mot de passe →
              </a>
              <p style="font-size:13px;color:#94A3B8;margin:24px 0 0;">
                Si vous n'avez pas demandé cela, ignorez cet email.
              </p>
            </div>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Reset email error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
