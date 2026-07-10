import Link from 'next/link'
import { Logo, Wordmark } from '@/components/layout/logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-background px-4 py-12">
      <Link href="/" className="mb-9 flex items-center gap-2.5">
        <Logo size={30} />
        <Wordmark size={18} />
      </Link>
      {children}
    </main>
  )
}
