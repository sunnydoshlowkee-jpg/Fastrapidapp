import { useMemo, useState } from 'react'
import {
  MERCHANT_INVENTORY_PRODUCTS,
  MERCHANT_INVENTORY_TOTAL_COUNT,
} from '../../../../services/data/merchantInventory.mock'

const PAGE_SIZE = 4

export default function useMerchantInventoryPage() {
  const [products, setProducts] = useState(MERCHANT_INVENTORY_PRODUCTS)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    )
  }, [products, searchQuery])

  const total = MERCHANT_INVENTORY_TOTAL_COUNT
  const displayTotal = searchQuery.trim() ? filteredProducts.length : total

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredProducts.slice(start, start + PAGE_SIZE)
  }, [filteredProducts, page])

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE))

  const toggleAvailability = (id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p)),
    )
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setPage(1)
  }

  return {
    products: paginatedProducts,
    searchQuery,
    handleSearchChange,
    toggleAvailability,
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total: displayTotal,
      totalPages,
    },
    setPage,
  }
}
