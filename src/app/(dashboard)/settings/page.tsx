'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Input } from '@/components/ui/input'
import { Banner } from '@/components/ui/banner'
import { cn } from '@/lib/utils'

const TABS = ['compte', 'smtp', 'plan', 'rgpd']

const SMTP_FIELDS = [
  { label: 'Hôte SMTP', placeholder: 'smtp.gmail.com' },
  { label: 'Port', placeholder: '587' },
  { label: 'Utilisateur', placeholder: 'vous@gmail.com' },
  { label: 'Mot de passe', placeholder: '••••••••', type: 'password' },
  { label: "Email d'envoi", placeholder: 'vous@gmail.com' },
]

const RGPD_ACTIONS = [
  { label: 'Exporter mes données', desc: 'Téléchargez toutes vos données au format CSV', btn: 'Exporter', destructive: false },
  { label: 'Supprimer mon compte', desc: 'Suppression définitive et irréversible de votre compte', btn: 'Supprimer', destructive: true },
]

export default function SettingsPage() {
  useAuth()
  const [activeTab, setActiveTab] = useState('compte')
  const [user, setUser] = useState<{ name: string; email: string; plan: string } | null>(null)
  const [form, setForm] = useState({ name: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [saveError, setSaveError] = useState('')

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
    <main className="flex-1 overflow-y-auto px-10 py-9">
      <div className="mb-8">
        <h1 className="mb-1.5 font-serif text-[27px] font-medium text-foreground">Paramètres</h1>
        <p className="text-[14px] text-muted-foreground">Gérez votre compte et vos préférences</p>
      </div>

      <div className="mb-7 flex w-fit gap-1 border-b border-border">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'border-b-2 px-4 py-2.5 text-[13px] font-medium',
              activeTab === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
            )}
          >
            {tab === 'smtp' ? 'Email SMTP' : tab === 'rgpd' ? 'RGPD' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'compte' && (
        <div className="max-w-[560px] rounded-lg border border-border bg-card p-7">
          <h2 className="mb-5 font-serif text-[17px] font-medium text-foreground">Informations du compte</h2>
          <form onSubmit={handleSaveAccount} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-subtle">Nom complet</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jean Dupont" />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-subtle">Email</label>
              <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="vous@exemple.com" />
            </div>

            {saveMsg && <Banner variant="success">{saveMsg}</Banner>}
            {saveError && <Banner variant="error">{saveError}</Banner>}

            <button type="submit" disabled={saving} className="w-fit rounded-md bg-foreground px-5 py-2.5 text-[14px] font-medium text-background disabled:cursor-not-allowed disabled:opacity-70">
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'smtp' && (
        <div className="max-w-[560px] rounded-lg border border-border bg-card p-7">
          <h2 className="mb-1.5 font-serif text-[17px] font-medium text-foreground">Configuration SMTP</h2>
          <p className="mb-5 text-[13.5px] text-muted-foreground">Connectez votre email pour envoyer les campagnes depuis votre adresse</p>
          <div className="flex flex-col gap-3.5">
            {SMTP_FIELDS.map(f => (
              <div key={f.label}>
                <label className="mb-1.5 block text-[13px] font-medium text-subtle">{f.label}</label>
                <Input type={f.type ?? 'text'} placeholder={f.placeholder} />
              </div>
            ))}
            <button className="mt-1 w-fit rounded-md bg-foreground px-5 py-2.5 text-[14px] font-medium text-background">
              Enregistrer et tester
            </button>
          </div>
        </div>
      )}

      {activeTab === 'plan' && (
        <div className="max-w-[560px] rounded-lg border border-border bg-card p-7">
          <h2 className="mb-5 font-serif text-[17px] font-medium text-foreground">Plan actuel</h2>
          <div className="mb-5 rounded-md border border-primary/20 bg-primary/[0.06] px-5 py-4">
            <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Plan actuel</p>
            <p className="mb-1 font-serif text-[22px] font-medium text-foreground">{user?.plan ?? 'Starter'}</p>
            <p className="text-[13px] text-muted-foreground">
              {user?.plan === 'PRO' ? '50 emails/jour · 1 000 leads/mois · 15 campagnes' : '10 emails/jour · 100 leads/mois · 3 campagnes'}
            </p>
          </div>
          {user?.plan !== 'PRO' && (
            <a href="/onboarding" className="inline-block rounded-md bg-foreground px-5 py-2.5 text-[14px] font-medium text-background no-underline">
              Passer au Pro →
            </a>
          )}
        </div>
      )}

      {activeTab === 'rgpd' && (
        <div className="max-w-[560px] rounded-lg border border-border bg-card p-7">
          <h2 className="mb-5 font-serif text-[17px] font-medium text-foreground">Données personnelles</h2>
          <div className="flex flex-col">
            {RGPD_ACTIONS.map((a, i) => (
              <div key={a.label} className={cn('flex items-center justify-between py-4', i > 0 && 'border-t border-border')}>
                <div>
                  <p className="mb-0.5 text-[14px] font-medium text-foreground">{a.label}</p>
                  <p className="text-[12.5px] text-muted-foreground">{a.desc}</p>
                </div>
                <button
                  className={cn(
                    'ml-4 flex-shrink-0 rounded-md border px-4 py-1.5 text-[13px] font-medium',
                    a.destructive ? 'border-destructive/40 text-destructive' : 'border-border text-foreground'
                  )}
                >
                  {a.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
