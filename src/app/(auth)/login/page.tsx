'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Banner } from '@/components/ui/banner'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const prefillEmail = searchParams.get('email') ?? ''
  const expired = searchParams.get('expired')
  const errorParam = searchParams.get('error')

  const [form, setForm] = useState({ email: prefillEmail, password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Erreur de connexion'); return }
      const redirect = searchParams.get('redirect') ?? '/dashboard'
      router.push(redirect)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {expired && (
        <Banner variant="warning" className="mb-5">
          Votre session a expiré. Reconnectez-vous pour continuer.
        </Banner>
      )}
      {errorParam === 'lien_invalide' && (
        <Banner variant="error" className="mb-5">
          Le lien est invalide ou a expiré. Demandez-en un nouveau.
        </Banner>
      )}

      <h1 className="mb-1.5 font-serif text-[26px] font-medium text-foreground">Bon retour</h1>
      <p className="mb-7 text-[14px] text-muted-foreground">Connectez-vous à votre espace LeadForge</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-subtle">Email</label>
          <Input type="email" placeholder="vous@exemple.com" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-[13px] font-medium text-subtle">Mot de passe</label>
            <Link href="/forgot-password" className="text-[12px] text-primary no-underline">Oublié ?</Link>
          </div>
          <Input type="password" placeholder="••••••••" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })} required />
        </div>

        {error && <Banner variant="error">{error}</Banner>}

        <button
          type="submit"
          disabled={loading}
          className="mt-1 w-full rounded-md bg-foreground py-3 text-[14.5px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Connexion...' : 'Se connecter'}
        </button>
      </form>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="rounded-lg border border-border bg-paper p-9">
        <Suspense fallback={<p className="text-muted-foreground">Chargement...</p>}>
          <LoginForm />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-[14px] text-muted-foreground">
        Pas encore de compte ?{' '}
        <Link href="/register" className="font-medium text-primary no-underline">Créer un compte gratuit</Link>
      </p>
    </div>
  )
}
