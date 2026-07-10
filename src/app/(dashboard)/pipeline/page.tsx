const COLUMNS = [
  { id: 'NEW', label: 'Nouveau' },
  { id: 'CONTACTED', label: 'Contacté' },
  { id: 'REPLIED', label: 'Répondu' },
  { id: 'QUALIFIED', label: 'Qualifié' },
  { id: 'CONVERTED', label: 'Converti' },
  { id: 'LOST', label: 'Perdu' },
]

export default function PipelinePage() {
  return (
    <main className="flex-1 overflow-x-auto overflow-y-auto px-10 py-9">
      <div className="mb-8">
        <h1 className="mb-1.5 font-serif text-[27px] font-medium text-foreground">Pipeline CRM</h1>
        <p className="text-[14px] text-muted-foreground">Suivez l&apos;avancement de vos prospects en temps réel</p>
      </div>

      <div className="flex min-w-[900px] gap-3">
        {COLUMNS.map(col => (
          <div key={col.id} className="flex-[0_0_200px]">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[12px] font-medium text-subtle">{col.label}</span>
              <span className="rounded-full border border-border px-2 text-[11px] text-muted-foreground">0</span>
            </div>
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-md border border-dashed border-border p-3">
              <p className="text-center text-[12px] text-muted-foreground">Aucun lead</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
