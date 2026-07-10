'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Banner } from '@/components/ui/banner'

function ResetForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) { setError('Les mots de passe ne correspondent pas'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error); return }
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2500)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <p className="text-[15px] text-destructive">Lien invalide ou expiré.</p>
        <Link href="/forgot-password" className="text-[14px] font-medium text-primary no-underline">Demander un nouveau lien</Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10">
          <Check size={22} strokeWidth={2} color="#3F5A44" />
        </div>
        <h2 className="mb-2.5 font-serif text-xl font-medium text-foreground">Mot de passe modifié !</h2>
        <p className="text-[14px] text-muted-foreground">Redirection vers la connexion...</p>
      </div>
    )
  }

  return (
    <>
      <h1 className="mb-1.5 font-serif text-[26px] font-medium text-foreground">Nouveau mot de passe</h1>
      <p className="mb-7 text-[14px] text-muted-foreground">Choisissez un mot de passe fort pour sécuriser votre compte.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-subtle">Nouveau mot de passe</label>
          <Input type="password" placeholder="10 caractères minimum" value={password} onChange={e => setPassword(e.target.value)} required minLength={10} />
          <p className="mt-1.5 text-[11.5px] text-muted-foreground">Min. 10 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial</p>
        </div>
        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-subtle">Confirmer le mot de passe</label>
          <Input type="password" placeholder="Répétez le mot de passe" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        </div>

        {error && <Banner variant="error">{error}</Banner>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-foreground py-3 text-[14.5px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Modification...' : 'Modifier mon mot de passe'}
        </button>
      </form>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-[400px]">
      <div className="rounded-lg border border-border bg-paper p-9">
        <Suspense fallback={<p className="text-muted-foreground">Chargement...</p>}>
          <ResetForm />
        </Suspense>
      </div>
      <p className="mt-6 text-center text-[14px] text-muted-foreground">
        <Link href="/login" className="font-medium text-primary no-underline">← Retour à la connexion</Link>
      </p>
    </div>
  )
}
