import { useState, useEffect } from 'react'
import { fetchMenuItems, type MenuItem } from '@/services/menu.service'

interface UseMenuDataResult {
  menuItems: MenuItem[]
  loading: boolean
  error: string | null
}

export function useMenuData(): UseMenuDataResult {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchMenuItems()
      .then((data) => {
        if (!cancelled) setMenuItems(data)
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load menu')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { menuItems, loading, error }
}