import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MERCHANT_MENU_NEW_PATH, merchantMenuItemEditPath } from '../../../../services/data/merchantMenuItemCreate.mock'
import {
  deleteMerchantProduct,
  fetchMerchantInventory,
  updateMerchantProductAvailability,
} from '../../../../services/merchantProductsService'

const PAGE_SIZE = 4

const EMPTY_SUMMARY = [
  { id: 'total', label: 'Total Products', value: '0' },
  { id: 'active', label: 'Active Items', value: '0' },
  { id: 'low-stock', label: 'Low Stock', value: '0' },
  { id: 'value', label: 'Inventory Value', value: '₦0' },
]

export default function useMerchantInventoryPage() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [summary, setSummary] = useState(EMPTY_SUMMARY)
  const [insights, setInsights] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: PAGE_SIZE,
    total: 0,
    totalPages: 1,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadInventory = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await fetchMerchantInventory({
        search: searchQuery,
        page,
        perPage: PAGE_SIZE,
      })

      setProducts(result.products)
      setSummary(result.summary.length ? result.summary : EMPTY_SUMMARY)
      setInsights(result.insights)
      setPagination(result.pagination)
    } catch (err) {
      setError(err?.message || 'Could not load inventory.')
      setProducts([])
      setSummary(EMPTY_SUMMARY)
      setInsights([])
      setPagination({
        page: 1,
        pageSize: PAGE_SIZE,
        total: 0,
        totalPages: 1,
      })
    } finally {
      setLoading(false)
    }
  }, [page, searchQuery])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadInventory()
    }, searchQuery ? 250 : 0)

    return () => window.clearTimeout(timer)
  }, [loadInventory, searchQuery])

  const toggleAvailability = async (id) => {
    const product = products.find((item) => item.id === id)
    if (!product) return

    const nextAvailable = !product.available

    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, available: nextAvailable } : item)),
    )

    try {
      await updateMerchantProductAvailability(id, nextAvailable)
      await loadInventory()
    } catch (err) {
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, available: product.available } : item)),
      )
      setError(err?.message || 'Could not update availability.')
    }
  }

  const handleSearchChange = (value) => {
    setSearchQuery(value)
    setPage(1)
  }

  const editProduct = (product) => {
    navigate(merchantMenuItemEditPath(product.id))
  }

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(`Delete "${product.name}" from your menu? This cannot be undone.`)
    if (!confirmed) return

    setError(null)

    try {
      await deleteMerchantProduct(product.id)
      await loadInventory()
    } catch (err) {
      setError(err?.message || 'Could not delete product.')
    }
  }

  const duplicateProduct = (product) => {
    navigate(MERCHANT_MENU_NEW_PATH, {
      state: {
        duplicateFrom: {
          productName: `${product.name} (Copy)`,
          category: product.category,
          stockQuantity: product.stockQty,
          price: product.price,
        },
      },
    })
  }

  return {
    products,
    summary,
    insights,
    searchQuery,
    handleSearchChange,
    toggleAvailability,
    editProduct,
    deleteProduct,
    duplicateProduct,
    pagination,
    setPage,
    loading,
    error,
    refresh: loadInventory,
  }
}
