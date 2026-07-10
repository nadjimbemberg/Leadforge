'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Banner } from '@/components/ui/banner'
import { cn } from '@/lib/utils'

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

  return (
    <>
      {/* Stepper */}
      <div className="mb-8 flex items-center gap-2">
        {['Compte créé', 'Choisir un plan', 'Paiement'].map((label, i) => {
          const done = i === 0 || (i === 1 && step === 'billing')
          return (
            <div key={label} className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/30 text-[12px] font-medium"
                style={{
                  background: done ? '#BC5B39' : i === 1 ? '#BC5B39' : 'transparent',
                  color: done || i === 1 ? '#FBF3EC' : '#BC5B39',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span className="text-[12px] font-medium" style={{ color: i === 0 ? '#BC5B39' : '#8C8375' }}>{label}</span>
              {i < 2 && <div className="h-px w-8 bg-border" />}
            </div>
          )
        })}
      </div>

      <div className="w-full max-w-[540px] rounded-lg border border-border bg-paper p-9">
        {step === 'plan' ? (
          <>
            <h1 className="mb-1.5 font-serif text-[26px] font-medium text-foreground">Choisissez votre plan</h1>
            <p className="mb-7 text-[14px] text-muted-foreground">14 jours gratuits · Annulation à tout moment</p>
            <div className="mb-6 flex flex-col gap-3">
              {PLANS.map(p => {
                const isSelected = plan === p.id
                return (
                  <div
                    key={p.id}
                    onClick={() => setPlan(p.id)}
                    className={cn(
                      'relative cursor-pointer rounded-md border p-5 transition-colors',
                      isSelected ? 'border-primary bg-primary/[0.05]' : 'border-border'
                    )}
                  >
                    {p.recommended && (
                      <div className="absolute -top-2.5 right-4 rounded-full bg-foreground px-2.5 py-0.5 text-[11px] font-medium text-background">Recommandé</div>
                    )}
                    <div className="mb-2.5 flex items-center justify-between">
                      <div>
                        <p className="mb-0.5 text-[15px] font-medium text-foreground">{p.name}</p>
                        <p className="text-[12px] text-muted-foreground">À partir de <span className="font-medium text-primary">{p.yearlyPrice}/mois</span></p>
                      </div>
                      <div
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                        style={{ borderColor: isSelected ? '#BC5B39' : '#E4DCCC', background: isSelected ? '#BC5B39' : 'transparent' }}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-paper" />}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-3.5 gap-y-1">
                      {p.features.map(f => (
                        <span key={f} className="text-[12px] text-muted-foreground">· {f}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="flex gap-2.5">
              <button onClick={() => router.push('/dashboard')} className="flex-1 rounded-md border border-border py-2.5 text-[14px] text-subtle">
                Continuer gratuitement
              </button>
              <button onClick={() => setStep('billing')} className="flex-[2] rounded-md bg-foreground py-2.5 text-[14px] font-medium text-background">
                Continuer avec {selectedPlan.name} →
              </button>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setStep('plan')} className="mb-5 text-[13px] text-primary">← Retour</button>
            <h1 className="mb-1.5 font-serif text-[26px] font-medium text-foreground">Facturation</h1>
            <p className="mb-7 text-[14px] text-muted-foreground">Plan : <span className="font-medium text-primary">{selectedPlan.name}</span></p>
            <div className="mb-7 flex flex-col gap-3">
              {[
                { id: 'YEARLY', label: 'Annuel', badge: 'Économisez 50%', price: selectedPlan.yearlyPrice + '/mois', sub: 'Facturé annuellement' },
                { id: 'MONTHLY', label: 'Mensuel', badge: null, price: selectedPlan.monthlyPrice + '/mois', sub: 'Facturé chaque mois' },
              ].map(opt => {
                const isSelected = cycle === opt.id
                return (
                  <div
                    key={opt.id}
                    onClick={() => setCycle(opt.id as 'MONTHLY' | 'YEARLY')}
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-md border px-5 py-4 transition-colors',
                      isSelected ? 'border-primary bg-primary/[0.05]' : 'border-border'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                        style={{ borderColor: isSelected ? '#BC5B39' : '#E4DCCC', background: isSelected ? '#BC5B39' : 'transparent' }}
                      >
                        {isSelected && <div className="h-2 w-2 rounded-full bg-paper" />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-medium text-foreground">{opt.label}</span>
                          {opt.badge && <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[11px] font-medium text-secondary">{opt.badge}</span>}
                        </div>
                        <span className="text-[12px] text-muted-foreground">{opt.sub}</span>
                      </div>
                    </div>
                    <span className="text-[16px] font-medium" style={{ color: isSelected ? '#BC5B39' : '#8C8375' }}>{opt.price}</span>
                  </div>
                )
              })}
            </div>
            {error && <Banner variant="error" className="mb-4">{error}</Banner>}
            <button onClick={handleCheckout} disabled={loading} className="w-full rounded-md bg-foreground py-3 text-[14.5px] font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
              {loading ? 'Redirection...' : 'Procéder au paiement →'}
            </button>
            <p className="mt-3 text-center text-[12px] text-muted-foreground">Paiement sécurisé par Stripe · Annulation à tout moment</p>
          </>
        )}
      </div>
    </>
  )
}
