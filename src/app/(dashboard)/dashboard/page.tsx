'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
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

function DashboardContent() {
  useAuth()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<{ name: string; plan: string } | null>(null)
  const success = searchParams.get('success')
  const expired = searchParams.get('expired')

  useEffect(() => {
    fetch('/api/user/settings')
      .then(r => r.json())
      .then(data => { if (data.user) setUser(data.user) })
      .catch(console.error)
  }, [])

  const KPIS = [
    { label: 'Leads total', value: '0', color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.18)' },
    { label: 'Emails envoyés', value: '0', color: '#60A5FA', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.18)' },
    { label: "Taux d'ouverture", value: '0%', color: '#93C5FD', bg: 'rgba(147,197,253,0.08)', border: 'rgba(147,197,253,0.18)' },
    { label: 'Taux de réponse', value: '0%', color: '#BFDBFE', bg: 'rgba(191,219,254,0.08)', border: 'rgba(191,219,254,0.18)' },
  ]

  const ACTIONS = [
    { title: 'Scraper des leads', desc: 'Trouver des prospects via IA', href: '/scraper', color: '#3B82F6', bg: 'rgba(59,130,246,0.06)', border: 'rgba(59,130,246,0.15)' },
    { title: 'Créer une campagne', desc: 'Lancer une séquence email', href: '/campaigns', color: '#60A5FA', bg: 'rgba(96,165,250,0.06)', border: 'rgba(96,165,250,0.15)' },
    { title: 'Voir le pipeline', desc: 'Gérer vos prospects', href: '/pipeline', color: '#93C5FD', bg: 'rgba(147,197,253,0.06)', border: 'rgba(147,197,253,0.15)' },
  ]

  return (
    <main style={{ flex: 1, padding: '36px 40px', overflowY: 'auto' }}>
      {/* Bannière session expirée */}
      {expired && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 18px', marginBottom: 24, fontSize: 13.5, color: '#FCA5A5' }}>
          Votre session a expiré. Vous avez été reconnecté automatiquement.
        </div>
      )}

      {/* Bannière succès paiement */}
      {success && (
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, padding: '12px 18px', marginBottom: 24, fontSize: 13.5, color: '#86EFAC' }}>
          Votre abonnement a été activé avec succès ! Bienvenue sur LeadForge Pro.
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#F0F4FF', margin: '0 0 6px', letterSpacing: '-0.5px' }}>
          {user?.name ? `Bonjour, ${user.name.split(' ')[0]} !` : 'Tableau de bord'}
        </h1>
        <p style={{ fontSize: 14, color: '#475569', margin: 0 }}>Bienvenue sur LeadForge — votre espace de prospection B2B</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
        {KPIS.map(kpi => (
          <div key={kpi.label} style={{ background: kpi.bg, border: `1px solid ${kpi.border}`, borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 11.5, color: '#475569', margin: '0 0 8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</p>
            <p style={{ fontSize: 28, fontWeight: 800, color: kpi.color, margin: 0, letterSpacing: '-1px' }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 700, color: '#F0F4FF', marginBottom: 12 }}>Actions rapides</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
        {ACTIONS.map(a => (
          <a key={a.title} href={a.href} style={{ background: a.bg, border: `1px solid ${a.border}`, borderRadius: 12, padding: 22, textDecoration: 'none', display: 'block' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: a.color, marginBottom: 14 }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: '#F0F4FF', margin: '0 0 5px' }}>{a.title}</p>
            <p style={{ fontSize: 13, color: '#475569', margin: 0 }}>{a.desc}</p>
          </a>
        ))}
      </div>

      {user?.plan !== 'PRO' && user?.plan !== 'UNLIMITED' && (
        <div style={{ background: 'rgba(29,78,216,0.08)', border: '1px solid rgba(37,99,235,0.2)', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: '#F0F4FF', margin: '0 0 4px' }}>Passez au plan Pro</p>
            <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>50 emails/jour, 1 000 leads/mois, A/B testing et AutoPilot inclus.</p>
          </div>
          <a href="/onboarding" style={{ background: '#1D4ED8', color: '#fff', fontSize: 13, fontWeight: 700, padding: '9px 20px', borderRadius: 8, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Passer au Pro →
          </a>
        </div>
      )}
    </main>
  )
}

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#060D1A', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Sidebar active="/dashboard" />
      <Suspense fallback={<main style={{ flex: 1, padding: '36px 40px' }}><p style={{ color: '#475569' }}>Chargement...</p></main>}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}
