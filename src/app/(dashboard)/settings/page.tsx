'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

function Sidebar({ active }: { active: string }) {
  const router = useRouter()
  const NAV = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Scraper', href: '/scraper' },
    { label: 'Campagnes', href: '/campaigns' },
    { label: 'Pipeline', href: '/pipeline' },
    { label: 'Paramètres', href: '/settings' },
  ]
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }
  return (
    <aside style={{ width: 215, background: '#0B1628', borderRight: '1px solid rgba(96,165,250,0.08)', display: 'flex', flexDirection: 'column', padding: '20px 0', flexShrink: 0 }}>
      <div style={{ padding: '0 16px 20px', borderBottom: '1px solid rgba(96,165,250,0.08)' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0F1A2E" />
            <rect x="7" y="22" width="18" height="3" rx="1.5" fill="#2563EB" />
            <rect x="10" y="19" width="12" height="3" rx="1" fill="#3B82F6" />
            <rect x="6" y="9" width="12" height="6" rx="2" fill="#60A5FA" />
            <rect x="16" y="11" width="10" height="2.5" rx="1.25" fill="#93C5FD" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#F0F4FF' }}>Lead<span style={{ color: '#60A5FA' }}>Forge</span></span>
        </a>
      </div>
      <nav style={{ flex: 1, padding: '14px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV.map(item => (
          <a key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, fontSize: 13.5, fontWeight: 500, textDecoration: 'none', color: active === item.href ? '#fff' : '#60A5FA', background: active === item.href ? 'rgba(37,99,235,0.18)' : 'transparent' }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: active === item.href ? '#3B82F6' : '#1D4ED8', flexShrink: 0 }} />
            {item.label}
          </a>
        ))}
      </nav>
      <div style={{ padding: '14px 10px', borderTop: '1px solid rgba(96,165,250,0.08)' }}>
        <button onClick={logout} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(96,165,250,0.1)', borderRadius: 8, padding: '9px 12px', color: '#475569', fontSize: 13, cursor: 'pointer', textAlign: 'left' }}>
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

export default function SettingsPage() {
  useAuth()
  const [activeTab, setActiveTab] = useState('compte')
  const [user, setUser] = useState<{ name: string; email: string; plan: string } | null>(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

  const TABS = ['compte', 'smtp', 'plan', 'rgpd']
  const inputStyle = { width: '100%', background: '#0F1A2E', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 9, padding: '10px 14px', color: '#F0F4FF', fontSize: 13.5, outline: 'none', boxSizing: 'border-box' as const }

  useEffect(() => {
    fetch('/api/user/settings')
      .then(r => r.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
          setForm({ name: data.user.name ?? '', email: data.user.email ?? '' })
        }
      })
      .catch(console.error)
  }, [])

  async function handleSaveAccount(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaveMsg('')
    setSaveError('')
    try {
      const res = await fetch('/api/user/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setSaveError(data.error); return }
      setSaveMsg('Paramètres sauvegardés !')
      setUser(data.user)
      setTimeout(() => setSaveMsg(''), 3000)
    } catch {
      setSaveError('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#060D1A', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar active="/settings" />
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F0F4FF', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Paramètres</h1>
          <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Gérez votre compte et vos préférences</p>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#0B1628', padding: 4, borderRadius: 10, width: 'fit-content', border: '1px solid rgba(96,165,250,0.08)' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ background: activeTab === tab ? '#1D4ED8' : 'transparent', border: 'none', borderRadius: 7, padding: '7px 16px', color: activeTab === tab ? '#fff' : '#64748B', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              {tab === 'smtp' ? 'Email SMTP' : tab === 'rgpd' ? 'RGPD' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === 'compte' && (
          <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.08)', borderRadius: 14, padding: 28, maxWidth: 560 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F4FF', marginBottom: 20 }}>Informations du compte</h2>
            <form onSubmit={handleSaveAccount} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Nom complet</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
              </div>
              <div>
                <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="vous@exemple.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
              </div>

              {saveMsg && <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#86EFAC' }}>{saveMsg}</div>}
              {saveError && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5' }}>{saveError}</div>}

              <button type="submit" disabled={saving} style={{ background: '#2563EB', border: 'none', borderRadius: 9, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer', width: 'fit-content', opacity: saving ? 0.8 : 1 }}>
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'smtp' && (
          <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.08)', borderRadius: 14, padding: 28, maxWidth: 560 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F4FF', marginBottom: 8 }}>Configuration SMTP</h2>
            <p style={{ fontSize: 13.5, color: '#475569', marginBottom: 20 }}>Connectez votre email pour envoyer les campagnes depuis votre adresse</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Hôte SMTP', placeholder: 'smtp.gmail.com' },
                { label: 'Port', placeholder: '587' },
                { label: 'Utilisateur', placeholder: 'vous@gmail.com' },
                { label: 'Mot de passe', placeholder: '••••••••', type: 'password' },
                { label: "Email d'envoi", placeholder: 'vous@gmail.com' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                  <input type={f.type ?? 'text'} placeholder={f.placeholder} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
                </div>
              ))}
              <button style={{ background: '#2563EB', border: 'none', borderRadius: 9, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', width: 'fit-content', marginTop: 4 }}>
                Enregistrer et tester
              </button>
            </div>
          </div>
        )}

        {activeTab === 'plan' && (
          <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.08)', borderRadius: 14, padding: 28, maxWidth: 560 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F4FF', marginBottom: 20 }}>Plan actuel</h2>
            <div style={{ background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
              <p style={{ fontSize: 11, color: '#64748B', margin: '0 0 4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Plan actuel</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#F0F4FF', margin: '0 0 4px', letterSpacing: '-0.5px' }}>{user?.plan ?? 'Starter'}</p>
              <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>
                {user?.plan === 'PRO' ? '50 emails/jour · 1 000 leads/mois · 15 campagnes' : '10 emails/jour · 100 leads/mois · 3 campagnes'}
              </p>
            </div>
            {user?.plan !== 'PRO' && (
              <a href="/onboarding" style={{ display: 'inline-block', background: '#1D4ED8', color: '#fff', fontSize: 14, fontWeight: 700, padding: '10px 20px', borderRadius: 9, textDecoration: 'none' }}>
                Passer au Pro →
              </a>
            )}
          </div>
        )}

        {activeTab === 'rgpd' && (
          <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.08)', borderRadius: 14, padding: 28, maxWidth: 560 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F4FF', marginBottom: 20 }}>Données personnelles</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Exporter mes données', desc: 'Téléchargez toutes vos données au format CSV', btn: 'Exporter', color: '#2563EB' },
                { label: 'Supprimer mon compte', desc: 'Suppression définitive et irréversible de votre compte', btn: 'Supprimer', color: '#EF4444' },
              ].map(a => (
                <div key={a.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(96,165,250,0.06)' }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#F0F4FF', margin: '0 0 3px' }}>{a.label}</p>
                    <p style={{ fontSize: 12.5, color: '#475569', margin: 0 }}>{a.desc}</p>
                  </div>
                  <button style={{ background: 'transparent', border: `1px solid ${a.color}`, borderRadius: 8, padding: '7px 16px', color: a.color, fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0, marginLeft: 16 }}>
                    {a.btn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
