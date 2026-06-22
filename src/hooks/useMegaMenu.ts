// src/hooks/useMegaMenu.ts
import { useState, useEffect } from 'react'
import { fetchMegaMenu, type MegaMenuData } from '@/services/menu.service'

interface UseMegaMenuResult {
  data: MegaMenuData | null
  loading: boolean
  error: string | null
}

export function useMegaMenu(): UseMegaMenuResult {
  const [data, setData] = useState<MegaMenuData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchMegaMenu()
      .then((res) => {
        console.log('✅ MegaMenu data loaded:', res)
        if (!cancelled) setData(res)
      })
      .catch((err: unknown) => {
        console.error('❌ MegaMenu fetch error:', err)
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load mega menu')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, loading, error }
}