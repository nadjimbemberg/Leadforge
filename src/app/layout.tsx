import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700', '800'],
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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`} style={{ fontFamily: 'var(--font-dm-sans), DM Sans, system-ui, sans-serif', margin: 0 }}>
        {children}
      </body>
    </html>
  )
}
