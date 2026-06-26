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

function ResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
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
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2500)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#FCA5A5', fontSize: 15 }}>Lien invalide ou expiré.</p>
        <Link href="/forgot-password" style={{ color: '#60A5FA', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Demander un nouveau lien</Link>
      </div>
    )
  }

  if (success) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F0F4FF', marginBottom: 10 }}>Mot de passe modifié !</h2>
        <p style={{ fontSize: 14, color: '#64748B' }}>Redirection vers la connexion...</p>
      </div>
    )
  }

  return (
    <>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>Nouveau mot de passe</h1>
      <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>Choisissez un mot de passe fort pour sécuriser votre compte.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Nouveau mot de passe</label>
          <input type="password" placeholder="10 caractères minimum" value={password} onChange={e => setPassword(e.target.value)} required minLength={10} style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
          <p style={{ fontSize: 11.5, color: '#334155', marginTop: 5 }}>Min. 10 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial</p>
        </div>
        <div>
          <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Confirmer le mot de passe</label>
          <input type="password" placeholder="Répétez le mot de passe" value={confirm} onChange={e => setConfirm(e.target.value)} required style={inputStyle}
            onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
            onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
        </div>

        {error && (
          <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading} style={{ width: '100%', background: '#2563EB', border: 'none', borderRadius: 10, padding: '12px 0', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1 }}>
          {loading ? 'Modification...' : 'Modifier mon mot de passe'}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <main style={{ backgroundColor: '#060D1A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, textDecoration: 'none', marginBottom: 32 }}>
          <Logo />
          <span style={{ fontWeight: 700, fontSize: 20, color: '#F0F4FF' }}>Lead<span style={{ color: '#60A5FA' }}>Forge</span></span>
        </Link>
        <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.12)', borderRadius: 16, padding: 36, boxShadow: '0 0 60px rgba(37,99,235,0.08)' }}>
          <Suspense fallback={<p style={{ color: '#64748B' }}>Chargement...</p>}>
            <ResetForm />
          </Suspense>
        </div>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#475569', marginTop: 24 }}>
          <Link href="/login" style={{ color: '#60A5FA', textDecoration: 'none', fontWeight: 600 }}>← Retour à la connexion</Link>
        </p>
      </div>
    </main>
  )
}
