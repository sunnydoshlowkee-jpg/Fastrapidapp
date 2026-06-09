import { useState, useEffect } from 'react'
import { getDashboardData } from '../services/dashboardService'

export function useDashboard() {
  const [data, setData] = useState({
    wallet_balance: 0,
    active_order: null,
    quick_reorders: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await getDashboardData()
      setData(res)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data')
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}
