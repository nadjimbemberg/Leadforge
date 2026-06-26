'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="#0F1A2E" />
      <rect x="7" y="22" width="18" height="3" rx="1.5" fill="#2563EB" />
      <rect x="10" y="19" width="12" height="3" rx="1" fill="#3B82F6" />
      <rect x="6" y="9" width="12" height="6" rx="2" fill="#60A5FA" />
      <rect x="16" y="11" width="10" height="2.5" rx="1.25" fill="#93C5FD" />
      <circle cx="10" cy="8" r="1.2" fill="#DBEAFE" opacity="0.9" />
      <circle cx="13" cy="6" r="0.8" fill="#DBEAFE" opacity="0.6" />
    </svg>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '10 caractères minimum', ok: password.length >= 10 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(password) },
    { label: 'Une minuscule', ok: /[a-z]/.test(password) },
    { label: 'Un chiffre', ok: /[0-9]/.test(password) },
    { label: 'Un caractère spécial (!@#$%...)', ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const color = score <= 1 ? '#EF4444' : score <= 3 ? '#F59E0B' : '#22C55E'
  const label = score <= 1 ? 'Très faible' : score <= 2 ? 'Faible' : score <= 3 ? 'Moyen' : score === 4 ? 'Fort' : 'Très fort'

  if (!password) return null

  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i <= score ? color : 'rgba(96,165,250,0.1)', transition: 'background 0.2s' }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 11.5, color: '#64748B' }}>Force du mot de passe</span>
        <span style={{ fontSize: 11.5, color, fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {checks.map(c => (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: c.ok ? '#22C55E' : 'rgba(96,165,250,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {c.ok && <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontSize: 11.5, color: c.ok ? '#22C55E' : '#64748B' }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [emailExists, setEmailExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const inputStyle = {
    width: '100%', background: '#0F1A2E',
    border: '1px solid rgba(96,165,250,0.15)',
    borderRadius: 10, padding: '11px 14px',
    color: '#F0F4FF', fontSize: 14, outline: 'none',
    boxSizing: 'border-box' as const,
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setEmailExists(false)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          setEmailExists(true)
        } else {
          setError(data.error ?? "Erreur lors de l'inscription")
        }
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/onboarding'), 2000)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <main style={{ backgroundColor: '#060D1A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.12)', borderRadius: 16, padding: 40, maxWidth: 420, width: '100%', textAlign: 'center' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F0F4FF', marginBottom: 8 }}>Compte créé !</h2>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 0 }}>
            Un email de confirmation a été envoyé à <strong style={{ color: '#60A5FA' }}>{form.email}</strong>.<br />
            Vérifiez votre boîte mail pour activer votre compte.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main style={{ backgroundColor: '#060D1A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 440 }}>

        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, textDecoration: 'none', marginBottom: 32 }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#F0F4FF' }}>
            Lead<span style={{ color: '#60A5FA' }}>Forge</span>
          </span>
        </Link>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.25)', borderRadius: 99, padding: '5px 16px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60A5FA' }} />
            <span style={{ fontSize: 13, color: '#93C5FD', fontWeight: 500 }}>14 jours gratuits · Sans carte bancaire</span>
          </div>
        </div>

        <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.12)', borderRadius: 16, padding: 36, boxShadow: '0 0 60px rgba(37,99,235,0.08)' }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>Créer un compte</h1>
          <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>Rejoignez les indépendants qui prospectent intelligemment</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Nom complet</label>
              <input type="text" placeholder="Jean Dupont" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
            </div>

            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email professionnel</label>
              <input type="email" placeholder="vous@entreprise.com" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setEmailExists(false) }} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
              {emailExists && (
                <div style={{ marginTop: 8, padding: '10px 14px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, fontSize: 13, color: '#FCA5A5' }}>
                  Cet email est déjà utilisé.{' '}
                  <Link href={`/login?email=${encodeURIComponent(form.email)}`} style={{ color: '#60A5FA', fontWeight: 600, textDecoration: 'none' }}>
                    Se connecter →
                  </Link>
                </div>
              )}
            </div>

            <div>
              <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Mot de passe</label>
              <input type="password" placeholder="Minimum 10 caractères" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
              <PasswordStrength password={form.password} />
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} style={{ width: '100%', background: '#2563EB', border: 'none', borderRadius: 10, padding: '12px 0', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1, marginTop: 4 }}>
              {loading ? 'Création...' : 'Créer mon compte gratuitement'}
            </button>

            <p style={{ fontSize: 12, color: '#334155', textAlign: 'center', margin: 0 }}>
              En créant un compte, vous acceptez nos <a href="#" style={{ color: '#475569' }}>CGU</a> et notre <a href="#" style={{ color: '#475569' }}>politique de confidentialité</a>
            </p>
          </form>
        </div>

        <p style={{ textAlign: 'center', fontSize: 14, color: '#475569', marginTop: 24 }}>
          Déjà un compte ?{' '}
          <Link href="/login" style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: 600 }}>Se connecter</Link>
        </p>
      </div>
    </main>
  )
}
