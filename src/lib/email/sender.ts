import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'LeadForge <noreply@leadforge.io>'

export async function sendWelcomeEmail(to: string, name: string, confirmUrl: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Bienvenue sur LeadForge — Confirmez votre compte',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <body style="margin:0;padding:0;background:#EFF6FF;font-family:system-ui,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr><td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #BFDBFE;">
              <tr><td style="background:#1D4ED8;padding:28px 40px;border-radius:16px 16px 0 0;">
                <span style="font-size:20px;font-weight:700;color:#fff;">Lead<span style="color:#93C5FD;">Forge</span></span>
              </td></tr>
              <tr><td style="padding:40px;">
                <h1 style="font-size:22px;font-weight:700;color:#0F172A;margin:0 0 12px;">Bienvenue ${name} !</h1>
                <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 28px;">
                  Votre compte LeadForge a bien été créé. Confirmez votre adresse email pour activer votre compte.
                </p>
                <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
                  <tr><td style="background:#1D4ED8;border-radius:10px;">
                    <a href="${confirmUrl}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;">
                      Confirmer mon compte →
                    </a>
                  </td></tr>
                </table>
                <p style="font-size:13px;color:#94A3B8;margin:0;">
                  Ce lien expire dans <strong>24 heures</strong>. Si vous n'avez pas créé de compte, ignorez cet email.
                </p>
              </td></tr>
              <tr><td style="padding:20px 40px;background:#F8FBFF;border-radius:0 0 16px 16px;">
                <p style="font-size:12px;color:#94A3B8;margin:0;text-align:center;">LeadForge · Learni Group</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}

export async function sendPasswordResetEmail(to: string, name: string, resetUrl: string) {
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'LeadForge — Réinitialisation de votre mot de passe',
    html: `
      <!DOCTYPE html>
      <html lang="fr">
      <body style="margin:0;padding:0;background:#EFF6FF;font-family:system-ui,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
          <tr><td align="center">
            <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #BFDBFE;">
              <tr><td style="background:#1D4ED8;padding:28px 40px;border-radius:16px 16px 0 0;">
                <span style="font-size:20px;font-weight:700;color:#fff;">Lead<span style="color:#93C5FD;">Forge</span></span>
              </td></tr>
              <tr><td style="padding:40px;">
                <h1 style="font-size:22px;font-weight:700;color:#0F172A;margin:0 0 12px;">Réinitialisation du mot de passe</h1>
                <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 28px;">
                  Bonjour ${name},<br><br>
                  Cliquez ci-dessous pour réinitialiser votre mot de passe. Ce lien expire dans <strong>1 heure</strong>.
                </p>
                <table cellpadding="0" cellspacing="0">
                  <tr><td style="background:#1D4ED8;border-radius:10px;">
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;font-size:15px;font-weight:700;color:#fff;text-decoration:none;">
                      Réinitialiser mon mot de passe →
                    </a>
                  </td></tr>
                </table>
                <p style="font-size:13px;color:#94A3B8;margin:28px 0 0;">
                  Si vous n'avez pas fait cette demande, ignorez cet email.
                </p>
              </td></tr>
              <tr><td style="padding:20px 40px;background:#F8FBFF;border-radius:0 0 16px 16px;">
                <p style="font-size:12px;color:#94A3B8;margin:0;text-align:center;">LeadForge · Learni Group</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
    `,
  })
}
