import Link from 'next/link'
import { Logo } from '@/components/layout/logo'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="mb-6">
        <Logo size={40} />
      </div>

      <div className="max-w-[420px] text-center">
        <p className="mb-3 text-[13px] font-medium uppercase tracking-[0.14em] text-primary">Erreur 404</p>
        <h1 className="mb-3 font-serif text-[36px] font-medium tracking-tight text-foreground">Page introuvable</h1>
        <p className="mb-8 text-[15px] leading-relaxed text-subtle">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex justify-center gap-2.5">
          <Link href="/dashboard" className="rounded-md bg-foreground px-6 py-2.5 text-[14px] font-medium text-background no-underline">
            Retour au dashboard
          </Link>
          <Link href="/" className="rounded-md border border-border px-6 py-2.5 text-[14px] font-medium text-foreground no-underline">
            Accueil
          </Link>
        </div>
      </div>
    </main>
  )
}
