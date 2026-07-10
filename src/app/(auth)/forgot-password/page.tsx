'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Banner } from '@/components/ui/banner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSent(true)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[400px]">
      <div className="rounded-lg border border-border bg-paper p-9">
        {sent ? (
          <div className="text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10">
              <Check size={22} strokeWidth={2} color="#3F5A44" />
            </div>
            <h2 className="mb-2.5 font-serif text-xl font-medium text-foreground">Email envoyé !</h2>
            <p className="mb-6 text-[14px] text-muted-foreground">
              Si <strong className="text-primary">{email}</strong> est associé à un compte, vous recevrez un lien de réinitialisation dans quelques minutes.
            </p>
            <Link href="/login" className="text-[14px] font-medium text-primary no-underline">
              ← Retour à la connexion
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mb-1.5 font-serif text-[26px] font-medium text-foreground">Mot de passe oublié</h1>
            <p className="mb-7 text-[14px] text-muted-foreground">
              Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-[13px] font-medium text-subtle">Email</label>
                <Input type="email" placeholder="vous@exemple.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>

              {error && <Banner variant="error">{error}</Banner>}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-md bg-foreground py-3 text-[14.5px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Envoi...' : 'Envoyer le lien de réinitialisation'}
              </button>
            </form>
          </>
        )}
      </div>

      <p className="mt-6 text-center text-[14px] text-muted-foreground">
        <Link href="/login" className="font-medium text-primary no-underline">← Retour à la connexion</Link>
      </p>
    </div>
  )
}
