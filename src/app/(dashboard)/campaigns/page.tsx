'use client'

import { useState } from 'react'
import { Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CampaignsPage() {
  const [showNew, setShowNew] = useState(false)

  return (
    <main className="flex-1 overflow-y-auto px-10 py-9">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-1.5 font-serif text-[27px] font-medium text-foreground">Campagnes</h1>
          <p className="text-[14px] text-muted-foreground">Gérez vos séquences d&apos;emails de prospection</p>
        </div>
        <button onClick={() => setShowNew(true)} className="rounded-md bg-foreground px-5 py-2.5 text-[14px] font-medium text-background">
          + Nouvelle campagne
        </button>
      </div>

      {showNew && (
        <div className="mb-6 rounded-lg border border-primary/25 bg-card p-7">
          <h2 className="mb-5 font-serif text-[17px] font-medium text-foreground">Créer une campagne</h2>
          <div className="flex flex-col gap-3.5">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-subtle">Nom de la campagne</label>
              <Input placeholder="Ex: Prospection agences web Paris" />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-subtle">Description (optionnel)</label>
              <Input placeholder="Ex: Ciblage agences web 1-10 salariés" />
            </div>
            <div className="mt-1 flex gap-2.5">
              <button className="rounded-md bg-foreground px-5 py-2.5 text-[14px] font-medium text-background">
                Créer la campagne
              </button>
              <button onClick={() => setShowNew(false)} className="rounded-md border border-border px-5 py-2.5 text-[14px] text-subtle">
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-border py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
          <Mail size={18} strokeWidth={1.75} className="text-primary" />
        </div>
        <p className="mb-1.5 text-[15px] font-medium text-foreground">Aucune campagne pour l&apos;instant</p>
        <p className="text-[13.5px] text-muted-foreground">Créez votre première séquence d&apos;emails pour commencer à prospecter</p>
      </div>
    </main>
  )
}
