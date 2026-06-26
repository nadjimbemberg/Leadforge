'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

export default function CampaignsPage() {
  const [showNew, setShowNew] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#060D1A', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar active="/campaigns" />
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F0F4FF', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Campagnes</h1>
            <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Gérez vos séquences d'emails de prospection</p>
          </div>
          <button onClick={() => setShowNew(true)} style={{ background: '#2563EB', border: 'none', borderRadius: 9, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            + Nouvelle campagne
          </button>
        </div>

        {showNew && (
          <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 14, padding: 28, marginBottom: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F4FF', marginBottom: 20 }}>Créer une campagne</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { label: 'Nom de la campagne', placeholder: 'Ex: Prospection agences web Paris' },
                { label: 'Description (optionnel)', placeholder: 'Ex: Ciblage agences web 1-10 salariés' },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 13, color: '#94A3B8', display: 'block', marginBottom: 6, fontWeight: 500 }}>{f.label}</label>
                  <input placeholder={f.placeholder} style={{ width: '100%', background: '#0F1A2E', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 9, padding: '10px 14px', color: '#F0F4FF', fontSize: 13.5, outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => e.target.style.borderColor = 'rgba(96,165,250,0.5)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(96,165,250,0.15)'} />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button style={{ background: '#2563EB', border: 'none', borderRadius: 9, padding: '10px 20px', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                  Créer la campagne
                </button>
                <button onClick={() => setShowNew(false)} style={{ background: 'transparent', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 9, padding: '10px 20px', color: '#475569', fontSize: 14, cursor: 'pointer' }}>
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.08)', borderRadius: 14, padding: '48px 0', textAlign: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#3B82F6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="16" height="12" rx="2" /><path d="m2 7 8 5 8-5" />
            </svg>
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#F0F4FF', marginBottom: 6 }}>Aucune campagne pour l'instant</p>
          <p style={{ fontSize: 13.5, color: '#475569' }}>Créez votre première séquence d'emails pour commencer à prospecter</p>
        </div>
      </main>
    </div>
  )
}
