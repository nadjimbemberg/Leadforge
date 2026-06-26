'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

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

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefillEmail = searchParams.get('email') ?? ''
  const expired = searchParams.get('expired')
  const errorParam = searchParams.get('error')

  const [form, setForm] = useState({ email: prefillEmail, password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erreur de connexion'); return }
      const redirect = searchParams.get('redirect') ?? '/dashboard'
      router.push(redirect)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {expired && (
        <div style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FDE68A', marginBottom: 20 }}>
          Votre session a expiré. Reconnectez-vous pour continuer.
        </div>
      )}
      {errorParam === 'lien_invalide' && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5', marginBottom: 20 }}>
          Le lien est invalide ou a expiré. Demandez-en un nouveau.
        </div>
      )}

      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>Bon retour</h1>
      <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>Connectez-vous à votre espace LeadForge</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
          <input type="email" placeholder="vous@exemple.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
        </div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <label style={{ fontSize: 13, color: '#94A3B8', fontWeight: 500 }}>Mot de passe</label>
            <Link href="/forgot-password" style={{ fontSize: 12, color: '#60A5FA', textDecoration: 'none' }}>Oublié ?</Link>
          </div>
          <input type="password" placeholder="••••••••" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ width: '100%', background: '#2563EB', border: 'none', borderRadius: 10, padding: '12px 0', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1, marginTop: 4 }}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </>
  )
}

export default function LoginPage() {
  return (
    <main style={{ backgroundColor: '#060D1A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, textDecoration: 'none', marginBottom: 32 }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#F0F4FF' }}>Lead<span style={{ color: '#60A5FA' }}>Forge</span></span>
        </Link>
        <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.12)', borderRadius: 16, padding: 36, boxShadow: '0 0 60px rgba(37,99,235,0.08)' }}>
          <Suspense fallback={<p style={{ color: '#64748B' }}>Chargement...</p>}>
            <LoginForm />
          </Suspense>
        </div>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#475569', marginTop: 24 }}>
          Pas encore de compte ?{' '}
          <Link href="/register" style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: 600 }}>Créer un compte gratuit</Link>
        </p>
      </div>
    </main>
  )
}
