import type { Metadata } from 'next'
import { DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800'],
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT', 'WONK'],
})

export const metadata: Metadata = {
  title: 'LeadForge — Prospection B2B intelligente',
  description: 'Scrapez des leads qualifiés, générez des emails ultra-personnalisés et convertissez. En 3 clics.',
  keywords: ['prospection B2B', 'scraping leads', 'email automation', 'CRM pipeline'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
