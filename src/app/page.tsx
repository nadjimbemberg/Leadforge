'use client'

import Link from 'next/link'
import { Search, Mail, Kanban, Check } from 'lucide-react'
import { Logo, Wordmark } from '@/components/layout/logo'
import { cn } from '@/lib/utils'

const FEATURES = [
  {
    icon: Search, num: '01', label: 'Scraping IA',
    title: 'Trouvez vos prospects en secondes',
    points: ['Google Maps + annuaires', 'Enrichissement Grok en temps réel', 'Score qualité 0–100 par lead'],
  },
  {
    icon: Mail, num: '02', label: 'Emails IA',
    title: 'Des emails qui génèrent des réponses',
    points: ['Personnalisation contextuelle par IA', "Séquences jusqu'à 3 emails", 'Warm-up automatique inclus'],
  },
  {
    icon: Kanban, num: '03', label: 'Pipeline CRM',
    title: 'Suivez chaque opportunité',
    points: ['Kanban drag & drop', 'Détection auto des réponses', 'Timeline complète par lead'],
  },
]

const PIPELINE_COLUMNS = [
  { label: 'Nouveau', leads: [{ name: 'Thomas Dubois', co: 'AgenceX', score: 82 }, { name: 'Marie Laurent', co: 'StartupY', score: 74 }] },
  { label: 'Contacté', leads: [{ name: 'Sarah Petit', co: 'TechCorp', score: 91 }, { name: 'Julien Martin', co: 'MediaPro', score: 87 }] },
  { label: 'Répondu', leads: [{ name: 'Emma Bernard', co: 'FinBank', score: 95 }] },
  { label: 'Qualifié', leads: [{ name: 'Lucas Girard', co: 'GrowthCo', score: 98 }, { name: 'Alice Roux', co: 'DevStudio', score: 93 }] },
  { label: 'Converti', leads: [{ name: 'Marc Leroy', co: 'BigCorp', score: 100 }] },
]

function CheckDot() {
  return (
    <span className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15">
      <Check size={9} strokeWidth={3} className="text-primary" />
    </span>
  )
}

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-[60px] max-w-[1040px] items-center justify-between px-7">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <Logo size={27} />
            <Wordmark size={16} />
          </Link>
          <div className="flex items-center gap-7">
            <Link href="#features" className="text-[13.5px] font-medium text-subtle no-underline">Fonctionnalités</Link>
            <Link href="#pricing" className="text-[13.5px] font-medium text-subtle no-underline">Tarifs</Link>
            <Link href="/login" className="text-[13.5px] font-medium text-subtle no-underline">Connexion</Link>
            <Link href="/register" className="rounded-md bg-foreground px-4.5 py-2 text-[13.5px] font-medium text-background no-underline">
              Essai gratuit
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-[1040px] px-7 pb-14 pt-20 text-center">
        <p className="mb-6 text-[12.5px] font-medium uppercase tracking-[0.14em] text-primary">
          Propulsé par Grok AI · xAI
        </p>

        <h1 className="mx-auto mb-5 max-w-[640px] font-serif text-[52px] font-medium leading-[1.08] tracking-tight text-foreground">
          La prospection B2B<br />
          <span className="italic text-primary">sans friction</span>
        </h1>

        <p className="mx-auto mb-9 max-w-[440px] text-[17px] leading-relaxed text-subtle">
          Trouvez vos leads, rédigez des emails personnalisés par IA
          et suivez vos prospects — à partir de 9,90€/mois.
        </p>

        <div className="mb-3.5 flex items-center justify-center gap-2.5">
          <Link href="/register" className="rounded-md bg-foreground px-7 py-3 text-[14px] font-medium text-background no-underline">
            Démarrer gratuitement
          </Link>
          <Link href="#demo" className="rounded-md border border-border px-7 py-3 text-[14px] font-medium text-foreground no-underline">
            Voir la démo
          </Link>
        </div>
        <p className="text-[12.5px] text-muted-foreground">14 jours gratuits · Sans carte bancaire · Résiliable à tout moment</p>

        {/* Metrics */}
        <div className="mt-14 flex justify-center border-t border-border pt-9">
          {[
            { value: '+47%', label: "Taux d'ouverture" },
            { value: '3 clics', label: 'Pour lancer une campagne' },
            { value: '9,90€', label: 'Par mois (annuel)' },
            { value: '< 3 min', label: 'Onboarding' },
          ].map((m, i) => (
            <div key={m.label} className={cn('flex-1 px-6 text-center', i < 3 && 'border-r border-border')}>
              <p className="mb-1 font-serif text-[24px] font-medium text-primary">{m.value}</p>
              <p className="text-[12px] font-medium text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DEMO PIPELINE ── */}
      <section id="demo" className="mx-auto max-w-[1040px] px-7 pb-20">
        <p className="mb-3 text-center text-[12px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Aperçu du pipeline
        </p>
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="overflow-x-auto bg-card p-5">
            <div className="flex min-w-[780px] gap-2.5">
              {PIPELINE_COLUMNS.map(col => (
                <div key={col.label} className="flex-[0_0_168px]">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="text-[11.5px] font-medium text-foreground">{col.label}</span>
                    <span className="rounded-full border border-border px-1.5 text-[10.5px] text-muted-foreground">{col.leads.length}</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {col.leads.map(lead => (
                      <div key={lead.name} className="rounded-md border border-border bg-paper p-2.5">
                        <div className="mb-1.5 flex items-center justify-between">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">{lead.name[0]}</div>
                          <span className="rounded-full bg-secondary/10 px-1.5 text-[10.5px] font-medium text-secondary">{lead.score}</span>
                        </div>
                        <p className="mb-0.5 text-[11.5px] font-medium text-foreground">{lead.name}</p>
                        <p className="text-[11px] text-muted-foreground">{lead.co}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-9 border-t border-border bg-background px-5 py-3.5">
            {[
              { label: 'Ouverture', value: '47%' },
              { label: 'Réponse', value: '12%' },
              { label: 'Leads actifs', value: '128' },
              { label: 'Emails / jour', value: '50' },
            ].map(s => (
              <div key={s.label}>
                <p className="mb-0.5 text-[10.5px] font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="font-serif text-[18px] font-medium text-primary">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="mx-auto max-w-[820px] px-7 pb-24">
        <div className="mb-14 text-center">
          <h2 className="mb-3 font-serif text-[34px] font-medium tracking-tight text-foreground">Trois modules. Un seul outil.</h2>
          <p className="mx-auto max-w-[400px] text-[16px] leading-relaxed text-subtle">Conçu pour les indépendants qui veulent prospecter vite et bien.</p>
        </div>
        <div className="flex flex-col">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <div key={f.label} className={cn('flex gap-8 py-8', i > 0 && 'border-t border-border')}>
                <span className="w-14 flex-shrink-0 font-serif text-[32px] font-medium text-border">{f.num}</span>
                <div>
                  <div className="mb-2.5 flex items-center gap-2">
                    <Icon size={15} strokeWidth={1.75} className="text-primary" />
                    <span className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-primary">{f.label}</span>
                  </div>
                  <h3 className="mb-3.5 font-serif text-[20px] font-medium text-foreground">{f.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {f.points.map(p => (
                      <li key={p} className="flex items-center gap-2.5 text-[13.5px] text-subtle">
                        <CheckDot />{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="mx-auto max-w-[1040px] px-7 pb-24">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-serif text-[34px] font-medium tracking-tight text-foreground">Tarifs clairs, sans surprise</h2>
          <p className="text-[16px] leading-relaxed text-subtle">Commencez gratuitement. Évoluez quand vous êtes prêt.</p>
        </div>
        <div className="mx-auto grid max-w-[680px] grid-cols-2 gap-3.5">
          {[
            { plan: 'Starter', yearly: '9,90€', monthly: '19,80€', features: ['10 emails / jour', '100 leads / mois', '3 campagnes actives', 'Pipeline CRM', 'Support email'], cta: 'Commencer gratuitement', highlight: false },
            { plan: 'Pro', yearly: '29,90€', monthly: '59,80€', features: ['50 emails / jour', '1 000 leads / mois', '15 campagnes actives', 'A/B testing + AutoPilot', 'Support prioritaire'], cta: 'Essayer le Pro', highlight: true },
          ].map(p => (
            <div
              key={p.plan}
              className={cn('relative rounded-lg border p-7', p.highlight ? 'border-foreground bg-foreground text-background' : 'border-border bg-paper')}
            >
              {p.highlight && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3.5 py-0.5 text-[11.5px] font-medium text-primary-foreground">
                  Recommandé
                </div>
              )}
              <p className={cn('mb-2.5 text-[11px] font-medium uppercase tracking-[0.12em]', p.highlight ? 'text-background/50' : 'text-muted-foreground')}>{p.plan}</p>
              <div className="mb-1 flex items-baseline gap-1.5">
                <span className={cn('font-serif text-[34px] font-medium', p.highlight ? 'text-background' : 'text-foreground')}>{p.yearly}</span>
                <span className={cn('text-[12.5px]', p.highlight ? 'text-background/50' : 'text-muted-foreground')}>/mois annuel</span>
              </div>
              <p className={cn('mb-6 text-[12.5px]', p.highlight ? 'text-background/50' : 'text-muted-foreground')}>ou {p.monthly}/mois mensuel</p>
              <ul className="mb-6 flex flex-col gap-2.5">
                {p.features.map(f => (
                  <li key={f} className={cn('flex items-center gap-2.5 text-[13.5px]', p.highlight ? 'text-background/85' : 'text-subtle')}>
                    <span className={cn('flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full', p.highlight ? 'bg-background/15' : 'bg-primary/15')}>
                      <Check size={9} strokeWidth={3} className={p.highlight ? 'text-background' : 'text-primary'} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={cn(
                  'block rounded-md py-2.5 text-center text-[14px] font-medium no-underline',
                  p.highlight ? 'bg-primary text-primary-foreground' : 'border border-border text-foreground'
                )}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between px-7">
          <div className="flex items-center gap-2">
            <Logo size={20} />
            <Wordmark size={13} />
          </div>
          <p className="text-[12.5px] text-muted-foreground">© 2026 LeadForge · Learni Group</p>
          <div className="flex gap-5">
            {['CGU', 'Confidentialité', 'Contact'].map(l => (
              <a key={l} href="#" className="text-[12.5px] text-muted-foreground no-underline">{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
