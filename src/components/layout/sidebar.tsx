'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { LayoutDashboard, Search, Megaphone, Kanban, Settings, LogOut } from 'lucide-react'
import { Logo, Wordmark } from './logo'

const NAV = [
  { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Scraper', href: '/scraper', icon: Search },
  { label: 'Campagnes', href: '/campaigns', icon: Megaphone },
  { label: 'Pipeline', href: '/pipeline', icon: Kanban },
  { label: 'Paramètres', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  return (
    <aside className="flex w-[212px] flex-shrink-0 flex-col border-r border-border py-5">
      <Link href="/" className="flex items-center gap-2.5 px-5 pb-5 border-b border-border">
        <Logo size={26} />
        <Wordmark size={14} />
      </Link>
      <nav className="flex flex-1 flex-col gap-0.5 px-3 pt-4">
        {NAV.map(item => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors"
              style={{ color: isActive ? '#211D18' : '#8C8375' }}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 rounded-full bg-primary" />
              )}
              <Icon size={15} strokeWidth={1.75} />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="border-t border-border px-3 pt-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          <LogOut size={15} strokeWidth={1.75} />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}
