'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Banner } from '@/components/ui/banner'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '10 caractères minimum', ok: password.length >= 10 },
    { label: 'Une majuscule', ok: /[A-Z]/.test(password) },
    { label: 'Une minuscule', ok: /[a-z]/.test(password) },
    { label: 'Un chiffre', ok: /[0-9]/.test(password) },
    { label: 'Un caractère spécial (!@#$%...)', ok: /[^A-Za-z0-9]/.test(password) },
  ]
  const score = checks.filter(c => c.ok).length
  const color = score <= 1 ? '#A3402C' : score <= 3 ? '#BC5B39' : '#3F5A44'
  const label = score <= 1 ? 'Très faible' : score <= 2 ? 'Faible' : score <= 3 ? 'Moyen' : score === 4 ? 'Fort' : 'Très fort'

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="mb-1.5 flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-[3px] flex-1 rounded-full transition-colors" style={{ background: i <= score ? color : '#E4DCCC' }} />
        ))}
      </div>
      <div className="mb-2 flex justify-between">
        <span className="text-[11.5px] text-muted-foreground">Force du mot de passe</span>
        <span className="text-[11.5px] font-medium" style={{ color }}>{label}</span>
      </div>
      <div className="flex flex-col gap-1">
        {checks.map(c => (
          <div key={c.label} className="flex items-center gap-1.5">
            <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full" style={{ background: c.ok ? '#3F5A44' : '#E4DCCC' }}>
              {c.ok && <Check size={9} strokeWidth={2.5} color="#fff" />}
            </div>
            <span className="text-[11.5px]" style={{ color: c.ok ? '#3F5A44' : '#8C8375' }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [emailExists, setEmailExists] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setEmailExists(false)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.error === 'EMAIL_ALREADY_EXISTS') {
          setEmailExists(true)
        } else {
          setError(data.error ?? "Erreur lors de l'inscription")
        }
        return
      }
      setSuccess(true)
      setTimeout(() => router.push('/onboarding'), 2000)
    } catch {
      setError('Erreur réseau, réessayez')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="w-full max-w-[440px] rounded-lg border border-border bg-paper p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10">
          <Check size={22} strokeWidth={2} color="#3F5A44" />
        </div>
        <h2 className="mb-2 font-serif text-xl font-medium text-foreground">Compte créé !</h2>
        <p className="text-[14px] text-muted-foreground">
          Un email de confirmation a été envoyé à <strong className="text-primary">{form.email}</strong>.<br />
          Vérifiez votre boîte mail pour activer votre compte.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[440px]">
      <div className="mb-6 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-4 py-1.5">
          <span className="text-[13px] font-medium text-primary">14 jours gratuits · Sans carte bancaire</span>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-paper p-9">
        <h1 className="mb-1.5 font-serif text-[26px] font-medium text-foreground">Créer un compte</h1>
        <p className="mb-7 text-[14px] text-muted-foreground">Rejoignez les indépendants qui prospectent intelligemment</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-subtle">Nom complet</label>
            <Input type="text" placeholder="Jean Dupont" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-subtle">Email professionnel</label>
            <Input type="email" placeholder="vous@entreprise.com" value={form.email} onChange={e => { setForm({ ...form, email: e.target.value }); setEmailExists(false) }} required />
            {emailExists && (
              <Banner variant="error" className="mt-2">
                Cet email est déjà utilisé.{' '}
                <Link href={`/login?email=${encodeURIComponent(form.email)}`} className="font-medium no-underline">
                  Se connecter →
                </Link>
              </Banner>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-subtle">Mot de passe</label>
            <Input type="password" placeholder="Minimum 10 caractères" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <PasswordStrength password={form.password} />
          </div>

          {error && <Banner variant="error">{error}</Banner>}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-md bg-foreground py-3 text-[14.5px] font-medium text-background transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Création...' : 'Créer mon compte gratuitement'}
          </button>

          <p className="text-center text-[12px] text-muted-foreground">
            En créant un compte, vous acceptez nos <a href="#" className="text-subtle">CGU</a> et notre <a href="#" className="text-subtle">politique de confidentialité</a>
          </p>
        </form>
      </div>

      <p className="mt-6 text-center text-[14px] text-muted-foreground">
        Déjà un compte ?{' '}
        <Link href="/login" className="font-medium text-primary no-underline">Se connecter</Link>
      </p>
    </div>
  )
}
