'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()

  const refreshToken = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/refresh', { method: 'POST' })
      if (!res.ok) {
        router.push('/login?expired=true')
        return false
      }
      return true
    } catch {
      router.push('/login?expired=true')
      return false
    }
  }, [router])

  useEffect(() => {
    // Refresh token toutes les 14 minutes (avant expiration des 15min)
    const interval = setInterval(refreshToken, 14 * 60 * 1000)
    return () => clearInterval(interval)
  }, [refreshToken])

  return { refreshToken }
}
