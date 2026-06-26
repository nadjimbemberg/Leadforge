import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ backgroundColor: '#060D1A', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Sans', system-ui, sans-serif", padding: 24 }}>
      <svg width="40" height="40" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 24 }}>
        <rect width="32" height="32" rx="8" fill="#0F1A2E" />
        <rect x="7" y="22" width="18" height="3" rx="1.5" fill="#2563EB" />
        <rect x="10" y="19" width="12" height="3" rx="1" fill="#3B82F6" />
        <rect x="6" y="9" width="12" height="6" rx="2" fill="#60A5FA" />
        <rect x="16" y="11" width="10" height="2.5" rx="1.25" fill="#93C5FD" />
      </svg>

      <div style={{ textAlign: 'center', maxWidth: 420 }}>
        <p style={{ fontSize: 13, color: '#2563EB', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Erreur 404</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F0F4FF', letterSpacing: '-1px', marginBottom: 12 }}>Page introuvable</h1>
        <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 32 }}>
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <Link href="/dashboard" style={{ background: '#2563EB', color: '#fff', fontSize: 14, fontWeight: 700, padding: '11px 24px', borderRadius: 9, textDecoration: 'none' }}>
            Retour au dashboard
          </Link>
          <Link href="/" style={{ background: 'transparent', color: '#60A5FA', fontSize: 14, fontWeight: 600, padding: '11px 24px', borderRadius: 9, textDecoration: 'none', border: '1px solid rgba(96,165,250,0.2)' }}>
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
