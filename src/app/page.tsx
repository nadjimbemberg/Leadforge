'use client'

import Link from 'next/link'

// Logo unifié — même que page login
function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
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

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="6" /><path d="m17 17-3.5-3.5" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="16" height="12" rx="2" /><path d="m2 7 8 5 8-5" />
    </svg>
  )
}
function IconPipeline() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#fff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="4" height="16" rx="1.5" />
      <rect x="8" y="2" width="4" height="11" rx="1.5" />
      <rect x="14" y="2" width="4" height="6" rx="1.5" />
    </svg>
  )
}
function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill="rgba(255,255,255,0.15)" />
      <path d="M4.5 7.5l2 2 4-4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#EFF6FF', color: '#1E3A5F', fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── NAV ── */}
      <nav style={{
        borderBottom: '1px solid #BFDBFE',
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(239,246,255,0.96)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
            <Logo size={28} />
            <span style={{ fontWeight: 700, fontSize: 16, color: '#0F172A', letterSpacing: '-0.4px' }}>
              Lead<span style={{ color: '#1D4ED8' }}>Forge</span>
            </span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <Link href="#features" style={{ fontSize: 13.5, color: '#475569', textDecoration: 'none', fontWeight: 500 }}>Fonctionnalités</Link>
            <Link href="#pricing" style={{ fontSize: 13.5, color: '#475569', textDecoration: 'none', fontWeight: 500 }}>Tarifs</Link>
            <Link href="/login" style={{ fontSize: 13.5, color: '#475569', textDecoration: 'none', fontWeight: 500 }}>Connexion</Link>
            <Link href="/register" style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', background: '#1D4ED8', padding: '8px 18px', borderRadius: 7, textDecoration: 'none' }}>
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ maxWidth: 1060, margin: '0 auto', padding: '88px 28px 56px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#DBEAFE', border: '1px solid #BFDBFE', borderRadius: 99, padding: '5px 15px', marginBottom: 32 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#3B82F6' }} />
          <span style={{ fontSize: 12.5, color: '#1D4ED8', fontWeight: 600 }}>Propulsé par Grok AI · xAI</span>
        </div>

        <h1 style={{ fontSize: 58, fontWeight: 800, lineHeight: 1.06, letterSpacing: '-2.5px', color: '#0F172A', maxWidth: 660, margin: '0 auto 20px' }}>
          La prospection B2B<br />
          <span style={{ color: '#1D4ED8' }}>sans friction</span>
        </h1>

        <p style={{ fontSize: 17, color: '#475569', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Trouvez vos leads, rédigez des emails personnalisés par IA
          et suivez vos prospects — à partir de 9,90€/mois.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 14 }}>
          <Link href="/register" style={{ fontSize: 14, fontWeight: 700, color: '#fff', background: '#1D4ED8', padding: '12px 28px', borderRadius: 9, textDecoration: 'none' }}>
            Démarrer gratuitement
          </Link>
          <Link href="#demo" style={{ fontSize: 14, fontWeight: 500, color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '12px 28px', borderRadius: 9, textDecoration: 'none', background: '#DBEAFE' }}>
            Voir la démo
          </Link>
        </div>
        <p style={{ fontSize: 12.5, color: '#94A3B8' }}>14 jours gratuits · Sans carte bancaire · Résiliable à tout moment</p>

        {/* Metrics */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56, borderTop: '1px solid #BFDBFE', paddingTop: 40 }}>
          {[
            { value: '+47%', label: "Taux d'ouverture" },
            { value: '3 clics', label: 'Pour lancer une campagne' },
            { value: '9,90€', label: 'Par mois (annuel)' },
            { value: '< 3 min', label: 'Onboarding' },
          ].map((m, i) => (
            <div key={m.label} style={{ flex: 1, textAlign: 'center', padding: '0 24px', borderRight: i < 3 ? '1px solid #BFDBFE' : 'none' }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#1D4ED8', margin: '0 0 5px', letterSpacing: '-0.8px' }}>{m.value}</p>
              <p style={{ fontSize: 12, color: '#94A3B8', margin: 0, fontWeight: 500 }}>{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMO PIPELINE ── */}
      <section id="demo" style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ border: '1px solid #BFDBFE', borderRadius: 14, overflow: 'hidden', background: '#DBEAFE' }}>
          <div style={{ background: '#BFDBFE', borderBottom: '1px solid #93C5FD', padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#93C5FD' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#60A5FA' }} />
            <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#3B82F6' }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <span style={{ fontSize: 11.5, color: '#3B82F6', background: '#EFF6FF', padding: '3px 12px', borderRadius: 5, border: '1px solid #BFDBFE' }}>
                app.leadforge.io/pipeline
              </span>
            </div>
          </div>
          <div style={{ padding: 20, overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: 10, minWidth: 780 }}>
              {[
                { label: 'Nouveau', bg: '#1D4ED8', leads: [{ name: 'Thomas Dubois', co: 'AgenceX', score: 82 }, { name: 'Marie Laurent', co: 'StartupY', score: 74 }] },
                { label: 'Contacté', bg: '#2563EB', leads: [{ name: 'Sarah Petit', co: 'TechCorp', score: 91 }, { name: 'Julien Martin', co: 'MediaPro', score: 87 }] },
                { label: 'Répondu', bg: '#3B82F6', leads: [{ name: 'Emma Bernard', co: 'FinBank', score: 95 }] },
                { label: 'Qualifié', bg: '#60A5FA', leads: [{ name: 'Lucas Girard', co: 'GrowthCo', score: 98 }, { name: 'Alice Roux', co: 'DevStudio', score: 93 }] },
                { label: 'Converti', bg: '#93C5FD', leads: [{ name: 'Marc Leroy', co: 'BigCorp', score: 100 }] },
              ].map(col => (
                <div key={col.label} style={{ flex: '0 0 168px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: col.bg }} />
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: '#1E3A5F' }}>{col.label}</span>
                    </div>
                    <span style={{ fontSize: 10.5, color: '#3B82F6', background: '#EFF6FF', padding: '1px 6px', borderRadius: 99, border: '1px solid #BFDBFE' }}>{col.leads.length}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {col.leads.map(lead => (
                      <div key={lead.name} style={{ background: col.bg, borderRadius: 9, padding: '10px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{lead.name[0]}</div>
                          <span style={{ fontSize: 10.5, fontWeight: 800, color: '#fff', background: 'rgba(255,255,255,0.2)', padding: '1px 7px', borderRadius: 99 }}>{lead.score}</span>
                        </div>
                        <p style={{ fontSize: 11.5, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{lead.name}</p>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', margin: 0 }}>{lead.co}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #BFDBFE', padding: '12px 20px', display: 'flex', gap: 36, background: '#EFF6FF' }}>
            {[
              { label: 'Ouverture', value: '47%', color: '#1D4ED8' },
              { label: 'Réponse', value: '12%', color: '#2563EB' },
              { label: 'Leads actifs', value: '128', color: '#3B82F6' },
              { label: 'Emails / jour', value: '50', color: '#60A5FA' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ fontSize: 10.5, color: '#94A3B8', margin: '0 0 2px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: s.color, margin: 0, letterSpacing: '-0.5px' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: '#0F172A', marginBottom: 12 }}>Trois modules. Un seul outil.</h2>
          <p style={{ fontSize: 16, color: '#64748B', maxWidth: 400, margin: '0 auto', lineHeight: 1.65 }}>Conçu pour les indépendants qui veulent prospecter vite et bien.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { icon: <IconSearch />, label: 'Scraping IA', bg: '#1D4ED8', title: 'Trouvez vos prospects en secondes', points: ['Google Maps + annuaires', 'Enrichissement Grok en temps réel', 'Score qualité 0–100 par lead'] },
            { icon: <IconMail />, label: 'Emails IA', bg: '#2563EB', title: 'Des emails qui génèrent des réponses', points: ['Personnalisation contextuelle par IA', 'Séquences jusqu\'à 3 emails', 'Warm-up automatique inclus'] },
            { icon: <IconPipeline />, label: 'Pipeline CRM', bg: '#3B82F6', title: 'Suivez chaque opportunité', points: ['Kanban drag & drop', 'Détection auto des réponses', 'Timeline complète par lead'] },
          ].map(f => (
            <div key={f.label} style={{ background: f.bg, borderRadius: 13, padding: '28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
                {f.icon}
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{f.label}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.4 }}>{f.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {f.points.map(p => (
                  <li key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.85)' }}>
                    <Check />{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ maxWidth: 1060, margin: '0 auto', padding: '0 28px 88px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-1.5px', color: '#0F172A', marginBottom: 12 }}>Tarifs clairs, sans surprise</h2>
          <p style={{ fontSize: 16, color: '#64748B', lineHeight: 1.65 }}>Commencez gratuitement. Évoluez quand vous êtes prêt.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, maxWidth: 680, margin: '0 auto' }}>
          {[
            { plan: 'Starter', yearly: '9,90€', monthly: '19,80€', bg: '#DBEAFE', border: '#BFDBFE', priceColor: '#1D4ED8', featureColor: '#2563EB', ctaBg: '#1D4ED8', ctaColor: '#fff', features: ['10 emails / jour', '100 leads / mois', '3 campagnes actives', 'Pipeline CRM', 'Support email'], cta: 'Commencer gratuitement', highlight: false },
            { plan: 'Pro', yearly: '29,90€', monthly: '59,80€', bg: '#1D4ED8', border: '#2563EB', priceColor: '#fff', featureColor: 'rgba(255,255,255,0.85)', ctaBg: '#fff', ctaColor: '#1D4ED8', features: ['50 emails / jour', '1 000 leads / mois', '15 campagnes actives', 'A/B testing + AutoPilot', 'Support prioritaire'], cta: 'Essayer le Pro', highlight: true },
          ].map(p => (
            <div key={p.plan} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 13, padding: 28, position: 'relative' }}>
              {p.highlight && (
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: '#60A5FA', color: '#fff', fontSize: 11.5, fontWeight: 700, padding: '3px 14px', borderRadius: 99, whiteSpace: 'nowrap' }}>Recommandé</div>
              )}
              <p style={{ fontSize: 11, color: p.highlight ? 'rgba(255,255,255,0.5)' : '#94A3B8', margin: '0 0 10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{p.plan}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, marginBottom: 3 }}>
                <span style={{ fontSize: 36, fontWeight: 800, color: p.priceColor, letterSpacing: '-1.5px' }}>{p.yearly}</span>
                <span style={{ fontSize: 12.5, color: p.highlight ? 'rgba(255,255,255,0.4)' : '#94A3B8' }}>/mois annuel</span>
              </div>
              <p style={{ fontSize: 12.5, color: p.highlight ? 'rgba(255,255,255,0.4)' : '#94A3B8', margin: '0 0 24px' }}>ou {p.monthly}/mois mensuel</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13.5, color: p.featureColor }}>
                    <Check />{f}
                  </li>
                ))}
              </ul>
              <Link href="/register" style={{ display: 'block', textAlign: 'center', padding: '11px 0', background: p.ctaBg, borderRadius: 9, fontSize: 14, fontWeight: 700, color: p.ctaColor, textDecoration: 'none', border: p.highlight ? 'none' : '1px solid #BFDBFE' }}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #BFDBFE', padding: '24px 28px', background: '#DBEAFE' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo size={22} />
            <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>Lead<span style={{ color: '#1D4ED8' }}>Forge</span></span>
          </div>
          <p style={{ fontSize: 12.5, color: '#94A3B8', margin: 0 }}>© 2026 LeadForge · Learni Group</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['CGU', 'Confidentialité', 'Contact'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12.5, color: '#94A3B8', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
