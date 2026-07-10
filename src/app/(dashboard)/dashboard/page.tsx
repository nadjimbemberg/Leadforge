'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect, Suspense } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Banner } from '@/components/ui/banner'
import { cn } from '@/lib/utils'

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
    { label: 'Leads total', value: '0' },
    { label: 'Emails envoyés', value: '0' },
    { label: "Taux d'ouverture", value: '0%' },
    { label: 'Taux de réponse', value: '0%' },
  ]

  const ACTIONS = [
    { title: 'Scraper des leads', desc: 'Trouver des prospects via IA', href: '/scraper' },
    { title: 'Créer une campagne', desc: 'Lancer une séquence email', href: '/campaigns' },
    { title: 'Voir le pipeline', desc: 'Gérer vos prospects', href: '/pipeline' },
  ]

  return (
    <main className="flex-1 overflow-y-auto px-10 py-9">
      {expired && (
        <Banner variant="error" className="mb-6">
          Votre session a expiré. Vous avez été reconnecté automatiquement.
        </Banner>
      )}

      {success && (
        <Banner variant="success" className="mb-6">
          Votre abonnement a été activé avec succès ! Bienvenue sur LeadForge Pro.
        </Banner>
      )}

      <div className="mb-9">
        <h1 className="mb-1.5 font-serif text-[27px] font-medium text-foreground">
          {user?.name ? `Bonjour, ${user.name.split(' ')[0]} !` : 'Tableau de bord'}
        </h1>
        <p className="text-[14px] text-muted-foreground">Bienvenue sur LeadForge — votre espace de prospection B2B</p>
      </div>

      <div className="mb-10 flex border-y border-border">
        {KPIS.map((kpi, i) => (
          <div key={kpi.label} className={cn('flex-1 px-6 py-5', i > 0 && 'border-l border-border')}>
            <p className="mb-1.5 text-[11.5px] font-medium uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
            <p className="font-serif text-[28px] font-medium text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3.5 text-[13px] font-medium uppercase tracking-wider text-muted-foreground">Actions rapides</h2>
      <div className="mb-9 flex flex-col rounded-lg border border-border">
        {ACTIONS.map((a, i) => (
          <a key={a.title} href={a.href} className={cn('flex items-center justify-between px-6 py-4 no-underline', i > 0 && 'border-t border-border')}>
            <div>
              <p className="mb-0.5 text-[14px] font-medium text-foreground">{a.title}</p>
              <p className="text-[13px] text-muted-foreground">{a.desc}</p>
            </div>
            <span className="text-[14px] text-primary">→</span>
          </a>
        ))}
      </div>

      {user?.plan !== 'PRO' && user?.plan !== 'UNLIMITED' && (
        <div className="flex items-center justify-between rounded-lg border border-primary/25 bg-primary/[0.05] px-6 py-5">
          <div>
            <p className="mb-1 text-[14px] font-medium text-foreground">Passez au plan Pro</p>
            <p className="text-[13px] text-muted-foreground">50 emails/jour, 1 000 leads/mois, A/B testing et AutoPilot inclus.</p>
          </div>
          <a href="/onboarding" className="flex-shrink-0 whitespace-nowrap rounded-md bg-foreground px-5 py-2.5 text-[13px] font-medium text-background no-underline">
            Passer au Pro →
          </a>
        </div>
      )}
    </main>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="flex-1 px-10 py-9"><p className="text-muted-foreground">Chargement...</p></main>}>
      <DashboardContent />
    </Suspense>
  )
}
