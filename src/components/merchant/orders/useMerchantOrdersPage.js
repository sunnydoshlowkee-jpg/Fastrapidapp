import { useMemo, useState } from 'react'
import {
  MERCHANT_ORDERS_LIST,
  MERCHANT_ORDERS_PAGINATION,
} from '../../../services/data/merchantOrders.mock'

function filterOrders(orders, activeFilter, searchQuery) {
  let result = orders

  if (activeFilter !== 'all') {
    result = result.filter((o) => o.status === activeFilter)
  }

  const q = searchQuery.trim().toLowerCase()
  if (q) {
    result = result.filter(
      (o) =>
        o.displayId.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.itemsSummary.toLowerCase().includes(q)
    )
  }

  return result
}

export default function useMerchantOrdersPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const filterCounts = useMemo(() => {
    const counts = {}
    MERCHANT_ORDERS_LIST.forEach((o) => {
      counts[o.status] = (counts[o.status] || 0) + 1
    })
    return counts
  }, [])

  const filteredOrders = useMemo(
    () => filterOrders(MERCHANT_ORDERS_LIST, activeFilter, searchQuery),
    [activeFilter, searchQuery]
  )

  const pageSize = MERCHANT_ORDERS_PAGINATION.pageSize
  const total =
    searchQuery || activeFilter !== 'all'
      ? filteredOrders.length
      : MERCHANT_ORDERS_PAGINATION.total
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, totalPages)

  const paginatedOrders = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return filteredOrders.slice(start, start + pageSize)
  }, [filteredOrders, safePage, pageSize])

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
    handleFilterChange,
    handleSearchChange,
    pagination: {
      page: safePage,
      pageSize,
      total,
    },
    setPage,
  }
}
