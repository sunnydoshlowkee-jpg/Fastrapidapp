import { useEffect, useMemo, useState } from 'react'
import { getMerchantOrders } from '../../../services/merchantOrdersService'
import { MERCHANT_ORDERS_PAGINATION } from '../../../services/data/merchantOrders.mock'

export default function useMerchantOrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [orders, setOrders] = useState([])
  const [filterCounts, setFilterCounts] = useState({})
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: MERCHANT_ORDERS_PAGINATION.pageSize,
    total: 0,
    lastPage: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadOrders = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await getMerchantOrders({
          status: activeFilter,
          search: searchQuery,
          page,
          perPage: MERCHANT_ORDERS_PAGINATION.pageSize,
        })

        if (!cancelled) {
          setOrders(result.orders)
          setFilterCounts(result.filterCounts)
          setPagination({
            page: result.meta.current_page,
            pageSize: result.meta.per_page,
            total: result.meta.total,
            lastPage: result.meta.last_page,
          })
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Could not load orders.')
          setOrders([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      cancelled = true
    }
  }, [activeFilter, searchQuery, page])

  const paginatedOrders = useMemo(() => orders, [orders])

  const handleFilterChange = (id) => {
    setActiveFilter(id)
    setPage(1)
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setPage(1)
  }

  return {
    activeFilter,
    filterCounts,
    paginatedOrders,
    searchQuery,
    loading,
    error,
    handleFilterChange,
    handleSearchChange,
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: pagination.total,
    },
    setPage,
  }
}
