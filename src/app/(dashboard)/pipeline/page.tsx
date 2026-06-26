'use client'

import { useRouter } from 'next/navigation'

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

const COLUMNS = [
  { id: 'NEW', label: 'Nouveau', color: '#3B82F6' },
  { id: 'CONTACTED', label: 'Contacté', color: '#60A5FA' },
  { id: 'REPLIED', label: 'Répondu', color: '#93C5FD' },
  { id: 'QUALIFIED', label: 'Qualifié', color: '#34D399' },
  { id: 'CONVERTED', label: 'Converti', color: '#FBBF24' },
  { id: 'LOST', label: 'Perdu', color: '#EF4444' },
]

export default function PipelinePage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#060D1A', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar active="/pipeline" />
      <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto', overflowX: 'auto' }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F0F4FF', margin: '0 0 6px', letterSpacing: '-0.5px' }}>Pipeline CRM</h1>
          <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Suivez l'avancement de vos prospects en temps réel</p>
        </div>

        {/* Kanban board */}
        <div style={{ display: 'flex', gap: 12, minWidth: 900 }}>
          {COLUMNS.map(col => (
            <div key={col.id} style={{ flex: '0 0 200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#94A3B8' }}>{col.label}</span>
                </div>
                <span style={{ fontSize: 11, color: '#334155', background: '#0B1628', padding: '1px 8px', borderRadius: 99, border: '1px solid rgba(96,165,250,0.1)' }}>0</span>
              </div>
              <div style={{ background: '#0B1628', border: '1px solid rgba(96,165,250,0.08)', borderRadius: 10, minHeight: 200, padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ fontSize: 12, color: '#334155', textAlign: 'center' }}>Aucun lead</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
