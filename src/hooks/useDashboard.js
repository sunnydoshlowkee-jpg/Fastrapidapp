import { useCallback } from 'react'
import { getDashboardData } from '../services/dashboardService'
import { useCachedFetch } from './useCachedFetch'

const DASHBOARD_TTL_MS = 2 * 60 * 1000

const EMPTY_DASHBOARD = {
  wallet_balance: 0,
  active_order: null,
  quick_reorders: [],
}

export function useDashboard() {
  const fetcher = useCallback(() => getDashboardData(), [])
  const { data, loading, error, refetch } = useCachedFetch(
    ['dashboard'],
    fetcher,
    { ttlMs: DASHBOARD_TTL_MS, initialData: EMPTY_DASHBOARD },
  )

  return {
    data: data ?? EMPTY_DASHBOARD,
    loading,
    error: error?.response?.data?.message || error?.message || null,
    refetch,
  }
}
