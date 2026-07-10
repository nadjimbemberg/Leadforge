import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

const FIELDS = [
  { label: "Secteur d'activité", placeholder: 'Ex: Agence web, Restaurant, Consultant...' },
  { label: 'Zone géographique', placeholder: 'Ex: Paris, Lyon, Marseille...' },
  { label: "Taille d'entreprise", placeholder: 'Ex: 1-10, 10-50, 50+' },
  { label: 'Nombre de leads max', placeholder: 'Ex: 50, 100, 200' },
]

export default function ScraperPage() {
  return (
    <main className="flex-1 overflow-y-auto px-10 py-9">
      <div className="mb-8">
        <h1 className="mb-1.5 font-serif text-[27px] font-medium text-foreground">Scraper des leads</h1>
        <p className="text-[14px] text-muted-foreground">Trouvez des prospects qualifiés via Google Maps et enrichissement IA</p>
      </div>

      <div className="mb-6 rounded-lg border border-border bg-card p-7">
        <h2 className="mb-5 font-serif text-[17px] font-medium text-foreground">Nouvelle recherche</h2>
        <div className="mb-5 grid grid-cols-2 gap-4">
          {FIELDS.map(f => (
            <div key={f.label}>
              <label className="mb-1.5 block text-[13px] font-medium text-subtle">{f.label}</label>
              <Input placeholder={f.placeholder} />
            </div>
          ))}
        </div>
        <button className="rounded-md bg-foreground px-6 py-2.5 text-[14px] font-medium text-background">
          Lancer le scraping →
        </button>
      </div>

      <div className="rounded-lg border border-border py-12 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
          <Search size={18} strokeWidth={1.75} className="text-primary" />
        </div>
        <p className="mb-1.5 text-[15px] font-medium text-foreground">Aucun lead scrapé pour l&apos;instant</p>
        <p className="text-[13.5px] text-muted-foreground">Lancez votre première recherche pour trouver des prospects qualifiés</p>
      </div>
    </main>
  )
}
