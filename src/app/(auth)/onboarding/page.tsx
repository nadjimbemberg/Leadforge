'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

const PLANS = [
  {
    id: 'STARTER', name: 'Starter', yearlyPrice: '9,90€', monthlyPrice: '19,80€',
    features: ['10 emails / jour', '100 leads / mois', '3 campagnes actives', 'Pipeline CRM', 'Support email'],
  },
  {
    id: 'PRO', name: 'Pro', yearlyPrice: '29,90€', monthlyPrice: '59,80€',
    features: ['50 emails / jour', '1 000 leads / mois', '15 campagnes actives', 'A/B testing + AutoPilot', 'Support prioritaire'],
    recommended: true,
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<'plan' | 'billing'>('plan')
  const [plan, setPlan] = useState('PRO')
  const [cycle, setCycle] = useState<'MONTHLY' | 'YEARLY'>('YEARLY')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const selectedPlan = PLANS.find(p => p.id === plan)!

  async function handleCheckout() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, billingCycle: cycle }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      window.location.href = data.url
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  const card = { background: '#0B1628', border: '1px solid rgba(96,165,250,0.12)', borderRadius: 16, padding: 36, width: '100%', maxWidth: 540 }

  return (
    <main style={{ backgroundColor: '#060D1A', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 16px', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 40 }}>
        <Logo />
        <span style={{ fontWeight: 700, fontSize: 18, color: '#F0F4FF' }}>Lead<span style={{ color: '#60A5FA' }}>Forge</span></span>
      </Link>

      {/* Stepper */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
        {['Compte créé', 'Choisir un plan', 'Paiement'].map((label, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700,
              background: i === 0 || (i === 1 && step === 'billing') ? '#2563EB' : i === 1 && step === 'plan' ? '#1D4ED8' : 'rgba(37,99,235,0.15)',
              color: i === 0 || i === 1 ? '#fff' : '#2563EB',
              border: '1px solid rgba(37,99,235,0.3)',
            }}>
              {i === 0 || (i === 1 && step === 'billing') ? '✓' : i + 1}
            </div>
            <span style={{ fontSize: 12, color: i === 0 ? '#60A5FA' : '#334155', fontWeight: 500 }}>{label}</span>
            {i < 2 && <div style={{ width: 32, height: 1, background: 'rgba(37,99,235,0.2)' }} />}
          </div>
        ))}
      </div>

      <div style={card}>
        {step === 'plan' ? (
          <>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>Choisissez votre plan</h1>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>14 jours gratuits · Annulation à tout moment</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {PLANS.map(p => (
                <div key={p.id} onClick={() => setPlan(p.id)} style={{
                  border: `2px solid ${plan === p.id ? '#2563EB' : 'rgba(96,165,250,0.1)'}`,
                  borderRadius: 12, padding: 20, cursor: 'pointer', position: 'relative',
                  background: plan === p.id ? 'rgba(37,99,235,0.08)' : 'transparent',
                }}>
                  {p.recommended && (
                    <div style={{ position: 'absolute', top: -10, right: 16, background: '#2563EB', color: '#fff', fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 99 }}>Recommandé</div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 700, color: '#F0F4FF', margin: '0 0 3px' }}>{p.name}</p>
                      <p style={{ fontSize: 12, color: '#475569', margin: 0 }}>À partir de <span style={{ color: '#60A5FA', fontWeight: 700 }}>{p.yearlyPrice}/mois</span></p>
                    </div>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${plan === p.id ? '#2563EB' : 'rgba(96,165,250,0.3)'}`, background: plan === p.id ? '#2563EB' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {plan === p.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px 14px' }}>
                    {p.features.map(f => (
                      <span key={f} style={{ fontSize: 12, color: '#64748B' }}>✓ {f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => router.push('/dashboard')} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 10, padding: '11px 0', color: '#475569', fontSize: 14, cursor: 'pointer' }}>
                Continuer gratuitement
              </button>
              <button onClick={() => setStep('billing')} style={{ flex: 2, background: '#2563EB', border: 'none', borderRadius: 10, padding: '11px 0', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
                Continuer avec {selectedPlan.name} →
              </button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setStep('plan')} style={{ background: 'none', border: 'none', color: '#60A5FA', fontSize: 13, cursor: 'pointer', padding: 0, marginBottom: 20 }}>← Retour</button>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F0F4FF', marginBottom: 6 }}>Facturation</h1>
            <p style={{ fontSize: 14, color: '#64748B', marginBottom: 28 }}>Plan : <span style={{ color: '#60A5FA', fontWeight: 600 }}>{selectedPlan.name}</span></p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              {[
                { id: 'YEARLY', label: 'Annuel', badge: 'Économisez 50%', price: selectedPlan.yearlyPrice + '/mois', sub: 'Facturé annuellement' },
                { id: 'MONTHLY', label: 'Mensuel', badge: null, price: selectedPlan.monthlyPrice + '/mois', sub: 'Facturé chaque mois' },
              ].map(opt => (
                <div key={opt.id} onClick={() => setCycle(opt.id as 'MONTHLY' | 'YEARLY')} style={{
                  border: `2px solid ${cycle === opt.id ? '#2563EB' : 'rgba(96,165,250,0.1)'}`,
                  borderRadius: 12, padding: '16px 20px', cursor: 'pointer',
                  background: cycle === opt.id ? 'rgba(37,99,235,0.08)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${cycle === opt.id ? '#2563EB' : 'rgba(96,165,250,0.3)'}`, background: cycle === opt.id ? '#2563EB' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {cycle === opt.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#F0F4FF' }}>{opt.label}</span>
                        {opt.badge && <span style={{ fontSize: 11, fontWeight: 700, color: '#34D399', background: 'rgba(52,211,153,0.1)', padding: '2px 8px', borderRadius: 99 }}>{opt.badge}</span>}
                      </div>
                      <span style={{ fontSize: 12, color: '#475569' }}>{opt.sub}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: cycle === opt.id ? '#60A5FA' : '#475569' }}>{opt.price}</span>
                </div>
              ))}
            </div>
            {error && <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#FCA5A5', marginBottom: 16 }}>{error}</div>}
            <button onClick={handleCheckout} disabled={loading} style={{ width: '100%', background: '#2563EB', border: 'none', borderRadius: 10, padding: '13px 0', color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1 }}>
              {loading ? 'Redirection...' : 'Procéder au paiement →'}
            </button>
            <p style={{ fontSize: 12, color: '#334155', textAlign: 'center', marginTop: 12 }}>Paiement sécurisé par Stripe · Annulation à tout moment</p>
          </>
        )}
      </div>
    </main>
  )
}
